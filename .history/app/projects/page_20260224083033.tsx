"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { IProject } from '@/types';

// Local project data for the Projects page (keeps page-specific data here)
const PROJECTS: IProject[] = [
  {
    title: 'MathPad AI',
    slug: 'mathpad-ai',
    techStack: ['React', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini API'],
    thumbnail: '/projects/Project1.png',
    longThumbnail: '/projects/Project1.png',
    images: ['/projects/Project1.png'],
    sourceCode: 'https://github.com/Tabishhaider72/Math-Pad-AI',
    liveUrl: 'https://math-pad-ai.vercel.app',
    year: 2026,
    description: `AI-powered math computation platform that solves expressions, manages variables, and visualizes equations with real-time analysis.

Tech & Architecture: Built with a TypeScript React frontend and a Python FastAPI backend. The frontend handles a composable UI for live expression entry and plotting; the backend runs isolated compute workers for symbolic and numeric computation (SymPy / NumPy), exposes a small compute queue API, and uses Google Gemini for higher-level reasoning and natural-language interpretation of math problems. Real-time updates are delivered via WebSockets for low-latency interaction, and computed results are cached for repeatable queries.

Features & Highlights: Real-time expression evaluation, persistent variable storage for reusable calculations, interactive equation graphing (client-side plotting using D3/Plotly), and AI-assisted problem interpretation via Gemini. The system is designed for production: modular API routes, worker-based compute isolation, and progressive enhancement on the frontend.
`,
    role: `Full-Stack Developer — led frontend and backend integration, implemented compute worker pattern, and integrated Google Gemini for AI computation.`,
  },

  {
    title: 'BookMyRoom',
    slug: 'bookmyroom',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Prisma', 'MongoDB', 'NextAuth', 'TypeScript'],
    thumbnail: '/projects/Project2.png',
    longThumbnail: '/projects/Project2.png',
    images: ['/projects/Project2.png'],
    sourceCode: 'https://github.com/Tabishhaider72/BookmyRoom',
    liveUrl: 'https://bookmy-room.vercel.app',
    year: 2025,
    description: `Full-stack hotel booking platform for browsing, booking, and managing accommodations with secure authentication and modern UI.

Tech & Architecture: Server-rendered pages and API routes are implemented with Next.js (ISR/SSR where appropriate) while Prisma provides a typed ORM layer backed by MongoDB. Authentication and session management use NextAuth to provide secure user flows. The backend exposes RESTful endpoints for booking lifecycle management and uses indexed queries in Prisma for performant availability lookups.

Features & Highlights: Browse hotels and rooms with server-side rendered listings for fast initial load and SEO, a booking management system with create/cancel flows, authenticated user dashboards, and optimized database modeling via Prisma. The UI uses Tailwind CSS for a responsive, accessible design.
`,
    role: `Full-Stack Developer — implemented end-to-end booking flows, authentication, and database models with Prisma.`,
  },

  {
    title: 'AI Doc Chat (LangChain)',
    slug: 'ai-doc-chat',
    techStack: ['LangChain', 'Python', 'FastAPI', 'Next.js', 'Vector Embeddings'],
    thumbnail: '/projects/Project3.png',
    longThumbnail: '/projects/Project3.png',
    images: ['/projects/Project3.png'],
    sourceCode: 'https://github.com/Tabishhaider72/AI_Doc_chat_Langchain',
    liveUrl: undefined,
    year: 2026,
    description: `RAG-based document chat system that converts PDFs into conversational AI knowledge using embeddings and semantic retrieval.

Tech & Architecture: Document ingestion and embedding generation run in a Python FastAPI service. Embeddings are stored in a vector store (e.g., FAISS or Pinecone) and queried by LangChain-driven retrieval chains. The frontend is built with Next.js and connects to the FastAPI streaming endpoints to provide token-by-token chat streaming to the user.

Features & Highlights: Secure PDF ingestion, chunking and embedding pipeline, semantic search with context-aware retrieval, session-based conversation history, and streaming responses for an interactive chat experience. The architecture separates embedding/ingestion, retrieval, and chat orchestration to allow horizontal scaling of individual components.
`,
    role: `Lead Engineer — designed the RAG pipeline, implemented embedding storage and retrieval, and enabled streaming conversational UI.`,
  },

  {
    title: 'CVRoast Frontend',
    slug: 'cvroast-frontend',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    thumbnail: '/projects/Project4.png',
    longThumbnail: '/projects/Project4.png',
    images: ['/projects/Project4.png'],
    sourceCode: 'https://github.com/Tabishhaider72/cvroast-frontend',
    liveUrl: undefined,
    year: 2025,
    description: `AI-powered ATS resume analysis dashboard for evaluating resumes with structured scoring and recruiter insights.

Tech & Architecture: Frontend-only dashboard built with Next.js and TypeScript that consumes an AI scoring API. The UI visualizes ATS-style scoring and recruiter-friendly insights using charts and structured cards. The app is componentized for reusability and supports file uploads that are sent to the analysis API.

Features & Highlights: Resume upload and parsing interface, ATS scoring visualization, AI-generated feedback snippets, and a modern SaaS-style dashboard layout optimized for recruiter workflows. Focused on accessibility and clear data visualization for decision-making.
`,
    role: `Frontend Engineer — built the dashboard UI, upload flows, and visualization components.`,
  },

  {
    title: 'AI Data Insighter',
    slug: 'ai-data-insighter',
    techStack: ['Node.js', 'TypeScript', 'AI Processing'],
    thumbnail: '/projects/Project5.png',
    longThumbnail: '/projects/Project5.png',
    images: ['/projects/Project5.png'],
    sourceCode: 'https://github.com/Tabishhaider72/Ai-Data-Insighter',
    liveUrl: undefined,
    year: 2026,
    description: `AI-based system for extracting structured insights and analytics from datasets.

Tech & Architecture: A TypeScript Node.js processing pipeline orchestrates data ingestion, cleaning, and AI-driven insight extraction. The system is designed as worker-based microservices so compute-heavy analysis can scale independently. Outputs are structured JSON insights suitable for visualization or downstream consumption.

Features & Highlights: Automated data analysis, structured insight generation, and a scalable processing pipeline with a focus on reliability and observability. Ideal for data teams that want quick, explainable summaries of large datasets.
`,
    role: `Backend Engineer — implemented the processing pipeline and insight extraction workflows.`,
  },
];

// Additional projects (MORE_PROJECTS) appended below
PROJECTS.push(
  {
    title: 'Kun Fayakoon NGO Platform',
    slug: 'kun-fayakoon-ngo',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    thumbnail: '/projects/Project6.png',
    longThumbnail: '/projects/Project6.png',
    images: ['/projects/Project6.png'],
    sourceCode: 'https://github.com/Tabishhaider72/kun-fayakoon-NGO',
    liveUrl: undefined,
    year: 2024,
    description: `Web platform for NGO operations and community initiatives with modern responsive UI and organization management features.

Tech & Architecture: Built as a modular Next.js application with server-side rendering for public pages and client-side admin dashboards. The platform uses a component-driven UI in React + Tailwind for rapid, accessible interfaces. Auth and role-based access controls are implemented at the API route layer (Next API routes) with typed contracts in TypeScript.

Features & Highlights: Organization and volunteer management, event creation and RSVP flows, responsive layouts for field workers, and a scalable data model for multi-tenant NGO operations. The architecture favors small API endpoints, clear separation of public vs admin routes, and progressive enhancement for low-bandwidth environments.
`,
    role: `Frontend Engineer — implemented responsive admin dashboards, modular UI components, and client-side flows for community management.`,
  },

  {
    title: 'Todo App (React Mobile)',
    slug: 'todo-react-mobile',
    techStack: ['React', 'JavaScript', 'CSS'],
    thumbnail: '/projects/Project7.png',
    longThumbnail: '/projects/Project7.png',
    images: ['/projects/Project7.png'],
    sourceCode: 'https://github.com/Tabishhaider72/todo-app-react-mobile',
    liveUrl: undefined,
    year: 2023,
    description: `Mobile-focused task management application built with React featuring real-time task tracking and responsive design.

Tech & Architecture: Single-page React app optimized for mobile-first UX. Uses local persistence (IndexedDB / localStorage) and an optional sync API for real-time updates. Lightweight state management keeps UI snappy on low-end devices.

Features & Highlights: Task creation, edit and deletion with fast gestures, mobile-first interactions and accessibility optimizations, and conflict-free syncing for simple collaboration. Emphasis on battery- and data-efficiency for everyday use.
`,
    role: `Frontend Developer — designed mobile-first interactions and implemented local persistence + optional sync logic.`,
  },

  {
    title: 'MedBlocks',
    slug: 'medblocks',
    techStack: ['React', 'Node.js', 'JavaScript'],
    thumbnail: '/projects/Project8.png',
    longThumbnail: '/projects/Project8.png',
    images: ['/projects/Project8.png'],
    sourceCode: 'https://github.com/Tabishhaider72/Medblocks',
    liveUrl: undefined,
    year: 2024,
    description: `Healthcare-oriented platform designed for secure data handling and medical information management.

Tech & Architecture: Full-stack app with a React frontend and a Node.js backend. Security-first design includes encrypted transport, scoped API tokens, and careful handling of PHI-like data. The backend follows RESTful patterns with input validation and audit logging.

Features & Highlights: Patient record viewing, secure data handling patterns, role-based access controls for clinicians and staff, and an extensible data model for clinical workflows. Designed for auditability and compliance-ready structure.
`,
    role: `Backend & Frontend Contributor — implemented secure API endpoints and responsive UI modules focused on data safety.`,
  },

  {
    title: 'Reeltor Assessment',
    slug: 'reeltor-assessment',
    techStack: ['React', 'JavaScript', 'CSS'],
    thumbnail: '/projects/Project9.png',
    longThumbnail: '/projects/Project9.png',
    images: ['/projects/Project9.png'],
    sourceCode: 'https://github.com/Tabishhaider72/Reeltor_Assessment',
    liveUrl: undefined,
    year: 2023,
    description: `Frontend technical assessment project demonstrating UI development and responsive layout implementation.

Tech & Architecture: Focused single-page React app implementing component-based layout, responsive CSS patterns, and accessible interactions. Emphasis on animation-light, performant layout strategies for a smooth user experience.

Features & Highlights: Reusable UI components, fluid responsive grids, and crisp micro-interactions to showcase frontend craftsmanship and layout problem solving. Good candidate for reuse as a design system seed.
`,
    role: `Frontend Engineer — implemented pixel-accurate UI and responsive behaviors for the assessment.`,
  },

  {
    title: 'Real-Time Chat Application',
    slug: 'real-time-chat',
    techStack: ['Node.js', 'Socket.io', 'Express', 'JavaScript'],
    thumbnail: '/projects/Project10.png',
    longThumbnail: '/projects/Project10.png',
    images: ['/projects/Project10.png'],
    sourceCode: 'https://github.com/Tabishhaider72/Real-Time-Chat',
    liveUrl: undefined,
    year: 2024,
    description: `Real-time messaging application enabling instant communication with live updates and event-based architecture.

Tech & Architecture: Built with an Express.js server and Socket.io for bidirectional event streaming. The server handles presence, rooms, message persistence (optional DB), and scalable event routing. Client uses lightweight React UI to consume socket events and render message streams.

Features & Highlights: Instant messaging, typing indicators, presence/online status, room-based architecture for conversations, and robust reconnection strategies. Designed for low-latency conversation and horizontal scaling behind a message broker if required.
`,
    role: `Full-Stack Developer — implemented socket-based communication, reconnection logic, and message persistence patterns.`,
  },

  {
    title: 'Food App (Android)',
    slug: 'food-app-android',
    techStack: ['Android', 'Java', 'XML'],
    thumbnail: '/projects/Project11.png',
    longThumbnail: '/projects/Project11.png',
    images: ['/projects/Project11.png'],
    sourceCode: 'https://github.com/Tabishhaider72/Food-App-Android',
    liveUrl: undefined,
    year: 2022,
    description: `Android mobile application for browsing food items and managing orders with a clean user interface.

Tech & Architecture: Native Android app written in Java using XML layouts. Follows MVVM-like separation for UI and data layers. Networking is handled with Retrofit (or a lightweight HTTP client) and local caching with a persistence layer for offline browsing.

Features & Highlights: Browsing menu items, order creation and tracking, and an efficient native UX tailored for mobile ordering flows. Emphasis on smooth scrolling, image optimization, and quick ordering paths.
`,
    role: `Mobile Developer — built native screens, networking, and local caching for a performant ordering experience.`,
  },

  {
    title: 'AI Articles Summarizer',
    slug: 'ai-articles-summarizer',
    techStack: ['React', 'TypeScript', 'AI API'],
    thumbnail: '/projects/Project12.png',
    longThumbnail: '/projects/Project12.png',
    images: ['/projects/Project12.png'],
    sourceCode: 'https://github.com/Tabishhaider72/AI_articles_Summarizer',
    liveUrl: undefined,
    year: 2025,
    description: `AI-based article summarization tool that generates concise summaries from long-form content using natural language processing.

Tech & Architecture: React + TypeScript frontend that sends content to an AI summarization API (model-agnostic adapter) with robust batching and error handling. The system supports streamed outputs for near real-time feedback and provides adjustable summary lengths.

Features & Highlights: Article ingestion (URL or pasted text), adjustable summary lengths, extractive + abstractive hybrid techniques, and export options. Designed for researchers and content consumers to quickly digest long-form content.
`,
    role: `Full-Stack/Frontend Developer — implemented ingestion UI, streaming summarization flows, and client-side controls for summary tuning.`,
  }
);
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ProjectsPage = () => {
  const [loaded, setLoaded] = useState(false);

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

        {/* ===== PROJECT GRID ===== */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-1000 delay-500 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={project.slug}
              className="transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${600 + idx * 120}ms`,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0px)" : "translateY(40px)",
              }}
            >
              <ProjectCard project={project} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;