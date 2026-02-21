"use client";
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const externalLinks = [
  { name: 'Dribbble', url: 'https://dribbble.com/' },
  { name: 'Behance', url: 'https://www.behance.net/' },
];

const ProjectsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  return (
    <section className="min-h-screen pb-section bg-white dark:bg-neutral-100" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <SectionTitle
            title="RECENT — WORKS FROM ©2023–2024"
            className="text-left text-black uppercase tracking-tight font-bold text-3xl md:text-5xl"
          />
          <div className="flex gap-4">
            {externalLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        {/* Aesthetic UI Button below section header */}
        <div className="mb-10 flex justify-start">
          <a
            href="https://dribbble.com/Tabishhaider72"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 bg-white text-black font-bold uppercase tracking-tight shadow-sm hover:border-black hover:bg-neutral-100 transition-all duration-300 focus:outline-none"
          >
            <span className="text-lg font-anton">View Full Portfolio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-all duration-300"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project, idx) => (
            <ProjectCard project={project} index={idx} key={project.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
