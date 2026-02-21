"use client";

import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ProjectsPage = () => {
const containerRef = useRef<HTMLDivElement>(null);
const titleRef = useRef<HTMLHeadingElement>(null);
const ctaRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
gsap.from(titleRef.current, {
y: 60,
opacity: 0,
duration: 1,
ease: "power3.out",
});

```
gsap.from(ctaRef.current, {
  y: 30,
  opacity: 0,
  delay: 0.3,
  duration: 0.8,
  ease: "power2.out",
});
```

}, { scope: containerRef });

return ( <section ref={containerRef} className="bg-white dark:bg-neutral-100">

```
  {/* ================= FIXED VERTICAL SOCIAL ================= */}
  <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
    
    {/* Github */}
    <a
      href="https://github.com/Tabishhaider72"
      target="_blank"
      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.752 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/sayed-tabish-haider"
      target="_blank"
      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v5h-4v-5a2 2 0 10-4 0v5h-4v-9h4v1.34A4 4 0 0116 8z"/>
        <path d="M2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    </a>
  </div>

  {/* ================= HERO (ALWAYS CENTERED) ================= */}
  <div className="min-h-[80vh] flex items-center">
    <div className="container mx-auto px-4">

      <div className="max-w-[900px]">
        
        <h1
          ref={titleRef}
          className="banner-title leading-[0.95] text-5xl sm:text-7xl md:text-[88px] font-anton text-black uppercase tracking-tight"
        >
          RECENT — WORKS FROM ©2023–2024
        </h1>

        {/* CTA GROUP */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">

          {/* Resume View */}
          <a
            href="/resume.pdf"
            className="px-6 py-3 rounded-full bg-black text-white font-anton uppercase text-sm tracking-wider hover:bg-neutral-800 transition"
          >
            Click to checkout resume
          </a>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 rounded-full border border-black font-anton uppercase text-sm tracking-wider hover:bg-black hover:text-white transition"
          >
            Download Resume
          </a>

        </div>

      </div>
    </div>
  </div>

  {/* ================= PROJECT GRID ================= */}
  <div className="container mx-auto px-4 pb-32">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {PROJECTS.map((project, idx) => (
        <ProjectCard project={project} index={idx} key={project.slug} />
      ))}
    </div>
  </div>

</section>
```

);
};

export default ProjectsPage;
