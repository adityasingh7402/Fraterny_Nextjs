import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page slug is required',
                },
                { status: 400 }
            );
        }

        // 1. Get Page ID from Slug
        const { data: page, error: pageError } = await supabaseAdmin
            .from('pages')
            .select('id, name')
            .eq('slug', slug)
            .single();

        if (pageError || !page) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page not found',
                },
                { status: 404 }
            );
        }

        // 2. Get all sections for this page
        const { data: sections, error: sectionsError } = await supabaseAdmin
            .from('page_sections')
            .select('id')
            .eq('page_id', page.id);

        if (sectionsError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Error fetching page sections',
                },
                { status: 500 }
            );
        }

        const sectionIds = sections.map((s) => s.id);

        if (sectionIds.length === 0) {
            return NextResponse.json({
                success: true,
                data: [],
                meta: {
                    pageName: page.name,
                    totalImages: 0
                }
            });
        }

        // 3. Get all images for these sections
        const { data: images, error: imagesError } = await supabaseAdmin
            .from('page_section_images')
            .select(`
                *,
                page_sections:section_id (
                    id,
                    section_key,
                    name
                ),
                website_images:image_id (
                    id,
                    key,
                    storage_path,
                    alt_text,
                    category,
                    width,
                    height
                )
            `)
            .in('section_id', sectionIds)
            .order('sort_order', { ascending: true });

        if (imagesError) {
            console.error('Error fetching page images:', imagesError);
            return NextResponse.json(
                {
                    success: false,
                    error: imagesError.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: images,
            meta: {
                pageName: page.name,
                totalImages: images.length
            }
        });

    } catch (error: any) {
        console.error('Unexpected error in GET page images:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}
