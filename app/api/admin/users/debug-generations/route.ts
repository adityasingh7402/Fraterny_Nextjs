/**
 * API Route: /api/admin/users/debug-generations
 * Methods: GET
 * Purpose: Debug what's in summary_generation table for a specific user
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get('user_id');

        if (!user_id) {
            return NextResponse.json(
                { success: false, error: 'user_id is required' },
                { status: 400 }
            );
        }

        console.log('🔍 Debugging generations for user:', user_id);

        // Get ALL summary_generation records for this user
        const { data: summaries, error } = await supabaseAdmin
            .from('summary_generation')
            .select('*')
            .eq('user_id', user_id);

        if (error) {
            console.error('❌ Error:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        console.log(`📊 Found ${summaries?.length || 0} summaries for user ${user_id}`);

        // Analyze each summary
        const analysis = summaries?.map(s => ({
            test_id: s.test_id,
            status: s.status,
            payment_status: s.payment_status,
            is_paid: s.is_paid,
            created_at: s.created_at,
            isComplete: s.status === 'Complete' || s.status === 'complete' || s.status === 'COMPLETE',
            isPaid: s.payment_status === 'success' || s.payment_status === 'Success' || s.payment_status === 'SUCCESS'
        })) || [];

        const totalComplete = analysis.filter(a => a.isComplete).length;
        const totalPaid = analysis.filter(a => a.isPaid).length;

        console.log(`✅ Complete summaries: ${totalComplete}`);
        console.log(`💰 Paid summaries: ${totalPaid}`);

        return NextResponse.json({
            success: true,
            user_id,
            total_records: summaries?.length || 0,
            total_complete: totalComplete,
            total_paid: totalPaid,
            summaries: analysis
        });

    } catch (error: any) {
        console.error('❌ Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
