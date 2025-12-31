
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const influencerId = searchParams.get('influencer_id');

        if (!influencerId) {
            return NextResponse.json({ success: false, error: 'influencer_id is required' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('discount_codes')
            .select('*')
            .eq('influencer_id', influencerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { code, influencer_id, discount_percentage, expires_at } = body;

        // Validate
        if (!code || !influencer_id || discount_percentage === undefined) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Check availability
        const { data: existing } = await supabaseAdmin
            .from('discount_codes')
            .select('id')
            .eq('code', code)
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ success: false, error: 'Code already exists' }, { status: 400 });
        }

        // Insert
        const { data, error } = await supabaseAdmin
            .from('discount_codes')
            .insert([{
                code,
                influencer_id,
                discount_percentage,
                expires_at: expires_at || null,
                is_active: true
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('discount_codes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, is_active } = body;

        if (!id || is_active === undefined) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('discount_codes')
            .update({ is_active })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
