import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ testId: string }> }
) {
    const { testId } = await params;

    if (!testId) {
        return NextResponse.json({ error: 'Test ID is required' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('summary_generation')
            .select('likertq1, likertq2, likertq3, likertq4')
            .eq('testid', testId)
            .single();

        if (error) {
            console.error('Error fetching likert data:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Map database columns to the expected format
        const formattedData = {
            q1: data?.likertq1,
            q2: data?.likertq2,
            q3: data?.likertq3,
            q4: data?.likertq4
        };

        return NextResponse.json(formattedData);

    } catch (error) {
        console.error('Server error fetching likert data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
