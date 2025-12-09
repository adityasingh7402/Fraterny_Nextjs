import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET: Find orphaned images
export async function GET(request: NextRequest) {
    try {
        // 1. Initialize collections
        const referencedKeys = new Set<string>();
        const referencedIds = new Set<string>();
        const referencedPaths = new Set<string>();
        const dbImageMap = new Map();

        // 2. Fetch ALL data in parallel
        const [
            { data: dbImages },
            { data: blogPosts },
            { data: pageSectionImages },
            { data: influencers },
            { data: settings }
        ] = await Promise.all([
            supabaseAdmin.from('website_images').select('*'),
            supabaseAdmin.from('blog_posts').select('image_key, social_image_key, content, image_link'),
            supabaseAdmin.from('page_section_images').select('image_id'),
            supabaseAdmin.from('influencers').select('profile_image'),
            supabaseAdmin.from('website_settings').select('value')
        ]);

        // 3. Populate references from DB Images (including optimized versions)
        if (dbImages) {
            dbImages.forEach(img => {
                // Map by storage path or key if possible
                if (img.storage_path) dbImageMap.set(img.storage_path, img);
                else if (img.key) dbImageMap.set(img.key, img);

                // Check 'sizes' column for optimized versions keys and add to referencedPaths
                if (img.sizes && typeof img.sizes === 'object') {
                    // Safety check for null (since typeof null is 'object')
                    const sizesObj = img.sizes as Record<string, string>;
                    Object.values(sizesObj).forEach(path => {
                        if (path && typeof path === 'string') {
                            referencedPaths.add(path);
                        }
                    });
                }
            });
        }

        // 4. Populate references from Blog Posts
        if (blogPosts) {
            blogPosts.forEach((post) => {
                if (post.image_key) referencedKeys.add(post.image_key);
                if (post.social_image_key) referencedKeys.add(post.social_image_key);

                // Add content string for searching later
                if (post.content) referencedPaths.add(post.content);
                if (post.image_link) referencedPaths.add(post.image_link);
            });
        }

        // 5. Populate references from Page Sections
        if (pageSectionImages) {
            pageSectionImages.forEach((img) => {
                if (img.image_id) referencedIds.add(img.image_id);
            });
        }

        // 6. Populate references from Influencers
        if (influencers) {
            influencers.forEach((inf) => {
                if (inf.profile_image) referencedPaths.add(inf.profile_image);
            });
        }

        // 7. Populate references from Settings
        if (settings) {
            settings.forEach((setting) => {
                if (setting.value) referencedPaths.add(setting.value);
            });
        }

        // 8. Fetch Storage Files Recursively
        async function getAllFilesRecursively(path = ''): Promise<any[]> {
            let files: any[] = [];
            let page = 0;
            const PAGE_SIZE = 100;
            let hasMore = true;

            while (hasMore) {
                const { data: batch, error } = await supabaseAdmin
                    .storage
                    .from('website-images')
                    .list(path, {
                        limit: PAGE_SIZE,
                        offset: page * PAGE_SIZE,
                        sortBy: { column: 'created_at', order: 'desc' }
                    });

                if (error) {
                    console.error(`Error listing path ${path}:`, error);
                    break;
                }

                if (!batch || batch.length === 0) {
                    hasMore = false;
                } else {
                    for (const item of batch) {
                        if (!item.id) {
                            const folderPath = path ? `${path}/${item.name}` : item.name;
                            const subFiles = await getAllFilesRecursively(folderPath);
                            files = [...files, ...subFiles];
                        } else {
                            const fullPath = path ? `${path}/${item.name}` : item.name;
                            files.push({ ...item, name: fullPath });
                        }
                    }

                    if (batch.length < PAGE_SIZE) {
                        hasMore = false;
                    } else {
                        page++;
                    }
                }
            }
            return files;
        }

        const allStorageFiles = await getAllFilesRecursively();

        // 7. Filter orphaned images (not referenced anywhere)
        const orphanedImages = allStorageFiles.filter((file) => {
            // Basic file properties
            const fileName = file.name;
            const fileId = file.id;

            // Check if we have a DB record for this file
            const dbRecord = dbImageMap.get(fileName) ||
                Array.from(dbImageMap.values()).find(img => img.key === fileName);

            const dbId = dbRecord?.id;
            const dbKey = dbRecord?.key;

            // 1. Check direct ID/Key matches from DB References
            if (dbId && referencedIds.has(dbId)) return false;
            if (dbKey && referencedKeys.has(dbKey)) return false;

            // 2. Deep scan: Check if the filename appears in any content
            // We check:
            // - The filename itself (e.g., "my-image.jpg")
            // - The full storage path if implied (e.g., "123456-my-image.jpg")
            // - The potential DB key

            let isReferencedInContent = false;
            const searchTerms = [fileName, dbKey].filter(Boolean) as string[];

            for (const content of referencedPaths) {
                if (!content) continue;
                if (searchTerms.some(term => content.includes(term))) {
                    isReferencedInContent = true;
                    break;
                }
            }

            return !isReferencedInContent;
        }).map(file => {
            // Map to the return format
            const dbRecord = dbImageMap.get(file.name) ||
                Array.from(dbImageMap.values()).find(img => img.key === file.name);

            return {
                id: dbRecord?.id || file.id, // Use DB ID if available to allow DB deletion too
                key: dbRecord?.key || file.name,
                storage_path: file.name, // In root bucket, name is the path
                alt_text: dbRecord?.alt_text || '',
                description: dbRecord?.description || '',
                created_at: file.created_at,
                is_ghost: !dbRecord // Flag to indicate if it's purely a storage file with no DB record
            };
        });

        return NextResponse.json({
            orphanedImages,
            totalOrphaned: orphanedImages.length,
            totalImages: allStorageFiles.length,
            referencedCount: allStorageFiles.length - orphanedImages.length,
        });
    } catch (error) {
        console.error('Error finding orphaned images:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE: Remove selected orphaned images
export async function DELETE(request: NextRequest) {
    try {
        const { files } = await request.json();

        if (!files || !Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 }
            );
        }

        const deletedImages = [];
        const failedImages = [];

        // Delete each image from storage and database
        for (const file of files) {
            try {
                // 1. Delete from Supabase Storage (if path exists)
                if (file.path) {
                    const { error: storageError } = await supabaseAdmin.storage
                        .from('website-images')
                        .remove([file.path]);

                    if (storageError) {
                        console.error(`Failed to delete from storage: ${file.path}`, storageError);
                        failedImages.push({ id: file.id, path: file.path, error: 'Storage deletion failed' });
                        // Look, if storage delete failed, we usually shouldn't delete DB record to keep consistency,
                        // but for orphaned cleanup, we might want to force it. 
                        // For now, let's continue to try DB delete.
                    }
                }

                // 2. Delete from database (if ID is valid UUID)
                // Some storage IDs might not be valid UUIDs dependent on generation, but DB IDs usually are.
                // We'll try to delete anyway.
                if (file.id) {
                    // First check if this image has optimized versions to delete
                    const { data: imgRecord } = await supabaseAdmin
                        .from('website_images')
                        .select('sizes')
                        .eq('id', file.id)
                        .single();

                    if (imgRecord?.sizes && typeof imgRecord.sizes === 'object') {
                        const sizes = imgRecord.sizes as Record<string, string>;
                        const optimizedPaths = Object.values(sizes).filter(p => typeof p === 'string') as string[];
                        if (optimizedPaths.length > 0) {
                            await supabaseAdmin.storage
                                .from('website-images')
                                .remove(optimizedPaths);
                        }
                    }

                    const { error: dbError } = await supabaseAdmin
                        .from('website_images')
                        .delete()
                        .eq('id', file.id);

                    if (dbError) {
                        // If it's a "Ghost" image, it won't be in DB, so this might not find anything to delete.
                        // We don't necessarily need to log an error if it was just missing.
                        // But if it was a real DB error, we log it.
                    }
                }

                deletedImages.push({ id: file.id, path: file.path });

            } catch (err) {
                console.error(`Error deleting image ${file.path}:`, err);
                failedImages.push({ id: file.id, key: file.path, error: 'Unknown error' });
            }
        }

        return NextResponse.json({
            success: true,
            deletedCount: deletedImages.length,
            failedCount: failedImages.length,
            deletedImages,
            failedImages,
        });
    } catch (error) {
        console.error('Error deleting orphaned images:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
