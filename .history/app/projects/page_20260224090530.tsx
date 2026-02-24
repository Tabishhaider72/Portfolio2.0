"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from '@/lib/data';
import { FaGithub, FaLinkedin, FaSearch, FaTimes, FaRedo } from "react-icons/fa";

const ProjectsPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  // debounce the search input for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // filter projects by title, techStack, or category
  const filteredProjects = useMemo(() => {
    if (!normalizedQuery && !categoryFilter) return PROJECTS;
    return PROJECTS.filter((project) => {
      const title = (project.title || '').toLowerCase();
      const tech = (project.techStack || []).join(' ').toLowerCase();
      const category = ((project as any).category || '').toLowerCase();

      const matchesQuery =
        normalizedQuery === '' ||
        title.includes(normalizedQuery) ||
        tech.includes(normalizedQuery) ||
        category.includes(normalizedQuery);

      const matchesCategory =
        !categoryFilter || category === categoryFilter.toLowerCase();

      return matchesQuery && matchesCategory;
    });
  }, [normalizedQuery, categoryFilter]);

  // compute categories with counts for dropdown labels
  const categoriesWithCount = useMemo(() => {
    const map = new Map<string, number>();
    PROJECTS.forEach((p) => {
      const c = ((p as any).category || '').toString();
      if (!c) return;
      map.set(c, (map.get(c) || 0) + 1);
    });
    return Array.from(map.entries());
  }, []);

  // trigger animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-32 pb-24">
      {/* subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white pointer-events-none" />

      {/* ===== RIGHT SIDE SOCIAL ICONS ===== */}
      <div
        className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20 transition-all duration-700 ${
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

      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* ===== HERO HEADER (CENTERED VIEWPORT, LEFT TEXT) ===== */}
        <div className="flex justify-center mb-24">
          <div className="w-full max-w-4xl text-left">
            {/* heading animation */}
            <div
              className={`transition-all duration-1000 ease-out ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
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

            {/* ===== CTA Buttons ===== */}
            <div
              className={`mt-12 flex flex-col sm:flex-row items-start gap-5 transition-all duration-700 delay-300 ease-out ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="https://drive.google.com/file/d/1IiJSh5-UbwYnj27bLWjpnNTmF3et6luS/view"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm md:text-base uppercase tracking-widest rounded-full border border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
              >
                View Resume
              </a>

              <a
                href="https://drive.google.com/uc?export=download&id=1IiJSh5-UbwYnj27bLWjpnNTmF3et6luS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm md:text-base uppercase tracking-widest rounded-full border border-gray-300 font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300 shadow-md"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* ===== SEARCH + FILTER (modern UI) ===== */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative w-full sm:w-2/3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
              <input
                aria-label="Search projects"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder="Search projects, tech, or category..."
                className="w-full pl-10 pr-12 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
              />
              {query ? (
                <button
                  aria-label="Clear search"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full text-gray-500 hover:text-black"
                >
                  <FaTimes />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-1/3">
              <div className="flex-1">
                <div className="overflow-x-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCategoryFilter('')}
                      className={`px-3 py-2 rounded-full text-sm font-medium border ${
                        categoryFilter === '' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {categoriesWithCount.map(([c, count]) => (
                      <button
                        key={c}
                        onClick={() => setCategoryFilter(c)}
                        className={`px-3 py-2 rounded-full text-sm font-medium border ${
                          categoryFilter === c ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        {c} <span className="text-gray-400 ml-2">{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setCategoryFilter('');
                  setQuery('');
                }}
                className="px-3 py-2 rounded-full border border-gray-200 bg-white text-sm hover:bg-gray-50"
                aria-label="Reset filters"
              >
                <FaRedo />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium text-black">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
            </div>
            <div className="text-sm text-gray-500">Tip: try searching &quot;AI&quot; or "Next.js&quot;</div>
          </div>
        </div>

        {/* ===== PROJECT GRID ===== */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-1000 delay-500 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              No projects match your search. Try different keywords or clear filters.
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
            <div
              key={project.slug}
              className="transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${600 + idx * 120}ms`,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0px)" : "translateY(40px)",
              }}
            >
                <ProjectCard project={project} index={idx} searchQuery={normalizedQuery} />
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;