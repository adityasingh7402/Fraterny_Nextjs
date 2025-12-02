/**
 * API Route: /api/admin/pages
 * Methods: GET, POST, PUT, DELETE
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export type Page = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    created_at: string;
};

// GET - Fetch all pages
export async function GET(request: NextRequest) {
    try {
        const { data, error } = await supabaseAdmin
            .from('pages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching pages:', error);
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
            data: data as Page[],
        });
    } catch (error: any) {
        console.error('Unexpected error in GET pages:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// POST - Create new page
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, name, description } = body;

        if (!slug || !name) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Slug and name are required',
                },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const { data: existingPage } = await supabaseAdmin
            .from('pages')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (existingPage) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'A page with this slug already exists',
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('pages')
            .insert({
                slug,
                name,
                description: description || null,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating page:', error);
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
            data: data as Page,
        });
    } catch (error: any) {
        console.error('Unexpected error in POST page:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// PUT - Update page
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, slug, name, description } = body;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page ID is required',
                },
                { status: 400 }
            );
        }

        // If slug is being changed, check for duplicates
        if (slug) {
            const { data: existingPage } = await supabaseAdmin
                .from('pages')
                .select('id')
                .eq('slug', slug)
                .neq('id', id)
                .maybeSingle();

            if (existingPage) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'A page with this slug already exists',
                    },
                    { status: 400 }
                );
            }
        }

        const { data, error } = await supabaseAdmin
            .from('pages')
            .update({
                slug,
                name,
                description: description || null,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating page:', error);
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
            data: data as Page,
        });
    } catch (error: any) {
        console.error('Unexpected error in PUT page:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}

// DELETE - Delete page (sections will cascade delete automatically)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page ID is required',
                },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin
            .from('pages')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting page:', error);
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
            message: 'Page deleted successfully',
        });
    } catch (error: any) {
        console.error('Unexpected error in DELETE page:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}
