'use client';

import React from 'react';
import HireLayout from '@/components/hire/HireLayout';
import TransitionLink from '@/components/TransitionLink';
import { Briefcase, Code2, Calendar, MessageSquare, ArrowRight } from 'lucide-react';

const HIRE_PATHS = [
    {
        id: 'job',
        title: 'Hire Me for a Role',
        subtitle: 'For recruiters, founders & engineering leads seeking a Full-Stack Developer for full-time or contract roles.',
        icon: Briefcase,
        href: '/hire/job',
        tag: 'Recruitment',
        cardBg: 'bg-neutral-900 border-neutral-800 hover:border-neutral-700',
        iconBg: 'bg-black text-blue-400 border border-neutral-800',
        badgeColor: 'bg-black text-blue-300 border-neutral-800',
    },
    {
        id: 'project',
        title: 'Build a Project',
        subtitle: 'For founders & businesses who need a high-quality SaaS, Mobile App, AI Product, Website, or API built from scratch.',
        icon: Code2,
        href: '/hire/project',
        tag: 'Interactive Estimator',
        cardBg: 'bg-neutral-900 border-neutral-800 hover:border-neutral-700',
        iconBg: 'bg-black text-emerald-400 border border-neutral-800',
        badgeColor: 'bg-black text-emerald-300 border-neutral-800',
    },
    {
        id: 'consultation',
        title: 'Schedule a Consultation',
        subtitle: 'Book a 1-on-1 direct technical strategy call to discuss architecture, code review, or project requirements.',
        icon: Calendar,
        href: '/hire/consultation',
        tag: 'Direct Calendar',
        cardBg: 'bg-neutral-900 border-neutral-800 hover:border-neutral-700',
        iconBg: 'bg-black text-amber-400 border border-neutral-800',
        badgeColor: 'bg-black text-amber-300 border-neutral-800',
    },
    {
        id: 'contact',
        title: 'Something Else',
        subtitle: 'For speaking, general inquiries, technical advice, mentorship, or custom open-source collaborations.',
        icon: MessageSquare,
        href: '/hire/contact',
        tag: 'General Inquiry',
        cardBg: 'bg-neutral-900 border-neutral-800 hover:border-neutral-700',
        iconBg: 'bg-black text-purple-400 border border-neutral-800',
        badgeColor: 'bg-black text-purple-300 border-neutral-800',
    },
];

export default function HirePage() {
    return (
        <HireLayout
            title="How can we work together?"
            subtitle="Select the pathway that best fits your requirements to begin a streamlined work intake experience."
            backHref="/"
            show3DVisual={true}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                {HIRE_PATHS.map((path) => {
                    const Icon = path.icon;
                    return (
                        <TransitionLink
                            key={path.id}
                            href={path.href}
                            className={`group relative p-6 rounded-2xl ${path.cardBg} border hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl`}
                        >
                            {/* Card Header */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${path.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                        <Icon size={24} />
                                    </div>
                                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${path.badgeColor}`}>
                                        {path.tag}
                                    </span>
                                </div>
                                <h3 className="text-xl font-anton uppercase tracking-wide text-white group-hover:text-amber-400 transition-colors mb-2">
                                    {path.title}
                                </h3>
                                <p className="text-sm font-normal text-neutral-300 leading-relaxed group-hover:text-white transition-colors">
                                    {path.subtitle}
                                </p>
                            </div>

                            {/* Card Footer CTA */}
                            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-400 transition-colors">
                                <span>Get Started</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-amber-400" />
                            </div>
                        </TransitionLink>
                    );
                })}
            </div>
        </HireLayout>
    );
}
