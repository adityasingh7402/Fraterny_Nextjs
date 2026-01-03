import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user_id, user_name, test_id, user_query } = body;

        console.log('Received help request submission:', { user_id, user_name, test_id, user_query });

        // Validate required fields
        if (!user_query || !user_query.trim()) {
            return NextResponse.json(
                {
                    status: 400,
                    message: 'Please provide your enquiry'
                },
                { status: 400 }
            );
        }

        // Insert help request into database
        // table name: user_help_requests
        const { data, error } = await supabaseAdmin
            .from('user_help_requests')
            .insert({
                user_id: user_id || null,
                user_name: user_name || null,
                test_id: test_id || null,
                user_query: user_query.trim()
            })
            .select()
            .single();

        if (error) {
            console.error('Error submitting help request:', error);
            return NextResponse.json(
                {
                    status: 500,
                    message: 'Failed to submit help request',
                    error: error.message
                },
                { status: 500 }
            );
        }

        console.log('Help request submitted successfully:', data);

        return NextResponse.json(
            {
                status: 200,
                message: 'Your help request has been submitted successfully!',
                data
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Unexpected error in help request submission:', error);
        return NextResponse.json(
            {
                status: 500,
                message: 'An unexpected error occurred',
                error: error?.message
            },
            { status: 500 }
        );
    }
}
