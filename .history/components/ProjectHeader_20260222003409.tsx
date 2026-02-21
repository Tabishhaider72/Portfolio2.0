import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VerticalSocialSidebar from "@/components/VerticalSocialSidebar";

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
      <VerticalSocialSidebar />
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
