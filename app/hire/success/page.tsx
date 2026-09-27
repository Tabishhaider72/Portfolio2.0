'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HireLayout from '@/components/hire/HireLayout';
import TransitionLink from '@/components/TransitionLink';
import { CheckCircle, Calendar, Home, ArrowRight, ShieldCheck, MailCheck } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const requestId = searchParams.get('requestId') || 'HC-2026-0042';
    const reqType = searchParams.get('type') || 'PROJECT';
    const category = searchParams.get('category');

    return (
        <HireLayout
            title="Request Received & Logged"
            subtitle="Your work intake submission is officially registered in my review queue."
            backHref="/"
            show3DVisual={true}
        >
            <div className="space-y-6 bg-slate-900/80 border border-white/20 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                {/* ID Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-anton tracking-widest text-emerald-300">Request Tracking ID</p>
                            <p className="text-2xl font-bold font-mono text-white">{requestId}</p>
                        </div>
                    </div>

                    {category && (
                        <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-anton tracking-wider uppercase text-white">
                            Category: <span className="text-emerald-400 font-bold">{category}</span>
                        </div>
                    )}
                </div>

                {/* Timeline / What happens next */}
                <div className="space-y-3">
                    <h3 className="text-sm font-anton uppercase text-white tracking-wider flex items-center gap-2">
                        <ShieldCheck size={16} className="text-blue-400" />
                        Next Steps & Response Timeline
                    </h3>
                    <div className="space-y-2.5 text-sm text-slate-300">
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-black/60 border border-white/10">
                            <span className="size-6 rounded-full bg-white/15 text-xs font-bold flex items-center justify-center text-white shrink-0 mt-0.5">1</span>
                            <div>
                                <p className="font-semibold text-white">Requirement Audit</p>
                                <p className="text-xs text-slate-300">I will manually inspect your submitted details, scope parameters, and technical stack fit.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-black/60 border border-white/10">
                            <span className="size-6 rounded-full bg-white/15 text-xs font-bold flex items-center justify-center text-white shrink-0 mt-0.5">2</span>
                            <div>
                                <p className="font-semibold text-white">Direct Email & Confirmation</p>
                                <p className="text-xs text-slate-300">A response with scope feedback or proposal outline will be sent to your inbox within 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Useful Action CTAs */}
                <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center gap-3">
                    <TransitionLink
                        href={`/hire/consultation?type=${reqType.toLowerCase()}&requestId=${requestId}`}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-anton uppercase tracking-widest text-sm hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                        <Calendar size={18} />
                        <span>Schedule Discussion Now</span>
                        <ArrowRight size={16} />
                    </TransitionLink>

                    <TransitionLink
                        href="/"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/20 text-white font-anton uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        <span>Return to Portfolio</span>
                    </TransitionLink>
                </div>
            </div>
        </HireLayout>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center space-y-3">
                    <MailCheck className="animate-pulse text-emerald-400 mx-auto" size={32} />
                    <p className="text-sm text-slate-300">Verifying request logging...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
