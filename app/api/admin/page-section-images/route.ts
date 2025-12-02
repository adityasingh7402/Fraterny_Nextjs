/**
 * API Route: /api/admin/page-section-images
 * Methods: GET, POST, PUT, DELETE
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export type PageSectionImage = {
    id: string;
    section_id: string;
    image_id: string;
    sort_order: number;
    created_at: string;
};

export type PageSectionImageWithDetails = PageSectionImage & {
    page_sections: {
        id: string;
        section_key: string;
        name: string;
        allowed_images: number;
        pages: {
            slug: string;
            name: string;
        };
    };
    website_images: {
        id: string;
        key: string;
        storage_path: string;
        alt_text: string | null;
        category: string | null;
        width: number | null;
        height: number | null;
    };
};

// GET - Fetch images for a section
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sectionId = searchParams.get('sectionId');

        if (!sectionId) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Section ID is required',
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('page_section_images')
            .select(`
        *,
        page_sections:section_id (
          id,
          section_key,
          name,
          allowed_images,
          pages:page_id (
            slug,
            name
          )
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
            .eq('section_id', sectionId)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching page section images:', error);
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
            data: data as PageSectionImageWithDetails[],
        });
    } catch (error: any) {
        console.error('Unexpected error in GET page section images:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// POST - Assign image to section
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { section_id, image_id, sort_order } = body;

        if (!section_id || !image_id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Section ID and Image ID are required',
                },
                { status: 400 }
            );
        }

        // Get section details to check allowed_images limit
        const { data: section, error: sectionError } = await supabaseAdmin
            .from('page_sections')
            .select('allowed_images')
            .eq('id', section_id)
            .single();

        if (sectionError || !section) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Section not found',
                },
                { status: 404 }
            );
        }

        // Count current images in this section
        const { count, error: countError } = await supabaseAdmin
            .from('page_section_images')
            .select('*', { count: 'exact', head: true })
            .eq('section_id', section_id);

        if (countError) {
            console.error('Error counting images:', countError);
            return NextResponse.json(
                {
                    success: false,
                    error: 'Error checking image limit',
                },
                { status: 500 }
            );
        }

        if (count !== null && count >= section.allowed_images) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Maximum images limit (${section.allowed_images}) reached for this section`,
                },
                { status: 400 }
            );
        }

        // Check if this image is already assigned to this section
        const { data: existing } = await supabaseAdmin
            .from('page_section_images')
            .select('id')
            .eq('section_id', section_id)
            .eq('image_id', image_id)
            .maybeSingle();

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'This image is already assigned to this section',
                },
                { status: 400 }
            );
        }

        // Insert the mapping
        const { data, error } = await supabaseAdmin
            .from('page_section_images')
            .insert({
                section_id,
                image_id,
                sort_order: sort_order || 0,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating page section image:', error);
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
            data: data as PageSectionImage,
        });
    } catch (error: any) {
        console.error('Unexpected error in POST page section image:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// PUT - Update sort order or replace image
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, sort_order } = body;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Mapping ID is required',
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('page_section_images')
            .update({
                sort_order,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating page section image:', error);
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
            data: data as PageSectionImage,
        });
    } catch (error: any) {
        console.error('Unexpected error in PUT page section image:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// DELETE - Remove image from section (or delete all images for a section)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const sectionId = searchParams.get('sectionId');

        // Delete specific mapping by ID
        if (id) {
            const { error } = await supabaseAdmin
                .from('page_section_images')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting page section image:', error);
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
                message: 'Image removed from section successfully',
            });
        }

        // Delete all mappings for a section
        if (sectionId) {
            const { error } = await supabaseAdmin
                .from('page_section_images')
                .delete()
                .eq('section_id', sectionId);

            if (error) {
                console.error('Error deleting section images:', error);
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
                message: 'All images removed from section successfully',
            });
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Either ID or Section ID is required',
            },
            { status: 400 }
        );
    } catch (error: any) {
        console.error('Unexpected error in DELETE page section image:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}
