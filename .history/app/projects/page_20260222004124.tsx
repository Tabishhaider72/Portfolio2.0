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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })
      .from(
        ctaRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );
  }, { scope: containerRef });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-white"
      ref={containerRef}
    >



      <div className="container mx-auto px-6">

        {/* ===== HERO HEADER ===== */}
        <div className="max-w-5xl mx-auto text-center">

          <h1
            ref={headingRef}
            className="font-anton uppercase text-black leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-[90px]"
          >
            RECENT — WORKS FROM <br /> ©2023–2024
          </h1>

          {/* ===== CTA Buttons ===== */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="/resume"
              className="px-6 py-3 text-sm uppercase tracking-widest rounded-full border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Click to Check Resume
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 text-sm uppercase tracking-widest rounded-full border border-gray-300 hover:border-black transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* ===== PROJECT GRID ===== */}
        <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, idx) => (
            <ProjectCard project={project} index={idx} key={project.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;