'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import HireLayout from '@/components/hire/HireLayout';
import Button from '@/components/Button';
import { calculateProjectComplexity, ProjectEstimateResult } from '@/lib/project-estimator';
import { Turnstile } from '@marsidev/react-turnstile';
import { 
    Globe, Smartphone, Cpu, Shield, Database, LayoutDashboard, 
    CreditCard, Zap, Bell, Flame, Check, ArrowRight, ArrowLeft, 
    Sparkles, Calculator, Layers, Clock, DollarSign, User, Mail, Building, Phone 
} from 'lucide-react';

const PROJECT_TYPES = [
    { id: 'Website', label: 'Website / Portfolio', icon: Globe, desc: 'High-conversion, animated landing page or corporate site' },
    { id: 'SaaS', label: 'SaaS Application', icon: LayoutDashboard, desc: 'Multi-tenant web platform with auth, database & billing' },
    { id: 'Mobile App', label: 'Mobile App', icon: Smartphone, desc: 'iOS & Android cross-platform mobile experience' },
    { id: 'AI / LLM Product', label: 'AI / LLM Agent', icon: Cpu, desc: 'Custom AI chatbots, RAG pipelines, or generative workflows' },
    { id: 'E-commerce', label: 'E-commerce Store', icon: CreditCard, desc: 'Online storefront with cart, checkout & inventory' },
    { id: 'API / Backend', label: 'API / Microservice', icon: Database, desc: 'Scalable backend API, database schema & integration' },
    { id: 'Internal Tool', label: 'Internal Dashboard', icon: Shield, desc: 'Custom admin panel, analytics tool, or workflow hub' },
    { id: 'Other', label: 'Custom Solution', icon: Sparkles, desc: 'Unique technical concept or specialized requirement' },
];

const FEATURE_OPTIONS = [
    { id: 'Authentication', label: 'User Auth & Roles', icon: Shield },
    { id: 'Database', label: 'PostgreSQL / Mongo DB', icon: Database },
    { id: 'Admin Dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'Payments', label: 'Stripe / Razorpay Billing', icon: CreditCard },
    { id: 'Real-time functionality', label: 'Real-time WebSockets', icon: Zap },
    { id: 'AI / LLM', label: 'AI / LLM Integration', icon: Cpu },
    { id: 'Notifications', label: 'Push & Email Alerts', icon: Bell },
    { id: 'Third-party APIs', label: 'Third-party Integrations', icon: Flame },
    { id: 'Mobile application', label: 'Companion Mobile App', icon: Smartphone },
    { id: 'File storage', label: 'Cloud Storage (S3 / CDN)', icon: Globe },
];

const TIMELINE_OPTIONS = [
    { id: '1–2 weeks', label: '1–2 Weeks (Fast Track)', desc: 'High priority rapid build' },
    { id: '3–4 weeks', label: '3–4 Weeks (Standard)', desc: 'Balanced timeline for core product' },
    { id: '1–2 months', label: '1–2 Months', desc: 'Thorough production development' },
    { id: '2+ months', label: '2+ Months', desc: 'Large scope / enterprise project' },
    { id: 'Flexible', label: 'Flexible / Not Urgent', desc: 'Open timeline' },
];

const BUDGET_OPTIONS = [
    { id: '₹40k – ₹80k ($500 – $1,000)', label: '₹40k – ₹80k (~$500 – $1k)', cat: 'Starter Scope' },
    { id: '₹80k – ₹1.2L ($1,000 – $1.5k)', label: '₹80k – ₹1.2L (~$1k – $1.5k)', cat: 'Standard Scope' },
    { id: '₹1.2L – ₹2.5L ($1.5k – $3,000)', label: '₹1.2L – ₹2.5L (~$1.5k – $3k)', cat: 'Advanced Scope' },
    { id: '₹2.5L+ ($3,500+)', label: '₹2.5L+ (~$3,500+)', cat: 'Custom Enterprise' },
];

export default function ProjectHirePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const totalSteps = 6;

    const [projectType, setProjectType] = useState('SaaS');
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Authentication', 'Database', 'Admin Dashboard']);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [targetUsers, setTargetUsers] = useState('');
    const [referenceUrl, setReferenceUrl] = useState('');
    const [additionalRequirements, setAdditionalRequirements] = useState('');
    const [timeline, setTimeline] = useState('3–4 weeks');
    const [budget, setBudget] = useState('₹80k – ₹1.2L ($1,000 – $1.5k)');

    // Contact fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Calculate complexity calculation deterministically
    const estimate: ProjectEstimateResult = useMemo(() => {
        return calculateProjectComplexity({
            projectType,
            features: selectedFeatures,
            timeline,
            budget,
        });
    }, [projectType, selectedFeatures, timeline, budget]);

    const toggleFeature = (featureId: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(featureId)
                ? prev.filter((f) => f !== featureId)
                : [...prev, featureId]
        );
    };

    const handleNext = () => {
        setError(null);
        if (step === 3 && !description.trim()) {
            setError('Please provide a short description of your project concept.');
            return;
        }
        if (step < totalSteps) {
            setStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setError(null);
        if (step > 1) {
            setStep((prev) => prev - 1);
        } else {
            router.push('/hire');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim() || !email.trim()) {
            setError('Please provide your name and work email.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/hire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'PROJECT',
                    name,
                    email,
                    company,
                    phone,
                    projectType,
                    description,
                    features: selectedFeatures,
                    timeline,
                    budget,
                    targetUsers,
                    referenceUrl,
                    additionalRequirements,
                    complexityScore: estimate.score,
                    complexityCategory: estimate.category,
                    estimatedRange: estimate.estimatedRange,
                    turnstileToken,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push(`/hire/success?requestId=${data.requestId}&type=PROJECT&category=${estimate.category}`);
            } else {
                setError(data.error || 'Submission failed. Please try again.');
            }
        } catch (err: any) {
            setError(err?.message || 'A network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    return (
        <HireLayout
            title={
                step === 1 ? 'What are you looking to build?' :
                step === 2 ? 'What does your project need?' :
                step === 3 ? 'Tell me about the project' :
                step === 4 ? 'What is your target timeline?' :
                step === 5 ? 'What budget range are you considering?' :
                'Review Project Scope & Submit'
            }
            subtitle={
                step === 1 ? 'Select the primary architecture or product category.' :
                step === 2 ? 'Choose the key functional capabilities required.' :
                step === 3 ? 'Share your vision, core features, or reference links.' :
                step === 4 ? 'Select your ideal launch schedule.' :
                step === 5 ? 'Select an estimated investment range.' :
                'Inspect calculated complexity category & provide contact details.'
            }
            backHref="/hire"
            currentStep={step}
            totalSteps={totalSteps}
        >
            <div className="w-full">
                {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm">
                        {error}
                    </div>
                )}

                {/* Step 1: Project Type Selection */}
                {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {PROJECT_TYPES.map((type) => {
                            const Icon = type.icon;
                            const isSelected = projectType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setProjectType(type.id)}
                                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                                        isSelected
                                            ? 'bg-amber-400 text-black border-amber-300 font-semibold shadow-xl scale-[1.01]'
                                            : 'bg-slate-900/80 border-white/20 text-white hover:bg-slate-800'
                                    }`}
                                >
                                    <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-black text-amber-400' : 'bg-white/10 text-slate-300'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="grow">
                                        <p className="font-anton uppercase tracking-wide text-base">{type.label}</p>
                                        <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-300'}`}>{type.desc}</p>
                                    </div>
                                    {isSelected && <Check size={18} className="text-black mt-1" />}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Step 2: Features Needed */}
                {step === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FEATURE_OPTIONS.map((feature) => {
                            const Icon = feature.icon;
                            const isSelected = selectedFeatures.includes(feature.id);
                            return (
                                <button
                                    key={feature.id}
                                    type="button"
                                    onClick={() => toggleFeature(feature.id)}
                                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md'
                                            : 'bg-slate-900/80 border-white/20 text-white hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className={isSelected ? 'text-black' : 'text-slate-300'} />
                                        <span className="text-sm font-medium">{feature.label}</span>
                                    </div>
                                    <div className={`size-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-black border-black text-amber-400' : 'border-white/30'}`}>
                                        {isSelected && <Check size={12} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Step 3: Project Details */}
                {step === 3 && (
                    <div className="space-y-4 bg-slate-900/80 border border-white/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                                Project Name (Optional)
                            </label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="e.g. NextGen AI Dashboard"
                                className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                                Tell me about the project & core objectives *
                            </label>
                            <textarea
                                rows={4}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What problem does your product solve? Who are your users? What core workflows or features must be built?"
                                className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                                    Target Audience / Users
                                </label>
                                <input
                                    type="text"
                                    value={targetUsers}
                                    onChange={(e) => setTargetUsers(e.target.value)}
                                    placeholder="e.g. Founders, B2B Marketers, General Public"
                                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                                    Reference URL / Existing Product
                                </label>
                                <input
                                    type="url"
                                    value={referenceUrl}
                                    onChange={(e) => setReferenceUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Timeline */}
                {step === 4 && (
                    <div className="space-y-3">
                        {TIMELINE_OPTIONS.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTimeline(t.id)}
                                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                                    timeline === t.id
                                        ? 'bg-amber-400 text-black border-amber-300 shadow-lg font-bold'
                                        : 'bg-slate-900/80 border-white/20 text-white hover:bg-slate-800'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Clock size={20} className={timeline === t.id ? 'text-black' : 'text-slate-300'} />
                                    <div>
                                        <p className="font-anton uppercase tracking-wide text-sm">{t.label}</p>
                                        <p className={`text-xs ${timeline === t.id ? 'text-slate-900 font-medium' : 'text-slate-300'}`}>{t.desc}</p>
                                    </div>
                                </div>
                                {timeline === t.id && <Check size={18} />}
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 5: Budget Range */}
                {step === 5 && (
                    <div className="space-y-3">
                        {BUDGET_OPTIONS.map((b) => (
                            <button
                                key={b.id}
                                type="button"
                                onClick={() => setBudget(b.id)}
                                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                                    budget === b.id
                                        ? 'bg-amber-400 text-black border-amber-300 shadow-lg font-bold'
                                        : 'bg-slate-900/80 border-white/20 text-white hover:bg-slate-800'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <DollarSign size={20} className={budget === b.id ? 'text-black' : 'text-slate-300'} />
                                    <div>
                                        <p className="font-anton uppercase tracking-wide text-base">{b.label}</p>
                                        <p className={`text-xs ${budget === b.id ? 'text-slate-900 font-medium' : 'text-slate-300'}`}>{b.cat}</p>
                                    </div>
                                </div>
                                {budget === b.id && <Check size={18} />}
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 6: Calculation & Final Submission Form */}
                {step === 6 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Calculated Category Card */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/20 backdrop-blur-xl shadow-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs uppercase font-anton tracking-widest text-slate-300 flex items-center gap-1.5">
                                    <Calculator size={14} className="text-emerald-400" />
                                    Calculated Complexity Category
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                                    {estimate.category} (Score: {estimate.score})
                                </span>
                            </div>

                            <h3 className="text-xl font-anton uppercase text-white">{estimate.categoryLabel}</h3>
                            <p className="text-sm text-slate-300 mt-1">{estimate.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/15 text-xs">
                                <div>
                                    <span className="text-slate-400 block">Estimated Scope Range:</span>
                                    <span className="font-bold text-emerald-400 text-sm">{estimate.estimatedRange}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Recommended Stack:</span>
                                    <span className="font-semibold text-white">{estimate.recommendedTechStack.join(', ')}</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 italic">* Estimates are scope-based for initial planning and non-binding.</p>
                        </div>

                        {/* Contact Information Fields */}
                        <div className="bg-slate-900/80 border border-white/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4">
                            <h4 className="text-sm font-anton uppercase text-white tracking-wider mb-2">Contact Details</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-1.5">
                                        Your Name *
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-1.5">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="john@company.com"
                                            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-1.5">
                                        Company / Business Name
                                    </label>
                                    <div className="relative">
                                        <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="Acme Inc."
                                            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-1.5">
                                        Phone / WhatsApp (Optional)
                                    </label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Cloudflare Turnstile Spam Shield */}
                            {turnstileSiteKey && (
                                <div className="pt-2">
                                    <Turnstile
                                        siteKey={turnstileSiteKey}
                                        onSuccess={(token) => setTurnstileToken(token)}
                                    />
                                </div>
                            )}
                        </div>

                        <Button
                            as="button"
                            type="submit"
                            loading={loading}
                            variant="primary"
                            className="w-full py-4 text-white bg-foreground hover:bg-slate-800 border border-white/20"
                        >
                            Submit Project Request
                        </Button>
                    </form>
                )}

                {/* Step Controller Buttons */}
                {step < totalSteps && (
                    <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/15">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <ArrowLeft size={16} />
                            <span>{step === 1 ? 'Cancel' : 'Previous Step'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-6 py-3 rounded-xl bg-white text-black font-anton uppercase tracking-widest hover:bg-amber-300 transition-all flex items-center gap-2 text-sm shadow-xl"
                        >
                            <span>Continue</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </HireLayout>
    );
}
