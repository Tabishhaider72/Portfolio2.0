import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ProjectHeader: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  // trigger animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-white overflow-hidden">
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white pointer-events-none" />

      {/* RIGHT SIDE SOCIAL ICONS */}
      <div
        className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20 transition-all duration-700 ease-out ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        <a
          href="https://github.com/YOUR_GITHUB"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-200 bg-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
        >
          <FaGithub className="text-xl text-black" />
        </a>

        <a
          href="https://linkedin.com/in/YOUR_LINKEDIN"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-200 bg-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
        >
          <FaLinkedin className="text-xl text-black" />
        </a>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl text-left">
            {/* HERO CONTENT */}
            <div
              className={`transition-all duration-1000 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-500 mb-6 font-medium">
                Selected Projects • Portfolio
              </p>

              <h1 className="font-anton text-black leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-[96px]">
                Building Modern
                <br />
                <span className="bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent">
                  Software Experiences
                </span>
              </h1>

              <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Carefully engineered full-stack applications focused on
                performance, scalability, and real-world impact. Explore
                production-ready systems, AI integrations, and modern SaaS
                architectures.
              </p>
            </div>

            {/* CTA SECTION */}
            <div
              className={`mt-12 flex flex-col sm:flex-row items-start gap-5 transition-all duration-700 delay-300 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="/resume"
                className="px-8 py-4 text-sm md:text-base uppercase tracking-widest rounded-full border border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
              >
                View Resume
              </a>

              <a
                href="/resume.pdf"
                download
                className="px-8 py-4 text-sm md:text-base uppercase tracking-widest rounded-full border border-gray-300 font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300 shadow-md"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;