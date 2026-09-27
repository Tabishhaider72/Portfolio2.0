import { Resend } from 'resend';
import { HireRequestRecord } from '@/types/hire';
import { GENERAL_INFO } from '@/lib/data';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendNotificationEmails(record: HireRequestRecord) {
    if (!resend) {
        console.log('[Resend Email Skipped]: RESEND_API_KEY environment variable is not configured.');
        return { success: false, reason: 'RESEND_API_KEY missing' };
    }

    const recipientEmail = GENERAL_INFO.email; // sayedtabish72@gmail.com
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Hire Engine <onboarding@resend.dev>';

    try {
        // 1. Admin Email Content
        const adminSubject = `🚨 [${record.requestId}] New ${record.type} Request: ${record.name} (${record.company || 'Direct'})`;
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; background-color: #0c0c0c; color: #f4f4f4; padding: 24px; border-radius: 8px;">
                <h2 style="color: #ffffff; border-bottom: 2px solid #333; padding-bottom: 8px;">
                    New Hire/Work Intake Request Received
                </h2>
                <p style="font-size: 14px; color: #888;">Request ID: <strong style="color: #fff;">${record.requestId}</strong> | Created: ${new Date(record.createdAt).toLocaleString()}</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Request Type:</td><td style="padding: 8px; border-bottom: 1px solid #222; font-weight: bold; color: #fff;">${record.type}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Client Name:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.name}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;"><a href="mailto:${record.email}" style="color: #60a5fa;">${record.email}</a></td></tr>
                    ${record.company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.company}</td></tr>` : ''}
                    ${record.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.phone}</td></tr>` : ''}
                    
                    ${record.type === 'JOB' ? `
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Role Title:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.roleTitle}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.location}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Employment Type:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.employmentType}</td></tr>
                        ${record.jobDescriptionUrl ? `<tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Job Posting URL:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;"><a href="${record.jobDescriptionUrl}" target="_blank" style="color: #60a5fa;">${record.jobDescriptionUrl}</a></td></tr>` : ''}
                    ` : ''}

                    ${record.type === 'PROJECT' ? `
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Project Type:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.projectType}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Category Level:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #38bdf8; font-weight: bold;">${record.complexityCategory} (Score: ${record.complexityScore})</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Estimated Range:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.estimatedRange}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Budget Range:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.budget}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Timeline:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.timeline}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Features:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.features?.join(', ') || 'None specified'}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #222; color: #aaa;">Description:</td><td style="padding: 8px; border-bottom: 1px solid #222; color: #fff;">${record.description}</td></tr>
                    ` : ''}
                </table>
            </div>
        `;

        // 2. Client Confirmation Email Content
        const clientSubject = `Your request has been received [ID: ${record.requestId}] — Tabish Haider`;
        const clientHtml = `
            <div style="font-family: Arial, sans-serif; background-color: #0c0c0c; color: #ffffff; padding: 32px; border-radius: 8px;">
                <h2 style="margin-top: 0; color: #ffffff;">Hi ${record.name}, thank you for reaching out!</h2>
                <p style="color: #cccccc; line-height: 1.6;">
                    Your <strong>${record.type.toLowerCase()} request</strong> has been received and added to my review queue.
                </p>
                <div style="background-color: #1a1a1a; padding: 16px; border-left: 4px solid #ffffff; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0; font-size: 14px; color: #888;">Request Tracking ID:</p>
                    <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: bold; color: #ffffff;">${record.requestId}</p>
                </div>
                ${record.complexityCategory ? `<p style="color: #94a3b8;">Estimated Complexity Category: <strong>${record.complexityCategory}</strong></p>` : ''}
                <p style="color: #cccccc; line-height: 1.6;">
                    <strong>Next steps:</strong> I will personally inspect your requirements and respond within 24 hours. If urgent, feel free to reply directly to this email.
                </p>
                <hr style="border: 0; border-top: 1px solid #333; margin: 24px 0;" />
                <p style="font-size: 13px; color: #666;">
                    Tabish Haider — Software Developer & Full-Stack Engineer<br />
                    <a href="https://syed-tabish.vercel.app" style="color: #888; text-decoration: underline;">syed-tabish.vercel.app</a>
                </p>
            </div>
        `;

        // Send internal notification
        await resend.emails.send({
            from: fromEmail,
            to: recipientEmail,
            subject: adminSubject,
            html: adminHtml,
        });

        // Send confirmation email to client
        await resend.emails.send({
            from: fromEmail,
            to: record.email,
            subject: clientSubject,
            html: clientHtml,
        });

        return { success: true };
    } catch (error: any) {
        console.error('[Resend Email Error]:', error?.message || error);
        return { success: false, error: error?.message };
    }
}
