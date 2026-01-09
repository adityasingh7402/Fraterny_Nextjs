
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// Number of random blogs to fetch for the home page
const BLOGS_LIMIT = 6;

export async function GET(request: NextRequest) {
    try {
        // 1. Fetch random published blog posts
        const { data: posts, error: postsError } = await supabaseAdmin
            .from('blog_posts')
            .select('id, title, slug, excerpt, reading_time, image_key, social_image_key, created_at, category')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(50); // Get last 50 posts to randomize from

        if (postsError) {
            console.error('❌ Error fetching home blog posts:', postsError);
            return NextResponse.json({ error: postsError.message }, { status: 500 });
        }

        if (!posts || posts.length === 0) {
            return NextResponse.json({ posts: [] });
        }

        // 2. Randomize and limit the posts
        const shuffledPosts = posts
            .sort(() => Math.random() - 0.5)
            .slice(0, BLOGS_LIMIT);

        // 3. Collect all image keys to fetch URLs
        const imageKeys = shuffledPosts
            .map(p => p.image_key || p.social_image_key)
            .filter((key): key is string => !!key);

        // 4. Fetch image storage paths from website_images
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

        // 5. Enrich posts with image URLs
        const enrichedPosts = shuffledPosts.map(post => {
            const key = post.image_key || post.social_image_key;
            const imageUrl = key ? (imageMap[key] || null) : null;

            // Fallback image if needed
            const finalImageUrl = imageUrl || 'https://fraterny.com/og-blog.jpg';

            return {
                ...post,
                imageUrl: finalImageUrl
            };
        });

        return NextResponse.json({ posts: enrichedPosts });

    } catch (error: any) {
        console.error('❌ Unexpected error in home blogs API:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
