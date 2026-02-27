import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'sayedtabish72@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Tabish Haider, I am reaching out to you because...',

    oldPortfolio: 'https://sayed-tabish-haider.vercel.app/about',
    linkedinProfile: 'https://www.linkedin.com/in/sayed-tabish-haider',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/Tabishhaider72' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/sayed-tabish' },
    { name: 'facebook', url: 'https://www.facebook.com/tajmirul.2000' },
    { name: 'Old Version', url: GENERAL_INFO.oldPortfolio },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Framer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'Sass',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'NestJS',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
  {
    title: 'Math Note',
    slug: 'math-note',
    techStack: [
      'React.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'Tailwind CSS',
      'Google Gemini'
    ],
    thumbnail: '/projects/thumbnail/math-note.jpg',
    longThumbnail: '/projects/long/math-note.jpg',
    images: [
      '/projects/images/math-note-1.png',
      '/projects/images/math-note-2.png',
      '/projects/images/math-note-3.png',
    ],
    sourceCode: 'https://github.com/yourusername/math-note',
    liveUrl: 'https://math-note-demo.vercel.app/',
    year: 2025,
    description: `
      Math Note is an AI-powered note-taking assistant that combines real-time expression evaluation, variable tracking, and graph plotting within a seamless and interactive interface. <br/><br/>
      
      Key Features:<br/>
      <ul>
        <li>🧮 Real-time Math Evaluation: Instantly computes and updates expressions as you type</li>
        <li>🧠 AI Integration: Integrated Google Gemini for intelligent math analysis and problem interpretation</li>
        <li>📈 Graph Plotting: Dynamic visualization of mathematical expressions</li>
        <li>⚡ FastAPI Backend: Modular and efficient architecture leveraging lifespan events and context managers</li>
        <li>💡 TypeScript Frontend: Ensures type safety and better developer experience</li>
      </ul><br/>

      Technical Highlights:<br/>
      <ul>
        <li>Developed end-to-end communication between React frontend and FastAPI backend</li>
        <li>Implemented modular API routes for scalable computation handling</li>
        <li>Optimized rendering logic for real-time input response and data visualization</li>
      </ul>
    `,
    role: `
      Full-Stack Developer <br/>
      Owned full development lifecycle:<br/>
      <ul>
        <li>✅ Built complete frontend in React.js + TypeScript with Tailwind CSS</li>
        <li>⚙️ Engineered FastAPI backend with modular route management</li>
        <li>🧩 Integrated Google Gemini API for intelligent math insights</li>
        <li>🧮 Implemented live computation and graph plotting logic</li>
        <li>🚀 Deployed optimized build ensuring seamless performance across devices</li>
      </ul>
    `,
  },
  {
    title: 'BookMyRoom',
    slug: 'bookmyroom',
    techStack: [
      'Next.js',
      'Node.js',
      'Prisma ORM',
      'MongoDB',
      'MUI'
    ],
    thumbnail: '/projects/thumbnail/bookmyroom.jpg',
    longThumbnail: '/projects/long/bookmyroom.jpg',
    images: [
      '/projects/images/bookmyroom-1.png',
      '/projects/images/bookmyroom-2.png',
      '/projects/images/bookmyroom-3.png',
    ],
    sourceCode: 'https://github.com/yourusername/bookmyroom',
    liveUrl: 'https://bookmyroom-demo.vercel.app/',
    year: 2025,
    description: `
      BookMyRoom is a full-stack hotel booking platform designed to provide a smooth and efficient booking experience through real-time data synchronization and SSR-enabled listings. <br/><br/>
      
      Key Features:<br/>
      <ul>
        <li>🏨 Secure Authentication: Session-based login and signup system</li>
        <li>📅 Booking Management: Create, cancel, and track bookings seamlessly</li>
        <li>📦 SSR Listings: Enhanced SEO and fast load times with server-side rendering</li>
        <li>💾 Database Layer: Prisma ORM with MongoDB for efficient data handling</li>
        <li>📱 Fully Responsive: Optimized layout built with Material UI</li>
      </ul><br/>

      Technical Highlights:<br/>
      <ul>
        <li>Built modular APIs for bookings, cancellations, and user sessions</li>
        <li>Implemented Prisma models and optimized database queries for scalability</li>
        <li>Handled real-time data fetching with SSR for dynamic page rendering</li>
      </ul>
    `,
    role: `
      Full-Stack Developer <br/>
      End-to-end architecture and implementation:<br/>
      <ul>
        <li>✅ Developed full-stack app using Next.js, Prisma ORM, and MongoDB</li>
        <li>🔐 Implemented secure authentication and session management</li>
        <li>⚙️ Designed modular backend APIs for user and booking workflows</li>
        <li>🚀 Optimized server-side rendering for performance and SEO</li>
        <li>🎨 Built responsive UI components using Material UI</li>
      </ul>
    `,
  },
  {
    title: 'My-Summarizer.AI',
    slug: 'my-summarizer-ai',
    techStack: [
      'React.js',
      'Rapid API',
      'OpenAI GPT-4.0'
    ],
    thumbnail: '/projects/thumbnail/my-summarizer-ai.jpg',
    longThumbnail: '/projects/long/my-summarizer-ai.jpg',
    images: [
      '/projects/images/my-summarizer-ai-1.png',
      '/projects/images/my-summarizer-ai-2.png',
      '/projects/images/my-summarizer-ai-3.png',
    ],
    sourceCode: 'https://github.com/yourusername/my-summarizer-ai',
    liveUrl: 'https://my-summarizer-ai.vercel.app/',
    year: 2025,
    description: `
      My-Summarizer.AI is a smart content summarization tool that generates concise and context-aware summaries for web articles, PDFs, and emails, ensuring secure and efficient text processing. <br/><br/>
      
      Key Features:<br/>
      <ul>
        <li>🧠 AI Summarization: Integrated GPT-4.0 via Rapid API for accurate, human-like summaries</li>
        <li>📂 File Handling: Secure upload and parsing for PDFs and text files</li>
        <li>⚡ Real-Time Analysis: Instant feedback on uploaded content</li>
        <li>📱 Responsive Design: Works seamlessly across all devices</li>
      </ul><br/>

      Technical Highlights:<br/>
      <ul>
        <li>Integrated GPT-4 API through Rapid API with robust error handling</li>
        <li>Built dynamic frontend using React.js for responsive, real-time content interaction</li>
        <li>Implemented optimized rendering and state management for smooth UX</li>
      </ul>
    `,
    role: `
      Full-Stack Developer <br/>
      Independently designed and built:<br/>
      <ul>
        <li>✅ Developed React.js frontend with responsive and minimal design</li>
        <li>⚙️ Integrated OpenAI GPT-4 via Rapid API for summarization logic</li>
        <li>🧩 Managed secure data flow between client and server</li>
        <li>🚀 Optimized performance for cross-browser scalability</li>
      </ul>
    `,
  },

    {
        title: 'Real Estate',
        slug: 'property-pro',
        techStack: [
            'React.js',
            'Redux',
            'Tailwind CSS',
            'React i18n',
            'Framer Motion',
        ],
        thumbnail: '/projects/thumbnail/property-pro.jpg',
        longThumbnail: '/projects/long/property-pro.jpg',
        images: [
            '/projects/images/property-pro-1.png',
            '/projects/images/property-pro-2.png',
            '/projects/images/property-pro-3.png',
        ],
        liveUrl: 'https://demo.propertypro.siphertech.com/',
        year: 2023,
        description:
            'PropertyPro is a real estate management platform offering users a seamless experience to explore, manage, and view property listings. The application emphasizes accessibility and responsive design, ensuring a smooth interface across devices.',
        role: `As the frontend developer, I:<br/>
        - Built the frontend using React, Redux, RTK Query, Framer Motion, and Tailwind CSS.<br/>
        - Integrated dynamic state management for efficient handling of property data.<br/>
        - Implemented multi-language support with React i18n to cater to diverse audiences.<br/>
        - Enhanced user interaction with animations and transitions using Framer Motion.`,
    },
    // Added projects synced from Projects page

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

    // MORE_PROJECTS entries
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
    },
    {
        title: 'Consulting Finance',
        slug: 'crenotive',
        techStack: ['HTML', 'CSS & SCSS', 'Javascript', 'Bootstrap'],
        thumbnail: '/projects/thumbnail/consulting-finance.jpg',
        longThumbnail: '/projects/long/consulting-finance.jpg',
        images: [
            '/projects/images/consulting-finance-1.png',
            '/projects/images/consulting-finance-2.png',
            '/projects/images/consulting-finance-3.png',
        ],
        sourceCode: 'https://github.com/Tajmirul/crenotive',
        liveUrl: 'https://crenotive.netlify.app/',
        year: 2023,
        description:
            'I developed Crenotive, a portfolio website using Html, SASS, and jQuery to showcase services and expertise. The design focuses on responsive user experience and effective presentation of professional achievements.',
        role: ``,
    },
    {
        title: 'devLinks',
        slug: 'devLinks',
        techStack: ['Next.js', 'Formik', 'Drag & Drop', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/devLinks.jpg',
        longThumbnail: '/projects/long/devLinks.jpg',
        images: [
            '/projects/images/devLinks-1.png',
            '/projects/images/devLinks-2.png',
            '/projects/images/devLinks-3.png',
        ],
        sourceCode: 'https://github.com/Tajmirul/devsLink',
        liveUrl: 'https://devlinks-demo.vercel.app/auth/signin',
        year: 2023,
        description: `One of the most challenging projects in fullstack development.<br/><br/>

            I developed a Bookmyroom App as part of the Frontend Mentor challenge, utilizing React, Redux, and Tailwind CSS to create a responsive and feature-rich platform. The app allows users to share, save, and explore links, with a focus on intuitive design and smooth navigation. Advanced state management ensures efficient data handling for user interactions.`,
        role: ``,
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Frontend Developer (Next.js, NestJS)',
        company: 'Skilzen -Hiring Bird',
        duration: 'Aug 2024 – Jan 2025',
    },
    {
        title: 'Frontend Developer',
        company: 'Epikcoders',
        duration: 'Oct 2023 - Nov 2024',
    },
    {
        title: 'Frontend Web Developer',
        company: 'I2 technologies',
        duration: 'Sep 2023 – Feb 2024',
    },
    {
        title: 'Founding Member College project',
        company: 'Intern List',
        duration: 'Jul 2022 – Mar 2023',
    },
    {
        title: 'Campus Ambassador',
        company: 'CS Mock',
        duration: 'Jun 2022 – Jun 2022',
    },
    {
        title: 'Open Source Contributor',
        company: 'GirlScript Summer of Code',
        duration: 'JFeb 2022 – Jun 2022',
    },
    {
        title: 'ACM, Association for Computing Machinery',
        company: 'Technical Project Lead',
        duration: 'Dec 2018 – Jan 2021',
    },
];
