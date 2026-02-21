"use client";
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
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
