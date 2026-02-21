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
  { name: 'Github', url: 'https://github.com/Tabishhaider72' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sayed-tabish-haider' },
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6 md:gap-0">
          <h1 className="banner-title leading-[.95] text-5xl sm:text-7xl md:text-[80px] font-anton text-black uppercase tracking-tight">
            RECENT — WORKS FROM ©2023–2024
          </h1>
          <div className="flex gap-4 md:mb-4">
            {externalLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base md:text-lg font-anton text-black border border-gray-200 rounded-full px-5 py-2 hover:border-black hover:bg-neutral-100 transition-all duration-300"
              >
                {link.name}
                {link.name === 'Github' && (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.752 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
                )}
                {link.name === 'LinkedIn' && (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.34A4 4 0 0 1 16 8ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                )}
              </a>
            ))}
          </div>
        </div>
        {/* Improved and larger View Full Portfolio button */}
        <div className="mb-14 flex justify-start">
          <a
            href="https://github.com/Tabishhaider72"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 px-10 py-5 rounded-full border-2 border-black bg-black text-white font-anton text-2xl md:text-3xl uppercase tracking-widest shadow-lg hover:bg-white hover:text-black hover:shadow-xl transition-all duration-300 focus:outline-none"
          >
            <span className="font-bold">View Full Portfolio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-2 transition-all duration-300"
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
