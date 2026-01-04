
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const APPROVE_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @media screen and (max-width: 480px) {
            .mobile-header { padding: 24px 20px !important; }
            .mobile-content { padding: 30px 20px !important; }
            .mobile-footer { padding: 24px 20px !important; }
            .mobile-btn { margin-bottom: 12px !important; display: inline-block !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 10px; background-color: #f6f6f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div class="mobile-header" style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #e5e5e5;">
            <img src="https://fraterny.com/email_logo.png" alt="Fraterny" height="28" style="display: block; height: 28px; width: auto; border: 0;">
        </div>

        <!-- Content -->
        <div class="mobile-content" style="padding: 40px 40px 32px 40px;">
            <div style="display: inline-block; padding: 4px 12px; border-radius: 4px; background-color: #f0fdf4; color: #16a34a; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">Access Granted</div>
            <h2 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 24px; line-height: 1.3;">Approved, {{name}}!</h2>
            <p style="font-size: 15px; color: #525252; margin-bottom: 24px; line-height: 1.6;">
                Your application for <strong>{{email}}</strong> is verified. You now have full access to the network.
            </p>
            <div style="margin-bottom: 28px; border-left: 3px solid #10b981; padding-left: 16px;">
                <div style="font-size: 14px; color: #1a1a1a; padding: 4px 0;">• Affiliate dashboard activated</div>
                <div style="font-size: 14px; color: #1a1a1a; padding: 4px 0;">• Custom referral links enabled</div>
            </div>
            <div style="font-size: 0;">
                <a href="https://fraterny.com/affiliates/dashboard" class="mobile-btn" style="display: inline-block; padding: 12px 24px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px; background-color: #1a1a1a; color: #ffffff; margin-right: 12px; vertical-align: top;">Login to Dashboard</a>
                <a href="https://fraterny.com/affiliates" class="mobile-btn" style="display: inline-block; padding: 12px 24px; font-size: 15px; font-weight: 500; text-decoration: none; border-radius: 6px; background-color: #f3f3f3; color: #1a1a1a; vertical-align: top;">View Guide</a>
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

const REJECT_TEMPLATE = `<!DOCTYPE html>
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
<body style="margin: 0; padding: 10px; background-color: #f6f6f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div class="mobile-header" style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #e5e5e5;">
            <img src="https://fraterny.com/email_logo.png" alt="Fraterny" height="28" style="display: block; height: 28px; width: auto; border: 0;">
        </div>

        <!-- Content -->
        <div class="mobile-content" style="padding: 40px 40px 32px 40px;">
            <div style="display: inline-block; padding: 4px 12px; border-radius: 4px; background-color: #fef2f2; color: #ef4444; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">Application Update</div>
            <h2 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 24px; line-height: 1.3;">Hello {{name}},</h2>
            <p style="font-size: 15px; color: #525252; margin-bottom: 24px; line-height: 1.6;">
                Thank you for your interest in partnering with Fraterny. After careful review of your application for <strong>{{email}}</strong>, we regret to inform you that we cannot move forward with your partnership request at this time.
            </p>
            <p style="font-size: 15px; color: #525252; margin-bottom: 28px; line-height: 1.6;">
                We appreciate the time you took to apply and encourage you to continue engaging with our community.
            </p>
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
        const { id, status, name, email } = body;

        if (!id || !status || !email) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send email based on status
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

                let emailHtml = '';
                let subject = '';

                if (status === 'approved') {
                    emailHtml = APPROVE_TEMPLATE
                        .replace('{{name}}', name)
                        .replace('{{email}}', email);
                    subject = 'Application Approved - Welcome to Fraterny';
                } else if (status === 'rejected') {
                    emailHtml = REJECT_TEMPLATE
                        .replace('{{name}}', name)
                        .replace('{{email}}', email);
                    subject = 'Update on your Fraterny Application';
                }

                if (emailHtml) {
                    await transporter.sendMail({
                        from: '"Frat." <yashmalhotra@fraterny.com>',
                        to: email,
                        replyTo: 'yashmalhotra@fraterny.com',
                        subject: subject,
                        html: emailHtml,
                    });
                }
            } else {
                console.warn('SMTP configuration missing, skipping email');
            }
        } catch (emailError) {
            console.error('Error sending status email:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Email notification sent successfully'
        });
    } catch (error) {
        console.error('Error in email notification route:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
