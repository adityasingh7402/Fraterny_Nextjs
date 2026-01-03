import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    try {
        const now = new Date();
        const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

        const [helpRequests, villaApplications, overallFeedback] = await Promise.all([
            // Help Requests
            supabaseAdmin
                .from('user_help_requests')
                .select('*')
                .gte('created_at', tenDaysAgo.toISOString())
                .order('created_at', { ascending: false }),

            // Villa Applications
            supabaseAdmin
                .from('villa_applications')
                .select('*')
                .gte('submitted_at', tenDaysAgo.toISOString())
                .order('submitted_at', { ascending: false }),

            // Overall Feedback
            supabaseAdmin
                .from('summary_overall_feedback')
                .select('*, user_data(user_name)')
                .gte('created_at', tenDaysAgo.toISOString())
                .order('created_at', { ascending: false })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                helpRequests: helpRequests.data || [],
                villaApplications: villaApplications.data || [],
                overallFeedback: overallFeedback.data || []
            }
        });
    } catch (error: any) {
        console.error('Error fetching recent activity:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
