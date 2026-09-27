'use client';

import React from 'react';
import Image from 'next/image';
import TransitionLink from '@/components/TransitionLink';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HireLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    backHref?: string;
    currentStep?: number;
    totalSteps?: number;
    show3DVisual?: boolean;
    className?: string;
}

export default function HireLayout({
    children,
    title,
    subtitle,
    backHref = '/hire',
    currentStep,
    totalSteps,
    show3DVisual = true,
    className,
}: HireLayoutProps) {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col justify-between bg-black text-white">
            {/* Background Ambient Glow Disc */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-900/60 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="container max-w-6xl mx-auto grow flex flex-col">
                {/* Header Navigation & Step Indicator with Black / Light Black Borders */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
                    <TransitionLink
                        href={backHref}
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                    </TransitionLink>

                    {currentStep && totalSteps && (
                        <div className="flex items-center gap-3">
                            <span className="text-xs uppercase tracking-widest text-neutral-400 font-anton">
                                Step {currentStep} of {totalSteps}
                            </span>
                            <div className="w-28 h-1.5 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                                <div
                                    className="h-full bg-white transition-all duration-500 rounded-full"
                                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center grow">
                    {/* Left Primary Interactive Area */}
                    <div className={cn(
                        show3DVisual ? 'lg:col-span-7' : 'lg:col-span-12',
                        'w-full flex flex-col justify-center'
                    )}>
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-200 mb-3">
                                <Sparkles size={13} className="text-amber-400" />
                                <span>Interactive Work Experience</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-anton tracking-tight uppercase leading-tight text-white drop-shadow-sm">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="mt-2.5 text-base sm:text-lg text-neutral-300 font-normal max-w-xl leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <div className={cn('w-full', className)}>
                            {children}
                        </div>
                    </div>

                    {/* Right Non-Animated Theme 3D Render */}
                    {show3DVisual && (
                        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative select-none">
                            <div className="relative w-full max-w-md aspect-square flex items-center justify-center group">
                                {/* Glowing backdrop disc */}
                                <div className="absolute inset-0 bg-neutral-900/80 rounded-3xl blur-2xl border border-neutral-800" />
                                
                                <Image
                                    src="/hire-3d.png"
                                    alt="Hire Work Intake 3D Visual"
                                    width={450}
                                    height={450}
                                    className="object-contain relative z-10 rounded-2xl border border-neutral-800/80 shadow-2xl"
                                    priority
                                />
                            </div>

                            <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-300 bg-neutral-900/90 px-4 py-2 rounded-full border border-neutral-800 shadow-lg">
                                <ShieldCheck size={15} className="text-emerald-400" />
                                <span>Direct response guaranteed within 24 hours</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
