import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, contact, socialLinks, description } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !socialLinks || !description) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Insert into database
        const { data, error } = await supabase
            .from('partner_applications')
            .insert([
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    contact: contact || null,
                    social_links: socialLinks.filter((link: string) => link.trim() !== ''),
                    description: description,
                    status: 'pending',
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to submit application' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error submitting partner application:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
