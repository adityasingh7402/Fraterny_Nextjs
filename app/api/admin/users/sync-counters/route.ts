/**
 * API Route: /api/admin/users/sync-counters
 * Methods: POST
 * Purpose: Synchronize user generation counters from summary_generation table
 * 
 * Logic:
 * - Total generations: Count where status = 'Complete'
 * - Paid generations: Count where payment_status = 'success'
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * POST /api/admin/users/sync-counters 
 * Recalculates and syncs generation counters for all users or specific user
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user_id } = body;

        console.log('🔄 Starting generation counter sync...');
        console.log('📝 Target:', user_id ? `user_id: ${user_id}` : 'ALL USERS');
        console.log('✅ Logic: Total = status:"Complete", Paid = payment_status:"success"');

        // Get all summary generation records with status and payment_status
        let summaryQuery = supabaseAdmin
            .from('summary_generation')
            .select('user_id, status, payment_status');

        if (user_id) {
            summaryQuery = summaryQuery.eq('user_id', user_id);
        }

        const { data: summaries, error: summaryError } = await summaryQuery;

        if (summaryError) {
            console.error('❌ Error fetching summaries:', summaryError);
            return NextResponse.json(
                { success: false, error: summaryError.message },
                { status: 500 }
            );
        }

        if (!summaries || summaries.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No summaries found to process',
                updated: 0
            });
        }

        console.log(`📊 Processing ${summaries.length} summary records...`);

        // Group summaries by user_id and count
        const userCounts = new Map<string, { total: number; paid: number }>();

        summaries.forEach((summary) => {
            const uid = summary.user_id;
            if (!uid) return;

            if (!userCounts.has(uid)) {
                userCounts.set(uid, { total: 0, paid: 0 });
            }

            const counts = userCounts.get(uid)!;

            // Count TOTAL: Only count if status = 'Complete'
            const isComplete = summary.status === 'Complete' ||
                summary.status === 'complete' ||
                summary.status === 'COMPLETE';

            if (isComplete) {
                counts.total++;
            }

            // Count PAID: Only count if payment_status = 'success'
            const isPaid = summary.payment_status === 'success' ||
                summary.payment_status === 'Success' ||
                summary.payment_status === 'SUCCESS';

            if (isPaid) {
                counts.paid++;
            }
        });

        console.log(`📊 Found ${userCounts.size} users to update`);

        // Update each user's counters
        let updatedCount = 0;
        const errors: string[] = [];

        for (const [uid, counts] of userCounts.entries()) {
            console.log(`📝 Updating user ${uid}: total=${counts.total}, paid=${counts.paid}`);

            const { error: updateError } = await supabaseAdmin
                .from('user_data')
                .update({
                    total_summary_generation: counts.total,
                    total_paid_generation: counts.paid
                })
                .eq('user_id', uid);

            if (updateError) {
                console.error(`❌ Error updating user ${uid}:`, updateError);
                errors.push(`${uid}: ${updateError.message}`);
            } else {
                updatedCount++;
            }
        }

        console.log(`✅ Sync complete! Updated ${updatedCount} users`);

        if (errors.length > 0) {
            return NextResponse.json({
                success: false,
                message: `Partially completed. ${updatedCount} users updated, ${errors.length} failed`,
                updated: updatedCount,
                errors
            }, { status: 207 }); // Multi-Status
        }

        return NextResponse.json({
            success: true,
            message: `Successfully synced counters for ${updatedCount} users`,
            updated: updatedCount
        });

    } catch (error: any) {
        console.error('❌ Error in sync-counters:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
