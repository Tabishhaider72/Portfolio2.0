import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNotificationEmails } from '@/lib/notifications/email';
import { sendTelegramNotification } from '@/lib/notifications/telegram';
import { verifyTurnstileToken } from '@/lib/security/turnstile';
import { HireSubmissionPayload, HireRequestRecord } from '@/types/hire';

const hireSchema = z.object({
    type: z.enum(['JOB', 'PROJECT', 'CONSULTATION', 'OTHER']),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    phone: z.string().optional(),
    
    // Role fields
    roleTitle: z.string().optional(),
    jobDescriptionUrl: z.string().optional(),
    location: z.string().optional(),
    employmentType: z.string().optional(),
    linkedinUrl: z.string().optional(),

    // Project fields
    projectType: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    budget: z.string().optional(),
    targetUsers: z.string().optional(),
    referenceUrl: z.string().optional(),
    additionalRequirements: z.string().optional(),

    // Estimate fields
    complexityScore: z.number().optional(),
    complexityCategory: z.enum(['STARTER', 'STANDARD', 'ADVANCED', 'CUSTOM']).optional(),
    estimatedRange: z.string().optional(),

    turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Zod Validation
        const parseResult = hireSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    details: parseResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const payload: HireSubmissionPayload = parseResult.data;

        // 2. Turnstile Verification
        if (payload.turnstileToken) {
            const isTurnstileValid = await verifyTurnstileToken(payload.turnstileToken);
            if (!isTurnstileValid) {
                return NextResponse.json(
                    { success: false, error: 'Spam check failed. Please try again.' },
                    { status: 422 }
                );
            }
        }

        // 3. Construct Record Object
        const timestamp = new Date().toISOString();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const requestId = `HC-2026-${randomNum}`;
        const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}`;

        const record: HireRequestRecord = {
            id,
            requestId,
            type: payload.type,
            name: payload.name,
            email: payload.email,
            company: payload.company || '',
            phone: payload.phone || '',
            roleTitle: payload.roleTitle || '',
            jobDescriptionUrl: payload.jobDescriptionUrl || '',
            location: payload.location || '',
            employmentType: payload.employmentType || '',
            linkedinUrl: payload.linkedinUrl || '',
            projectType: payload.projectType || '',
            description: payload.description || '',
            features: payload.features || [],
            timeline: payload.timeline || '',
            budget: payload.budget || '',
            targetUsers: payload.targetUsers || '',
            referenceUrl: payload.referenceUrl || '',
            additionalRequirements: payload.additionalRequirements || '',
            complexityScore: payload.complexityScore || 0,
            complexityCategory: payload.complexityCategory || 'STARTER',
            estimatedRange: payload.estimatedRange || '',
            status: 'NEW',
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        // 4. Dispatch Notifications (Resend Email & Telegram Push) asynchronously
        Promise.all([
            sendNotificationEmails(record).catch((err) => console.error('Email notify error:', err)),
            sendTelegramNotification(record).catch((err) => console.error('Telegram notify error:', err)),
        ]);

        return NextResponse.json({
            success: true,
            requestId: record.requestId,
            data: record,
        });
    } catch (error: any) {
        console.error('[POST /api/hire Error]:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'An unexpected server error occurred.',
            },
            { status: 500 }
        );
    }
}
