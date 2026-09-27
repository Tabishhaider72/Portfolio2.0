'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HireLayout from '@/components/hire/HireLayout';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Calendar, CheckCircle2, Clock, Video } from 'lucide-react';

function ConsultationContent() {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type') || 'consultation';
    const requestId = searchParams.get('requestId');
    const userEmail = searchParams.get('email') || '';
    const userName = searchParams.get('name') || '';

    const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || 'syed-tabish/30min';

    useEffect(() => {
        (async () => {
            try {
                const cal = await getCalApi();
                cal('ui', {
                    theme: 'dark',
                    styles: { branding: { brandColor: '#000000' } },
                    hideEventTypeDetails: false,
                    layout: 'month_view',
                });
            } catch (err) {
                console.error('Cal UI init error:', err);
            }
        })();
    }, []);

    const eventTitle = {
        interview: 'Technical Interview / Intro Call',
        project: 'Project Requirements & Scope Discussion',
        consultation: '1-on-1 Technical Consultation Call',
    }[typeParam] || '1-on-1 Discussion';

    return (
        <HireLayout
            title={eventTitle}
            subtitle={requestId ? `Request ID: ${requestId} — Select an available date & time slot for our discussion.` : 'Choose a convenient time on my calendar for our meeting.'}
            backHref={requestId ? `/hire/success?requestId=${requestId}` : '/hire'}
            show3DVisual={false}
        >
            <div className="w-full space-y-6">
                {/* Meeting Highlights Header */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-anton">Duration</p>
                            <p className="text-sm font-semibold text-foreground">30–45 Minutes</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                            <Video size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-anton">Location</p>
                            <p className="text-sm font-semibold text-foreground">Google Meet / Zoom</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-anton">Instant Sync</p>
                            <p className="text-sm font-semibold text-foreground">G-Calendar Auto-Invite</p>
                        </div>
                    </div>
                </div>

                {/* Cal.com Embed Container */}
                <div className="w-full rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden min-h-[600px] shadow-2xl">
                    <Cal
                        namespace="30min"
                        calLink={calLink}
                        style={{ width: '100%', height: '100%', minHeight: '600px' }}
                        config={{
                            layout: 'month_view',
                            theme: 'dark',
                            name: userName || undefined,
                            email: userEmail || undefined,
                        } as any}
                    />
                </div>
            </div>
        </HireLayout>
    );
}

export default function ConsultationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center space-y-3">
                    <Calendar className="animate-spin text-primary mx-auto" size={32} />
                    <p className="text-sm text-muted-foreground">Loading calendar availability...</p>
                </div>
            </div>
        }>
            <ConsultationContent />
        </Suspense>
    );
}
