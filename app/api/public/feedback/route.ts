import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    try {
        console.log('🔍 Fetching public feedback from Supabase...');

        const { data, error } = await supabaseAdmin
            .from('summary_overall_feedback')
            .select(`
        feedback,
        user_data (
          user_name
        )
      `)
            .not('feedback', 'is', null)
            .not('feedback', 'eq', '')
            .order('created_at', { ascending: false })
            .limit(30);

        if (error) {
            console.error('❌ Error fetching public feedback:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        console.log(`✅ Successfully fetched ${data?.length || 0} feedback items`);

        const formattedFeedback = data.map((item: any, index: number) => ({
            name: item.user_data?.user_name || 'Anonymous',
            role: '',
            avatar: `https://picsum.photos/100/100?random=${100 + index}`,
            stars: 5,
            text: item.feedback
        }));

        return NextResponse.json({ success: true, data: formattedFeedback });
    } catch (error: any) {
        console.error('❌ Unexpected error fetching public feedback:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
