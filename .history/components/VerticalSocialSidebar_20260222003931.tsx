import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const socials = [
  {
    name: "Github",
    url: "https://github.com/Tabishhaider72",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.752 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sayed-tabish-haider",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.34A4 4 0 0 1 16 8Z" />
        <path d="M2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const ProjectHeader: React.FC = () => {
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
  }, {});

  return (
    <div className="relative w-full flex items-center justify-center min-h-[60vh] bg-white">
      <aside className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-5 z-40">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="group w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-black hover:text-white shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {social.icon}
          </a>
        ))}
      </aside>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="font-anton uppercase text-black leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-[90px]"
          >
            RECENT — WORKS FROM <br /> ©2023–2024
          </h1>
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="/resume"
              className="px-7 py-3 text-base md:text-lg uppercase tracking-widest rounded-full border border-black bg-black text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-md"
            >
              Click to Check Resume
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-7 py-3 text-base md:text-lg uppercase tracking-widest rounded-full border border-gray-300 font-bold hover:border-black transition-all duration-300 shadow-md"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
