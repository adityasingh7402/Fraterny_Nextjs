import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: NextRequest) {
    try {
        const errorData = await req.json();

        if (!errorData) {
            return NextResponse.json(
                { error: 'No error data provided' },
                { status: 400 }
            );
        }

        // Generate a unique event ID or let DB do it
        const timestamp = new Date().toISOString();

        console.error('🚨 Client-Side Error Report:', {
            timestamp,
            ...errorData
        });

        // Attempt to save to Supabase "client_errors" table
        // Note: You need to create this table in your Supabase dashboard
        /*
          Table Schema:
          - id: uuid (primary key)
          - created_at: timestamptz
          - message: text
          - stack: text
          - component_stack: text
          - url: text
          - user_agent: text
          - context: text
          - user_info: jsonb
        */

        let eventId = null;

        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('client_errors')
                .insert({
                    message: errorData.message,
                    stack: errorData.stack,
                    component_stack: errorData.componentStack,
                    url: errorData.url,
                    user_agent: errorData.userAgent,
                    context: errorData.context,
                    user_info: errorData.userInfo,
                    created_at: timestamp
                })
                .select('id')
                .single();

            if (error) {
                console.error('❌ Failed to save error to Supabase:', error);
                // We don't fail the request if DB logging fails, we just log it to server console
            } else {
                eventId = data?.id;
                console.log('✅ Error logged to Supabase with ID:', eventId);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Error logged',
            eventId: eventId
        });

    } catch (error) {
        console.error('❌ Error in log-error API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
