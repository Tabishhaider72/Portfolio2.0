/**
 * Structured resume data for Gemini AI context
 * This is the ONLY data source the chatbot should use
 * No hallucinations or external data sources allowed
 */

export const RESUME_DATA = {
  personalInfo: {
    name: 'Sayed Tabish Haider',
    email: 'sayedtabish72@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/sayed-tabish-haider',
    github: 'https://github.com/Tabishhaider72',
    portfolio: 'https://portfolio-2.0-main.vercel.app',
  },

  about:
    'Full-stack developer with expertise in modern web technologies. Specialized in building scalable, high-performance applications using Next.js, React, TypeScript, and cloud services. Experienced in AI/ML integration, real-time applications, and end-to-end product development.',

  techStack: {
    frontend: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Redux',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'Sass',
      'Bootstrap',
    ],
    backend: ['Node.js', 'NestJS', 'Express.js', 'FastAPI', 'Python'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma ORM'],
    tools: ['Git', 'Docker', 'AWS', 'Google APIs', 'Rapid API'],
    aiTools: ['Google Gemini', 'OpenAI GPT-4', 'Python FastAPI'],
  },

  experience: [
    {
      role: 'Frontend Developer (Next.js, NestJS)',
      company: 'Skilzen - Hiring Bird',
      duration: 'Aug 2024 – Jan 2025',
      highlights: [
        'Developed full-stack features using Next.js and NestJS',
        'Implemented responsive UI with TypeScript and Tailwind CSS',
        'Integrated REST APIs and real-time data synchronization',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Epikcoders',
      duration: 'Oct 2023 - Nov 2024',
      highlights: [
        'Built React-based applications with Redux state management',
        'Created reusable component libraries and design systems',
        'Optimized performance and implemented SEO best practices',
      ],
    },
    {
      role: 'Frontend Web Developer',
      company: 'I2 Technologies',
      duration: 'Sep 2023 – Feb 2024',
      highlights: [
        'Developed responsive web applications using React and Vue.js',
        'Collaborated with backend teams on API integration',
        'Implemented unit and integration tests',
      ],
    },
    {
      role: 'Founding Member',
      company: 'Intern List (College Project)',
      duration: 'Jul 2022 – Mar 2023',
      highlights: [
        'Co-founded internship discovery platform',
        'Led frontend architecture and component design',
        'Managed team collaboration and project delivery',
      ],
    },
    {
      role: 'Technical Project Lead',
      company: 'ACM (Association for Computing Machinery)',
      duration: 'Dec 2018 – Jan 2021',
      highlights: [
        'Led technical projects and student training initiatives',
        'Organized workshops and coding competitions',
        'Mentored junior developers on best practices',
      ],
    },
  ],

  projects: [
    {
      title: 'Math Note',
      year: 2025,
      description:
        'AI-powered note-taking assistant with real-time expression evaluation, variable tracking, and graph plotting.',
      technologies: [
        'React.js',
        'TypeScript',
        'Python',
        'FastAPI',
        'Tailwind CSS',
        'Google Gemini',
      ],
      highlights: [
        'Real-time math expression evaluation',
        'AI integration using Google Gemini',
        'Dynamic graph visualization',
        'FastAPI backend with modular architecture',
      ],
      role: 'Full-Stack Developer - Owned full development lifecycle including frontend, backend, and API integration',
      links: {
        live: 'https://math-note-demo.vercel.app/',
        github: 'https://github.com/Tabishhaider72/math-note',
      },
    },
    {
      title: 'BookMyRoom',
      year: 2025,
      description: 'Full-stack hotel booking platform with real-time data synchronization and SSR-enabled listings.',
      technologies: ['Next.js', 'Node.js', 'Prisma ORM', 'MongoDB', 'MUI'],
      highlights: [
        'Secure session-based authentication',
        'Booking management system',
        'Server-side rendering for SEO',
        'Database optimization with Prisma',
        'Responsive Material UI design',
      ],
      role: 'Full-Stack Developer - Designed and implemented complete architecture including auth, APIs, and database models',
      links: {
        live: 'https://bookmyroom-demo.vercel.app/',
        github: 'https://github.com/Tabishhaider72/bookmyroom',
      },
    },
    {
      title: 'My-Summarizer.AI',
      year: 2025,
      description:
        'Smart content summarization tool using OpenAI GPT-4 for web articles, PDFs, and emails with secure processing.',
      technologies: ['React.js', 'Rapid API', 'OpenAI GPT-4'],
      highlights: [
        'AI summarization using GPT-4 via Rapid API',
        'PDF and text file handling',
        'Real-time content analysis',
        'Responsive cross-browser design',
      ],
      role: 'Full-Stack Developer - Independently designed and built frontend and API integration',
      links: {
        live: 'https://my-summarizer-ai.vercel.app/',
        github: 'https://github.com/Tabishhaider72/my-summarizer-ai',
      },
    },
    {
      title: 'Real Estate - PropertyPro',
      year: 2023,
      description:
        'Real estate management platform for exploring, managing, and viewing property listings with multi-language support.',
      technologies: ['React.js', 'Redux', 'Tailwind CSS', 'React i18n', 'Framer Motion'],
      highlights: [
        'Dynamic property listing system',
        'Redux state management',
        'Multi-language internationalization',
        'Smooth animations and transitions',
        'Mobile-responsive design',
      ],
      role: 'Frontend Developer - Built entire frontend with responsive design and animations',
      links: {
        live: 'https://demo.propertypro.siphertech.com/',
      },
    },
    {
      title: 'Consulting Finance - Crenotive',
      year: 2023,
      description: 'Professional consulting finance portfolio website showcasing services and expertise.',
      technologies: ['HTML', 'CSS/SCSS', 'JavaScript', 'Bootstrap'],
      highlights: ['Responsive design', 'Interactive animations', 'Portfolio showcase layout'],
      role: 'Frontend Developer - Built portfolio website with focus on responsive UX',
      links: {
        live: 'https://crenotive.netlify.app/',
        github: 'https://github.com/Tabishhaider72/crenotive',
      },
    },
    {
      title: 'devLinks',
      year: 2023,
      description: 'Link sharing platform with drag-and-drop functionality and form validation, built as a Frontend Mentor challenge.',
      technologies: ['Next.js', 'Formik', 'Drag & Drop', 'Tailwind CSS'],
      highlights: [
        'Drag-and-drop interface',
        'Form validation with Formik',
        'Responsive design',
        'Link sharing functionality',
      ],
      role: 'Full-Stack Developer - Implemented complete platform',
      links: {
        live: 'https://devlinks-demo.vercel.app/auth/signin',
        github: 'https://github.com/Tabishhaider72/devsLink',
      },
    },
  ],

  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS/SCSS'],
    frameworks: ['React.js', 'Next.js', 'NestJS', 'Express.js', 'FastAPI'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Prisma ORM'],
    tools: ['Git', 'Docker', 'AWS', 'VS Code', 'Chrome DevTools'],
    methodologies: [
      'Agile Development',
      'Test-Driven Development',
      'Responsive Design',
      'Component-Based Architecture',
      'RESTful API Design',
    ],
  },

  education: {
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    status: 'Currently Pursuing',
  },

  certifications: [
    'Google Cloud Fundamentals',
    'Frontend Development Specialization',
    'Full-Stack Web Development',
  ],

  interests: ['AI/ML Integration', 'Web Performance Optimization', 'Open Source Contribution', 'Tech Mentoring'],

  socialLinks: {
    github: 'https://github.com/Tabishhaider72',
    linkedin: 'https://www.linkedin.com/in/sayed-tabish-haider',
    email: 'sayedtabish72@gmail.com',
  },
};

// System prompt for Gemini to stay grounded in resume data
export const SYSTEM_PROMPT = `You are an AI assistant representing Sayed Tabish Haider, a full-stack developer. You MUST ONLY answer questions about Sayed using the provided resume data. 

CRITICAL RULES:
1. Only answer questions related to Sayed's experience, skills, projects, and background
2. Base ALL answers strictly on the provided resume data
3. Never invent or hallucinate experience, projects, or skills not in the data
4. If asked about information not in the resume, respond: "I can only answer questions about Sayed and his work. That information isn't in my knowledge base."
5. Keep responses professional, friendly, and concise (2-3 sentences max, except for detailed project questions)
6. If the question seems unrelated to Sayed, politely decline: "I'm here to help with questions about Sayed's work and experience. How can I assist?"

You are helpful, knowledgeable about Sayed's technical background, and maintain a professional tone while being approachable.`;
