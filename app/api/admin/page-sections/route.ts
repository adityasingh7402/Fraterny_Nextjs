/**
 * API Route: /api/admin/page-sections
 * Methods: GET, POST, PUT, DELETE
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export type PageSection = {
    id: string;
    page_id: string;
    section_key: string;
    name: string;
    allowed_images: number;
    created_at: string;
};

export type PageSectionWithPage = PageSection & {
    pages: {
        slug: string;
        name: string;
    };
};

// GET - Fetch sections (optionally filtered by page_id)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageId = searchParams.get('pageId');

        let query = supabaseAdmin
            .from('page_sections')
            .select(`
        *,
        pages:page_id (
          slug,
          name
        )
      `);

        if (pageId) {
            query = query.eq('page_id', pageId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching page sections:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as PageSectionWithPage[],
        });
    } catch (error: any) {
        console.error('Unexpected error in GET page sections:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// POST - Create new section
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page_id, section_key, name, allowed_images } = body;

        if (!page_id || !section_key || !name) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page ID, section key, and name are required',
                },
                { status: 400 }
            );
        }

        // Check if this section_key already exists for this page
        const { data: existingSection } = await supabaseAdmin
            .from('page_sections')
            .select('id')
            .eq('page_id', page_id)
            .eq('section_key', section_key)
            .maybeSingle();

        if (existingSection) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'A section with this key already exists for this page',
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('page_sections')
            .insert({
                page_id,
                section_key,
                name,
                allowed_images: allowed_images || 1,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating page section:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as PageSection,
        });
    } catch (error: any) {
        console.error('Unexpected error in POST page section:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// PUT - Update section
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, section_key, name, allowed_images } = body;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Section ID is required',
                },
                { status: 400 }
            );
        }

        // Get current section to check page_id
        const { data: currentSection } = await supabaseAdmin
            .from('page_sections')
            .select('page_id')
            .eq('id', id)
            .single();

        if (!currentSection) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Section not found',
                },
                { status: 404 }
            );
        }

        // If section_key is being changed, check for duplicates on the same page
        if (section_key) {
            const { data: existingSection } = await supabaseAdmin
                .from('page_sections')
                .select('id')
                .eq('page_id', currentSection.page_id)
                .eq('section_key', section_key)
                .neq('id', id)
                .maybeSingle();

            if (existingSection) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'A section with this key already exists for this page',
                    },
                    { status: 400 }
                );
            }
        }

        const { data, error } = await supabaseAdmin
            .from('page_sections')
            .update({
                section_key,
                name,
                allowed_images,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating page section:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as PageSection,
        });
    } catch (error: any) {
        console.error('Unexpected error in PUT page section:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// DELETE - Delete section (image mappings will cascade delete automatically)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Section ID is required',
                },
                { status: 400 }
            );
        }

        // 1. Fetch all images associated with this section
        const { data: sectionImages, error: fetchError } = await supabaseAdmin
            .from('page_section_images')
            .select(`
                image_id,
                website_images (
                    id,
                    storage_path
                )
            `)
            .eq('section_id', id);

        if (fetchError) {
            console.error('Error fetching associated images:', fetchError);
            // We continue to try to delete the section even if fetching images fails
        }

        // 2. Delete images from Storage and website_images table
        if (sectionImages && sectionImages.length > 0) {
            const imageIds = sectionImages.map(item => item.image_id);
            const storagePaths = sectionImages
                .map((item: any) => {
                    const img = item.website_images;
                    if (Array.isArray(img)) return img[0]?.storage_path;
                    return img?.storage_path;
                })
                .filter(path => path) as string[];

            // Delete files from Supabase Storage
            if (storagePaths.length > 0) {
                const { error: storageError } = await supabaseAdmin.storage
                    .from('website-images')
                    .remove(storagePaths);

                if (storageError) {
                    console.error('Error deleting files from storage:', storageError);
                }
            }

            // Delete records from website_images table
            // Note: We delete from website_images, which is the source of truth.
            // The entries in page_section_images will be deleted either by cascade or when the section is deleted.
            if (imageIds.length > 0) {
                const { error: imagesDeleteError } = await supabaseAdmin
                    .from('website_images')
                    .delete()
                    .in('id', imageIds);

                if (imagesDeleteError) {
                    console.error('Error deleting image records:', imagesDeleteError);
                }
            }
        }

        // 3. Delete the section itself
        const { error } = await supabaseAdmin
            .from('page_sections')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting page section:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Section deleted successfully',
        });
    } catch (error: any) {
        console.error('Unexpected error in DELETE page section:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}
