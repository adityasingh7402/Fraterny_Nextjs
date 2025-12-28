
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

const SPECIFIC_SLUGS = [
    'meet-the-soul-aligned',
    'meet-the-free-spirits',
    'meet-the-restless-minds',
    'meet-the-healing-hearts',
    'meet-the-hidden-thinkers',
    'the-strategists-behavior-psychoanalysis-guide'
];

export async function GET(request: NextRequest) {
    try {
        // 1. Fetch the blog posts
        const { data: posts, error: postsError } = await supabaseAdmin
            .from('blog_posts')
            .select('id, title, slug, excerpt, reading_time, image_key, social_image_key, created_at, category')
            .in('slug', SPECIFIC_SLUGS)
            .eq('published', true);

        if (postsError) {
            console.error('❌ Error fetching quest blog posts:', postsError);
            return NextResponse.json({ error: postsError.message }, { status: 500 });
        }

        if (!posts || posts.length === 0) {
            return NextResponse.json({ posts: [] });
        }

        // 2. Collect all image keys to fetch URLS
        const imageKeys = posts
            .map(p => p.image_key || p.social_image_key)
            .filter((key): key is string => !!key);

        // 3. Fetch image storage paths from website_images
        let imageMap: Record<string, string> = {};
        if (imageKeys.length > 0) {
            const { data: imagesData, error: imagesError } = await supabaseAdmin
                .from('website_images')
                .select('key, storage_path')
                .in('key', imageKeys);

            if (imagesError) {
                console.error('❌ Error fetching images metadata:', imagesError);
                // Continue without images if this fails, rather than failing completely
            } else if (imagesData) {
                // Create a map of key -> publicUrl
                imagesData.forEach(img => {
                    if (img.storage_path) {
                        const { data: publicUrlData } = supabaseAdmin.storage
                            .from('website-images')
                            .getPublicUrl(img.storage_path);

                        imageMap[img.key] = publicUrlData.publicUrl;
                    }
                });
            }
        }

        // 4. Enrich posts with image URLs
        const enrichedPosts = posts.map(post => {
            const key = post.image_key || post.social_image_key;
            const imageUrl = key ? (imageMap[key] || null) : null;

            // Fallback image if needed, or specific default
            const finalImageUrl = imageUrl || 'https://fraterny.com/og-blog.jpg';

            return {
                ...post,
                imageUrl: finalImageUrl
            };
        });

        // 5. Sort them in the order of SPECIFIC_SLUGS
        const sortedPosts = enrichedPosts.sort((a, b) => {
            const indexA = SPECIFIC_SLUGS.indexOf(a.slug || '');
            const indexB = SPECIFIC_SLUGS.indexOf(b.slug || '');
            return indexA - indexB;
        });

        return NextResponse.json({ posts: sortedPosts });

    } catch (error: any) {
        console.error('❌ Unexpected error in quest blogs API:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
