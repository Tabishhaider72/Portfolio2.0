'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HireLayout from '@/components/hire/HireLayout';
import Button from '@/components/Button';
import { User, Mail, MessageSquare, Building } from 'lucide-react';

export default function GeneralContactPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim() || !email.trim() || !message.trim()) {
            setError('Please complete all required fields.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/hire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'OTHER',
                    name,
                    email,
                    company,
                    description: message,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push(`/hire/success?requestId=${data.requestId}&type=OTHER`);
            } else {
                setError(data.error || 'Submission failed. Please try again.');
            }
        } catch (err: any) {
            setError(err?.message || 'A network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <HireLayout
            title="General Inquiry"
            subtitle="Reach out regarding speaking engagements, open source, mentorship, or custom collaborations."
            backHref="/hire"
        >
            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/80 border border-white/20 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                {error && (
                    <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Your Name *
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Alex Vance"
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Email Address *
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@company.com"
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                        Company / Organization (Optional)
                    </label>
                    <div className="relative">
                        <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Organization Name"
                            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                        Message / Details *
                    </label>
                    <div className="relative">
                        <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                        <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share your inquiry or topic of discussion..."
                            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400 resize-none"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        as="button"
                        type="submit"
                        loading={loading}
                        variant="primary"
                        className="w-full text-white bg-foreground hover:bg-slate-800 border border-white/20"
                    >
                        Send Inquiry
                    </Button>
                </div>
            </form>
        </HireLayout>
    );
}
