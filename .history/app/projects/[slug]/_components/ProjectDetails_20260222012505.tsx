"use client";

import parse from "html-react-parser";
import ArrowAnimation from "@/components/ArrowAnimation";
import TransitionLink from "@/components/TransitionLink";
import { IProject } from "@/types";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  project: IProject;
}

const ProjectDetails = ({ project }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);

  // ===== stagger fade-in on mount =====
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ===== scroll effects (blur info + parallax images) =====
  useEffect(() => {
    const handleScroll = () => {
      // ---- blur + scale info section ----
      if (infoRef.current && window.innerWidth >= 992) {
        const rect = infoRef.current.getBoundingClientRect();
        const progress = Math.min(
          Math.max((window.innerHeight - rect.bottom) / window.innerHeight, 0),
          1
        );

        infoRef.current.style.filter = `blur(${progress * 3}px)`;
        infoRef.current.style.opacity = `${1 - progress}`;
        infoRef.current.style.transform = `scale(${1 - progress * 0.1})`;
      }

      // ---- parallax images ----
      if (imagesRef.current) {
        const imageDivs = imagesRef.current.querySelectorAll("div[data-parallax]");

        imageDivs.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const offset = rect.top * -0.15; // parallax strength
          (el as HTMLElement).style.backgroundPosition = `center ${offset}px`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-5 pb-14">
      <div className="container" ref={containerRef}>
        {/* BACK LINK */}
        <TransitionLink
          back
          href="/"
          className="mb-16 inline-flex gap-2 items-center group h-12"
        >
          <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
          Back
        </TransitionLink>

        {/* ===== INFO SECTION ===== */}
        <div
          ref={infoRef}
          className="top-0 min-h-[calc(100svh-100px)] flex transition-all duration-300"
        >
          <div className="relative w-full">
            {/* TITLE + LINKS */}
            <div className="flex items-start gap-6 mx-auto mb-10 max-w-[635px]">
              <h1
                className={`text-4xl md:text-[60px] leading-none font-anton transition-all duration-700 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {project.title}
              </h1>

              <div
                className={`flex gap-2 transition-all duration-700 delay-200 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {project.sourceCode && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <Github size={30} />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <ExternalLink size={30} />
                  </a>
                )}
              </div>
            </div>

            {/* PROJECT DETAILS */}
            <div className="max-w-[635px] space-y-7 pb-20 mx-auto">
              <FadeBlock loaded={loaded} delay={300}>
                <p className="text-muted-foreground font-anton mb-3">Year</p>
                <div className="text-lg">{project.year}</div>
              </FadeBlock>

              <FadeBlock loaded={loaded} delay={400}>
                <p className="text-muted-foreground font-anton mb-3">
                  Tech & Technique
                </p>
                <div className="text-lg">{project.techStack.join(", ")}</div>
              </FadeBlock>

              <FadeBlock loaded={loaded} delay={500}>
                <p className="text-muted-foreground font-anton mb-3">
                  Description
                </p>
                <div className="text-lg prose-xl markdown-text">
                  {parse(project.description)}
                </div>
              </FadeBlock>

              {project.role && (
                <FadeBlock loaded={loaded} delay={600}>
                  <p className="text-muted-foreground font-anton mb-3">
                    My Role
                  </p>
                  <div className="text-lg">{parse(project.role)}</div>
                </FadeBlock>
              )}
            </div>

            <ArrowAnimation />
          </div>
        </div>

        {/* ===== IMAGES ===== */}
        <div
          ref={imagesRef}
          className={`relative flex flex-col gap-2 max-w-[800px] mx-auto transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {project.images.map((image, i) => (
            <div
              key={image}
              data-parallax
              className="group relative w-full aspect-[750/400] bg-background-light transition-all duration-700"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center 50%",
                backgroundRepeat: "no-repeat",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <a
                href={image}
                target="_blank"
                className="absolute top-4 right-4 bg-background/70 text-foreground size-12 inline-flex justify-center items-center transition-all opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
              >
                <ExternalLink />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* reusable fade animation block */
const FadeBlock = ({
  children,
  loaded,
  delay,
}: {
  children: React.ReactNode;
  loaded: boolean;
  delay: number;
}) => (
  <div
    className="transition-all duration-700"
    style={{
      transitionDelay: `${delay}ms`,
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0px)" : "translateY(30px)",
    }}
  >
    {children}
  </div>
);

export default ProjectDetails;