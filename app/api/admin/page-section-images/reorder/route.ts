import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function PUT(request: NextRequest) {
    try {
        const { items } = await request.json();

        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { success: false, error: 'Invalid items array' },
                { status: 400 }
            );
        }

        // Perform updates in parallel
        // Since we are just updating sort_order, using upsert might be safer if we had all fields,
        // but simple update per ID is clear and robust for small batches.
        const updatePromises = items.map((item: { id: string; sort_order: number }) =>
            supabaseAdmin
                .from('page_section_images')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id)
        );

        await Promise.all(updatePromises);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error reordering images:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to reorder images' },
            { status: 500 }
        );
    }
}
