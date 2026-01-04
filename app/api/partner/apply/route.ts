import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @media screen and (max-width: 480px) {
            .mobile-header { padding: 24px 20px !important; }
            .mobile-content { padding: 30px 20px !important; }
            .mobile-footer { padding: 24px 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 20px; background-color: #f6f6f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div class="mobile-header" style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #e5e5e5;">
            <h1 style="margin: 0; font-family: 'Gilroy-Bold', sans-serif; font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: -1px;">FRAT.</h1>
        </div>

        <!-- Content -->
        <div class="mobile-content" style="padding: 40px 40px 32px 40px;">
            <div style="display: inline-block; padding: 4px 12px; border-radius: 4px; background-color: #f0fdf4; color: #10b981; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">Review in Progress</div>
            <h2 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 24px; line-height: 1.3;">Hello {{name}},</h2>
            <p style="font-size: 15px; color: #525252; margin-bottom: 24px; line-height: 1.6;">
                We've successfully received your partnership request for <strong>{{email}}</strong>. Our team is currently reviewing your application documents.
            </p>
            <p style="font-size: 15px; color: #525252; margin-bottom: 28px; line-height: 1.6;">
                This process usually takes <strong>24-48 hours</strong>. We will notify you once your access is ready.
            </p>
            <div style="display: flex;">
                <a href="https://fraterny.com/affiliates" style="display: inline-block; padding: 12px 24px; font-size: 15px; font-weight: 500; text-decoration: none; border-radius: 6px; background-color: #10b981; color: #ffffff;">Read the docs</a>
            </div>
        </div>

        <!-- Updated Footer -->
        <div class="mobile-footer" style="padding: 32px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 13px; color: #737373; margin: 0 0 8px 0;">© 2026 Fraterny Inc.</p>
            <p style="font-size: 13px; color: #737373; margin: 0;">Kolkata, India | support@fraterny.com</p>
        </div>
    </div>
</body>
</html>`;

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

        // Send confirmation email
        try {
            const smtpHost = process.env.MAILTRAP_HOST;
            const smtpPort = process.env.MAILTRAP_PORT;
            const smtpUser = process.env.MAILTRAP_USERNAME;
            const smtpPass = process.env.MAILTRAP_PASSWORD;

            if (smtpHost && smtpPort && smtpUser && smtpPass) {
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: parseInt(smtpPort),
                    secure: false,
                    auth: {
                        user: smtpUser,
                        pass: smtpPass,
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                const emailHtml = EMAIL_TEMPLATE
                    .replace('{{name}}', `${firstName} ${lastName}`)
                    .replace('{{email}}', email);

                await transporter.sendMail({
                    from: '"Frat." <yashmalhotra@fraterny.com>',
                    to: email,
                    replyTo: 'yashmalhotra@fraterny.com',
                    subject: 'Partnership Application Received',
                    html: emailHtml,
                });
            } else {
                console.warn('SMTP configuration missing, skipping email');
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Don't fail the request if email fails, as the application was saved
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
