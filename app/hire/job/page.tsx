'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HireLayout from '@/components/hire/HireLayout';
import Button from '@/components/Button';
import { JobSelection } from '@/types/hire';
import { Building2, User, Mail, Link as LinkIcon, MapPin, Briefcase, FileText, CalendarCheck2 } from 'lucide-react';

export default function JobHirePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<JobSelection>({
        recruiterName: '',
        company: '',
        roleTitle: '',
        jobDescriptionUrl: '',
        location: 'Remote',
        employmentType: 'Full-time',
        additionalInfo: '',
        email: '',
        linkedinUrl: '',
    });

    const [scheduleMeeting, setScheduleMeeting] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.recruiterName.trim() || !formData.email.trim() || !formData.roleTitle.trim()) {
            setError('Please fill in your Name, Email, and Role Title.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/hire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'JOB',
                    name: formData.recruiterName,
                    email: formData.email,
                    company: formData.company,
                    roleTitle: formData.roleTitle,
                    jobDescriptionUrl: formData.jobDescriptionUrl,
                    location: formData.location,
                    employmentType: formData.employmentType,
                    additionalRequirements: formData.additionalInfo,
                    linkedinUrl: formData.linkedinUrl,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                if (scheduleMeeting) {
                    router.push(`/hire/consultation?type=interview&requestId=${data.requestId}&email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.recruiterName)}`);
                } else {
                    router.push(`/hire/success?requestId=${data.requestId}&type=JOB`);
                }
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
            title="Hire Me for a Role"
            subtitle="Share the details of your role, company, and team so we can discuss mutual fit."
            backHref="/hire"
        >
            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/80 border border-white/20 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                {error && (
                    <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Recruiter Name */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Your Name *
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                name="recruiterName"
                                required
                                value={formData.recruiterName}
                                onChange={handleChange}
                                placeholder="e.g. Sarah Jenkins"
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Work Email *
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="sarah@company.com"
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Company / Organization
                        </label>
                        <div className="relative">
                            <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Acme Labs Inc."
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Role Title */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Role Title *
                        </label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                name="roleTitle"
                                required
                                value={formData.roleTitle}
                                onChange={handleChange}
                                placeholder="e.g. Senior Full-Stack Engineer"
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Location */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Location Type
                        </label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white appearance-none"
                            >
                                <option value="Remote" className="bg-slate-900 text-white">Remote</option>
                                <option value="Hybrid" className="bg-slate-900 text-white">Hybrid</option>
                                <option value="Onsite" className="bg-slate-900 text-white">Onsite</option>
                                <option value="Relocation Available" className="bg-slate-900 text-white">Relocation Available</option>
                            </select>
                        </div>
                    </div>

                    {/* Employment Type */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Employment Type
                        </label>
                        <select
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white"
                        >
                            <option value="Full-time" className="bg-slate-900 text-white">Full-time</option>
                            <option value="Contract / Freelance" className="bg-slate-900 text-white">Contract / Freelance</option>
                            <option value="Part-time" className="bg-slate-900 text-white">Part-time</option>
                            <option value="Advisory / Fractional" className="bg-slate-900 text-white">Advisory / Fractional</option>
                        </select>
                    </div>

                    {/* Job Description URL */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                            Job Posting URL
                        </label>
                        <div className="relative">
                            <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="url"
                                name="jobDescriptionUrl"
                                value={formData.jobDescriptionUrl}
                                onChange={handleChange}
                                placeholder="https://careers.com/job/123"
                                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-300 font-anton mb-2">
                        Role Overview & Tech Stack Expectations
                    </label>
                    <div className="relative">
                        <FileText size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                        <textarea
                            name="additionalInfo"
                            rows={3}
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            placeholder="Brief description of project goals, team size, primary tech stack (Next.js, Node, React, etc.), or interview schedule..."
                            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder:text-slate-400 resize-none"
                        />
                    </div>
                </div>

                {/* Schedule Interview Checkbox Option */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20">
                    <input
                        type="checkbox"
                        id="scheduleMeeting"
                        checked={scheduleMeeting}
                        onChange={(e) => setScheduleMeeting(e.target.checked)}
                        className="size-4 accent-amber-400 rounded cursor-pointer"
                    />
                    <label htmlFor="scheduleMeeting" className="text-sm font-semibold text-white cursor-pointer flex items-center gap-2">
                        <CalendarCheck2 size={16} className="text-emerald-400" />
                        <span>Schedule an intro interview call right after submission (via Cal.com)</span>
                    </label>
                </div>

                {/* Form Submit */}
                <div className="pt-2">
                    <Button
                        as="button"
                        type="submit"
                        loading={loading}
                        variant="primary"
                        className="w-full text-white bg-foreground hover:bg-slate-800 border border-white/20"
                    >
                        Submit Role Information
                    </Button>
                </div>
            </form>
        </HireLayout>
    );
}
