import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
    try {
        const { code, original_amount_inr, original_amount_usd } = await request.json();

        if (!code) {
            return NextResponse.json({ success: false, error: 'Code is required' }, { status: 400 });
        }

        // 1. Fetch Discount Code
        const { data: discount, error } = await supabaseAdmin
            .from('discount_codes')
            .select(`
        *,
        influencers (
          name,
          affiliate_code
        )
      `)
            .eq('code', code)
            .eq('is_active', true)
            .maybeSingle();

        if (error) {
            console.error('Database error fetching discount:', error);
            return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 500 });
        }

        // 2. Validate Existence & Expiry
        if (!discount) {
            return NextResponse.json({ success: false, valid: false, message: 'Invalid or inactive code' });
        }

        if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
            return NextResponse.json({ success: false, valid: false, message: 'This code has expired' });
        }

        // 3. Calculate Discount
        const percentage = discount.discount_percentage;
        const factor = (100 - percentage) / 100;

        const new_inr = Math.round(original_amount_inr * factor);
        const new_usd = parseFloat((original_amount_usd * factor).toFixed(2));

        const saved_inr = original_amount_inr - new_inr;
        const saved_usd = parseFloat((original_amount_usd - new_usd).toFixed(2));

        // 4. Return Success
        return NextResponse.json({
            success: true,
            valid: true,
            data: {
                code: discount.code,
                influencer_name: discount.influencers?.name || 'Partner',
                influencer_id: discount.influencer_id,
                discount_percentage: percentage,
                original: {
                    inr: original_amount_inr,
                    usd: original_amount_usd
                },
                discounted: {
                    inr: new_inr,
                    usd: new_usd
                },
                saved: {
                    inr: saved_inr,
                    usd: saved_usd
                }
            }
        });

    } catch (error: any) {
        console.error('Validation API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
