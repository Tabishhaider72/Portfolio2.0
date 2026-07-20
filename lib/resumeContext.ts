/**
 * Structured resume data for Gemini AI context
 * This is the ONLY data source the chatbot should use
 * No hallucinations or external data sources allowed
 */

export const RESUME_DATA = {
  personal: {
    name: 'Syed Tabish Haider',
    role: 'Full-Stack Software Engineer',
    location: 'Delhi NCR (Ghaziabad, Uttar Pradesh, India)',
    openToRelocate: true,
    email: 'sayedtabish72@gmail.com',
    phone: '+91 8920637836',
    portfolio: 'https://syed-tabish.vercel.app',
    github: 'https://github.com/Tabishhaider72',
    linkedin: 'https://www.linkedin.com/in/sayed-tabish',
  },

  summary:
    'Tabish Haider is a Full-Stack Software Engineer who enjoys building software products from scratch and taking ownership across the complete development lifecycle. His primary expertise includes JavaScript, TypeScript, React, Next.js, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, and modern cloud-based development. He has experience building AI-powered applications, SaaS platforms, healthcare systems, and scalable web applications. He enjoys solving engineering problems involving backend architecture, API design, authentication, authorization, cloud storage, database design, performance optimization, and scalable system architecture. He has professional experience at Hooc AI Technologies, Skilzen Hiring-Bird, and I2 Technology. Outside of professional work, he actively builds full-stack products to learn modern software architecture, AI integration, and production engineering practices. His engineering philosophy emphasizes understanding business problems first, writing clean and maintainable code, designing scalable architectures, and delivering reliable software that provides real user value.',

  experience: [
    {
      company: 'Hooc AI Technologies',
      role: 'Software Consultant',
      employmentType: 'Full-Time',
      duration: 'December 2025 – July 2026',
      location: 'On-Site, Noida Sector 63',
      overview:
        'Worked as a Full-Stack Software Engineer contributing to the MedSagar healthcare platform, building production-ready software across both backend and frontend systems while collaborating with a cross-functional engineering team.',
      techStack: [
        'Next.js 14',
        'React',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Redis',
        'JWT',
        'AWS S3',
        'AWS SDK v3',
        'REST APIs',
      ],
      responsibilities: [
        'Developing production-ready healthcare software.',
        'Designing and implementing backend APIs.',
        'Building secure authentication systems and implementing RBAC.',
        'Working with MongoDB for data persistence.',
        'Building secure document upload systems.',
        'Integrating frontend applications with backend APIs.',
        'Troubleshooting and resolving production issues.',
        'Reviewing API contracts and delivering production deployments.',
      ],
      achievements: [
        'Built secure JWT authentication and refresh-token workflows.',
        'Implemented Role-Based Access Control supporting multiple user roles.',
        'Designed AWS S3 document management using pre-signed URLs.',
        'Implemented SHA-256 based file deduplication.',
        'Improved storage efficiency using lifecycle policies.',
        'Delivered scalable backend services for healthcare workflows.',
      ],
      engineeringFocus: [
        'Backend architecture',
        'REST API development',
        'Authentication & Authorization',
        'Cloud storage',
        'Production software',
        'Scalable system design',
      ],
      collaboration:
        'Collaborated with Team Lead, Engineering Manager, AI Engineers, DevOps Engineers, and Frontend Engineers to integrate services, debug production systems, discuss architecture, and ship production features.',
      keyLearnings: [
        'Building production healthcare software',
        'Cross-functional collaboration',
        'Secure backend architecture',
        'Cloud storage best practices',
        'Designing maintainable APIs',
        'Writing scalable production code',
      ],
    },
    {
      company: 'Skilzen Hiring-Bird',
      role: 'Full-Stack Developer Intern',
      employmentType: 'Internship',
      duration: 'August 2024 – January 2025',
      location: 'Remote',
      overview:
        'Contributed to a recruitment platform used by recruiters and students while gaining hands-on experience building full-stack production applications.',
      techStack: ['Next.js', 'NestJS', 'MySQL', 'Redux Toolkit', 'Amazon S3', 'Docker', 'AWS'],
      responsibilities: [
        'Developing features for the recruiter and student dashboards.',
        'Designing and implementing REST APIs.',
        'Assisting with database schema design.',
        'Implementing secure authentication and authorization.',
        'Building reusable frontend components.',
        'Optimizing Docker deployment processes.',
      ],
      achievements: [
        'Built features for a role-based platform.',
        'Designed and worked with a normalized relational database.',
        'Developed and integrated RESTful APIs.',
        'Implemented Docker optimization.',
        'Contributed to AWS deployment optimization.',
      ],
      engineeringFocus: [
        'Full-stack development',
        'Backend APIs',
        'Database design',
        'Authentication',
        'Deployment',
      ],
      collaboration: 'Worked within an 11-member engineering team to deliver full-stack features.',
      keyLearnings: [
        'Production development workflow',
        'Team collaboration',
        'Clean architecture',
        'Docker',
        'AWS deployment',
      ],
    },
    {
      company: 'I 2 Technology',
      role: 'Frontend Engineer Intern',
      employmentType: 'Internship',
      duration: 'January 2024 – May 2024',
      location: 'Remote, New Delhi',
      overview:
        'Built responsive web applications by translating Figma designs into reusable production-ready interfaces using modern React and Next.js practices.',
      techStack: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'GSAP',
        'Three.js',
        'OAuth 2.0',
      ],
      responsibilities: [
        'Responsive UI development.',
        'Designing component architecture.',
        'Implementing SSR and dynamic routing.',
        'Performing performance optimization.',
        'Integrating authentication.',
      ],
      achievements: [
        'Improved SEO scores.',
        'Achieved better application performance.',
        'Delivered highly responsive UI.',
        'Built a production-ready frontend.',
      ],
      engineeringFocus: [
        'Frontend architecture',
        'UI performance',
        'Accessibility',
        'User experience',
      ],
      collaboration:
        'Collaborated with designers and developers while implementing production interfaces.',
      keyLearnings: [
        'Modern frontend engineering',
        'Component reusability',
        'Performance optimization',
        'Design-to-code workflow',
      ],
    },
  ],

  projects: {
    professional: [
      {
        name: 'MedSagar',
        company: 'Hooc AI Technologies',
        category: 'Healthcare SaaS Platform',
        myRole: 'Backend Engineering (Primary), Frontend Integration (Secondary), API Development, System Integration, Production Support',
        overview:
          'MedSagar is a production healthcare platform serving multiple healthcare stakeholders through secure web applications. Worked as a Full-Stack Software Engineer responsible for designing backend functionality, integrating frontend applications, implementing secure authentication workflows, and collaborating across engineering teams to deliver production-ready healthcare software.',
        businessProblem:
          'Healthcare applications require secure authentication, multiple user roles, protected medical data, scalable backend APIs, reliable appointment workflows, and seamless communication between different healthcare participants. The platform was designed to solve these challenges.',
        responsibilities: [
          'Developing backend APIs.',
          'Building production-ready modules.',
          'Integrating frontend with backend services.',
          'Designing authentication workflows.',
          'Implementing authorization logic.',
          'Building reusable backend services.',
          'Fixing API issues.',
          'Debugging production issues.',
          'Resolving merge conflicts.',
          'Reviewing API contracts.',
          'Maintaining routing consistency.',
          'Supporting production deployments.',
          'Working across multiple business modules.',
          'Collaborating with QA during feature validation.',
          'Participating in technical discussions.',
        ],
        backendContributions: [
          'REST API development',
          'Express.js services',
          'MongoDB integration',
          'JWT authentication',
          'refresh token workflows',
          'Role-Based Access Control (RBAC)',
          'secure middleware',
          'business logic implementation',
          'endpoint optimization',
          'database interaction',
          'backend debugging',
          'API validation'
        ],
        frontendContributions: [
          'API integration',
          'protected routing',
          'authentication flow integration',
          'session handling',
          'UI routing fixes',
          'reusable component integration',
          'debugging frontend/backend communication'
        ],
        apiIntegrations: [
          'Agora.io video consultation APIs',
          'Integrating internal backend APIs with frontend modules',
          'Secure appointment booking workflows',
          'Doctor-patient consultation workflows'
        ],
        authentication: [
          'JWT Authentication',
          'Refresh Tokens',
          'Session Management',
          'RBAC',
          'Protected Routes',
          'User Access Validation',
          'Role Permissions',
          'Secure API Access'
        ],
        architecture: [
          'modular backend architecture',
          'REST APIs',
          'middleware',
          'scalable service organization',
          'separation of concerns',
          'reusable APIs'
        ],
        collaboration:
          'Collaborated with Team Lead, Engineering Manager, Backend Engineers, Frontend Engineers, AI Engineers, DevOps Engineers, and QA Engineers. Involved in feature planning, debugging production issues, discussing API contracts, integrating services, solving merge conflicts, reviewing implementation approaches, and shipping production releases.',
        ownership:
          'Demonstrated ownership by understanding business requirements, independently solving engineering problems, identifying backend issues, implementing scalable solutions, ensuring frontend/backend consistency, improving reliability, and taking responsibility for production-quality implementations.',
        engineeringChallenges: [
          'supporting multiple user roles',
          'maintaining secure authentication',
          'debugging production APIs',
          'handling authorization edge cases',
          'keeping frontend and backend synchronized',
          'ensuring reliable appointment workflows'
        ],
        problemSolving: [
          'root cause analysis',
          'debugging',
          'understanding existing architecture',
          'implementing maintainable fixes',
          'validating APIs',
          'testing complete workflows'
        ],
        impact:
          'Strengthened expertise in backend engineering, authentication systems, production software, healthcare SaaS, scalable API design, and collaborative software development.',
        technologies: [
          'Next.js',
          'React',
          'TypeScript',
          'Node.js',
          'Express.js',
          'MongoDB',
          'Redis',
          'JWT',
          'REST APIs',
          'Agora.io',
          'AWS S3',
        ],
        keyFeatures: [],
        learnings: [
          'production engineering',
          'scalable backend architecture',
          'secure authentication',
          'cloud-based systems',
          'cross-functional collaboration',
          'writing maintainable software'
        ]
      },
      {
        name: 'AniZone',
        company: 'Hooc AI Technologies',
        category: 'E-commerce Platform',
        myRole: 'Frontend Engineering',
        overview:
          'AniZone is an e-commerce platform focused on pet food and pet accessories. Contributed by building production frontend features using modern React and Next.js practices while integrating backend APIs and reusable UI components.',
        businessProblem: 'Providing a seamless e-commerce experience for pet owners to purchase food and accessories.',
        responsibilities: [
          'Converting UI designs into production-ready pages.',
          'Building reusable components.',
          'Integrating backend APIs.',
          'Responsive development.',
          'Optimizing user experience.',
        ],
        backendContributions: [],
        frontendContributions: [
          'Converting UI designs into production-ready pages.',
          'Building reusable components.',
          'Responsive development.',
          'Optimizing user experience.',
        ],
        apiIntegrations: [
          'Integrating backend APIs.'
        ],
        authentication: [],
        architecture: [],
        collaboration: 'Worked with the team to deliver frontend features and integrate backend APIs.',
        ownership: 'Took ownership of frontend components and UI responsiveness.',
        engineeringChallenges: [],
        problemSolving: [],
        impact: 'Delivered production frontend features for the e-commerce platform.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        keyFeatures: [],
        learnings: []
      },
      {
        name: 'Call Me',
        company: 'Hooc AI Technologies',
        category: 'Service Marketplace',
        myRole: 'Frontend Engineering',
        overview:
          'Call Me is a service marketplace platform similar in concept to Urban Company, connecting users with service providers. Contributed to frontend development, API integration, and implementation of reusable interfaces while ensuring seamless interaction between frontend and backend systems.',
        businessProblem: 'Connecting users with service providers efficiently through a seamless marketplace interface.',
        responsibilities: [
          'Frontend development.',
          'API integration.',
          'Responsive UI.',
          'Component architecture.',
          'Route integration.',
        ],
        backendContributions: [],
        frontendContributions: [
          'Frontend development.',
          'Responsive UI.',
          'Component architecture.',
          'Route integration.',
        ],
        apiIntegrations: [
          'API integration.'
        ],
        authentication: [],
        architecture: [],
        collaboration: 'Collaborated with backend engineers to ensure seamless interaction between frontend and backend systems.',
        ownership: 'Owned the frontend implementation of reusable interfaces.',
        engineeringChallenges: [],
        problemSolving: [],
        impact: 'Delivered the frontend for a service marketplace connecting users with service providers.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        keyFeatures: [],
        learnings: []
      },
    ],
    personal: [
      {
        name: 'SafeNest Backend',
        category: 'Real-Time Location Tracking & Emergency Response Platform',
        type: 'Personal Project, Backend Engineering, System Design, Real-Time Systems',
        myRole: 'Backend Engineering (Primary), System Architecture, API Design, Database Design, Authentication, Real-Time Communication, Scalability Planning',
        description: 'Designed and developed the complete backend architecture for SafeNest, a production-style family safety platform providing secure authentication, real-time location sharing, relationship management, emergency SOS broadcasting, and live communication using WebSockets.',
        overview: 'SafeNest is a backend platform powering a mobile application that enables families and friends to securely share live locations, manage trusted relationships, and trigger emergency SOS alerts. The backend was designed with production engineering principles including modular architecture, authentication, real-time communication, structured logging, validation, and scalable service organization.',
        businessProblem: 'Many people want a secure and reliable way to monitor the safety of family members and close friends without requiring constant manual communication. The platform solves this by enabling live location sharing, trusted relationship management, emergency broadcasting, real-time tracking, and secure authentication. The business goal is to provide a reliable backend platform capable of supporting secure location tracking, emergency response, and communication between trusted users.',
        tech: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Mongoose', 'Socket.IO', 'Google OAuth', 'Express Session', 'connect-mongo', 'Zod', 'Pino', 'Google Maps API'],
        architecture: 'Modular, domain-driven architecture with clear separation of concerns. Flow: Client -> Express API Gateway -> Authentication Layer -> Controllers -> Business Services -> MongoDB / Socket.IO -> Third-party services.',
        modules: ['Authentication', 'Users', 'Settings', 'Relationships', 'Devices', 'Tracking', 'Location', 'Emergency', 'Notifications'],
        backendContributions: ['REST APIs', 'authentication flow', 'session management', 'business logic', 'WebSocket communication', 'database schemas', 'validation', 'middleware', 'service layer', 'modular architecture'],
        authentication: ['Google OAuth', 'Express Session', 'Session persistence', 'MongoDB session storage', 'Secure cookies', 'Authorization middleware', 'Session validation'],
        databaseDesign: ['MongoDB', 'Mongoose', 'Schema relationships', 'ObjectId references', 'Compound indexes', 'Optimized query performance', 'Scalable document modeling'],
        realTimeFeatures: ['Live location streaming', 'Socket.IO', 'Tracking sessions', 'Real-time updates', 'Emergency broadcasts', 'Online user communication'],
        emergencySystem: 'SafeNest includes a high-priority SOS system that immediately notifies trusted contacts while broadcasting live location updates through WebSockets.',
        engineeringChallenges: ['Managing real-time socket connections', 'Keeping REST APIs synchronized with WebSocket events', 'Designing scalable MongoDB schemas', 'Session-based authentication', 'Handling relationship workflows', 'Supporting background location updates', 'Maintaining modular architecture'],
        scalabilityConsiderations: ['Horizontal scaling', 'Redis adapter for Socket.IO', 'MongoDB sharding', 'Time-series optimization', 'Database indexing', 'Connection management'],
        security: ['Google OAuth', 'Secure session cookies', 'Authorization middleware', 'Environment validation', 'Protected APIs', 'Secure configuration'],
        engineeringPractices: ['Zod validation', 'Centralized error handling', 'Structured logging using Pino', 'Graceful shutdown', 'Configuration validation', 'Modular architecture', 'Reusable services'],
        problemSolving: 'Engineering approach involved breaking problems into modular services, understanding system architecture before implementation, designing reusable business logic, optimizing database access, building maintainable APIs, testing complete workflows, and planning for scalability.',
        keyLearnings: ['Real-time backend engineering', 'Socket.IO architecture', 'Session-based authentication', 'Scalable backend design', 'Production logging', 'Database optimization', 'System architecture', 'API design', 'Security best practices'],
        impact: 'SafeNest demonstrates strong backend engineering skills including real-time communication, system architecture, authentication, database design, scalable API development, production engineering, security, and modular software design.',
        aiRetrievalKeywords: ['real-time backend', 'WebSockets', 'Socket.IO', 'Node.js', 'Express', 'MongoDB', 'Google OAuth', 'system architecture', 'backend engineering', 'REST APIs', 'authentication', 'authorization', 'location tracking', 'SOS system', 'scalable backend', 'modular architecture', 'database design', 'production engineering', 'TypeScript'],
        highlights: []
      },
      {
        name: 'CVRoaster.AI',
        description:
          'AI-powered resume screening platform with ATS-style scoring and recruiter evaluation using Google GenAI.',
        tech: ['Next.js', 'NestJS', 'TypeScript', 'Google GenAI', 'PDF Parse', 'REST API'],
        highlights: [
          'Schema-enforced JSON response validation to prevent malformed AI outputs.',
          'Modular NestJS backend with PDF parser, ATS scoring engine, and AI analysis layer.',
          'Validated REST endpoint with strict DTO contracts.',
        ],
      },
      {
        name: 'AI Planet Doc.Chat',
        description: 'RAG-based system for converting PDFs into conversational Q&A.',
        tech: ['LangChain', 'FastAPI', 'Python', 'Convex', 'Next.js', 'TypeScript'],
        highlights: [
          'Containerized backend for PDF ingestion and embedding.',
          'Streaming chat responses with session persistence.',
        ],
      },
      {
        name: 'BookMyRoom',
        description:
          'Full-stack hotel booking platform with SSR listings and transactional booking system.',
        tech: ['Next.js', 'Node.js', 'Prisma', 'MongoDB', 'Tailwind CSS'],
        highlights: [
          'Secure authentication and real-time data fetching.',
          'Transactional booking flows and concurrency-safe design.',
          'Cloudinary asset storage and optimized query filtering.',
        ],
      },
    ],
  },

  skills: {
    programming: [
      'JavaScript',
      'TypeScript',
      'Python',
      'SQL',
      'HTML5',
      'CSS3',
      'React.js',
      'Next.js',
      'Redux Toolkit',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'Node.js',
      'Express.js',
      'NestJS',
      'FastAPI',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Prisma ORM',
      'Mongoose',
      'JWT Authentication',
      'OAuth 2.0',
      'Google OAuth',
      'Session Authentication',
      'RBAC (Role-Based Access Control)',
      'REST APIs',
      'API Integration',
      'WebSocket APIs',
      'Socket.IO',
      'LangChain',
      'OpenAI API',
      'Gemini API',
      'Claude API',
      'AWS S3',
      'Pre-signed URLs',
      'Zod',
    ],
    tools: [
      'Git',
      'GitHub',
      'GitLab',
      'Docker',
      'Postman',
      'MongoDB Atlas',
      'Supabase',
      'Vercel',
      'AWS',
      'Google Cloud Platform (GCP)',
      'Firebase Cloud Messaging (FCM)',
      'Agora.io',
      'Figma',
      'WordPress',
    ],
  },

  education: [
    {
      institution: 'Inderprastha Engineering College',
      degree: "Bachelor's in Computer Science and Engineering",
      year: 'July 2024',
      gpa: '8.0/10',
      location: 'Ghaziabad, Delhi NCR',
    },
    {
      institution: 'Arunachal University of Studies',
      degree: 'Diploma High School in Computer Science',
      year: 'August 2021',
      gpa: '7.2/10',
    },
  ],

  coursework: [
    'Data Structures',
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Networks',
    'OOPS',
    'Generative AI',
    'Database Management',
  ],

  rules: [
    'Only answer questions related to Syed Tabish Haider.',
    'Use only the provided resume data.',
    'If information is not available, say you don\'t know.',
    'Reject unrelated questions politely.',
    'Do not invent experience or skills.',
  ],

  chatSuggestions: {
    recruiter: [
      'Tell me about Tabish.',
      'Give me a quick introduction to Tabish.',
      'Why should we hire Tabish?',
      'What kind of software engineer is Tabish?',
      "What are Tabish's strongest technical skills?",
      'What technologies has Tabish worked with professionally?',
      "Tell me about Tabish's professional experience.",
      "Tell me about Tabish's experience at Hooc AI Technologies.",
      "Explain Tabish's work on the MedSagar platform.",
      "What was Tabish's biggest engineering challenge?",
      'What production software has Tabish built?',
      'Which professional project should I look at first?',
      'What makes Tabish a strong Full-Stack Software Engineer?',
      'How does Tabish approach solving engineering problems?',
      'What kind of opportunities is Tabish currently looking for?',
    ],
    technical: [
      "Explain Tabish's SafeNest Backend project.",
      "Explain Tabish's backend architecture.",
      'How did Tabish implement authentication?',
      'How does Tabish design scalable REST APIs?',
      'Has Tabish worked with WebSockets?',
      "Explain Tabish's experience with MongoDB.",
      'What databases has Tabish worked with?',
      'What backend technologies does Tabish specialize in?',
      'What cloud technologies has Tabish used?',
      "Explain Tabish's experience with AWS S3.",
      'How does Tabish approach debugging production issues?',
      'Has Tabish built real-time applications?',
      'What authentication and authorization systems has Tabish implemented?',
      'What AI technologies has Tabish worked with?',
      'How does Tabish approach scalable backend development?',
    ],
    projects: [
      'Which project should I look at first?',
      "Which project best represents Tabish's backend engineering skills?",
      "Which project best demonstrates Tabish's full-stack expertise?",
      "Explain Tabish's MedSagar project.",
      "Explain Tabish's SafeNest Backend project.",
      "Explain Tabish's ClusterHub project.",
      "Explain Tabish's CryptoIQ project.",
      'Which project is Tabish most proud of?',
      'Which project was the most technically challenging for Tabish?',
      "Which project showcases Tabish's production experience?",
      "Which project demonstrates Tabish's system design skills?",
      "Which project demonstrates Tabish's real-time backend development experience?",
      "Which project demonstrates Tabish's AI engineering experience?",
      "Which project best reflects Tabish's engineering approach?",
    ],
  },
};

// System prompt for Gemini to stay grounded in resume data
export const SYSTEM_PROMPT = `You are an AI assistant representing Syed Tabish Haider, a Full Stack Developer from Delhi NCR.

NAME RECOGNITION:
The user may refer to Syed Tabish Haider by many variations — treat all of the following as the same person:
- Syed, Sayed, Sayd
- Tabish, Tabbish
- Haider, Hayder
- Syed Tabish, Sayed Tabish
- Tabish Haider, Haider Tabish
- Syed Tabish Haider, Sayed Tabish Haider
- Any reasonable combination or misspelling of the above

CRITICAL RULES:
1. Answer ONLY questions about Syed Tabish Haider using the provided resume data
2. Base ALL answers strictly on the provided resume information
3. Never invent experience, skills, projects, or education
4. Keep responses professional, concise (2-3 sentences max for quick questions, more for detailed project inquiries)
5. Be friendly and approachable while maintaining professionalism
6. IMPORTANT: Always refer to Syed Tabish Haider simply as "Tabish" in your responses — never use the full name "Syed Tabish Haider"

RESPONSE GUIDELINES:
- For experience questions: Reference specific companies, roles, durations, and achievements
- For project questions: Discuss tech stack, highlights, and personal contributions
- For skill questions: List technologies and tools from the resume
- For out-of-scope questions: Politely decline and redirect to relevant topics

BOUNDARIES:
If asked something not in the resume, respond:
"I can only share information about Tabish and his work. That specific detail isn't in my knowledge base. Feel free to ask about his experience, projects, skills, or education."

TONE:
- Professional but friendly
- Confident about capabilities from resume
- Humble about limitations (only what's in resume)
- Engaging and conversational`;

// Format resume data as string for API context
const PROFILE_CONTEXT = `
PROFESSIONAL PROFILE:
Name: ${RESUME_DATA.personal.name}
Role: ${RESUME_DATA.personal.role}
Location: ${RESUME_DATA.personal.location}
Email: ${RESUME_DATA.personal.email}
Phone: ${RESUME_DATA.personal.phone}
Portfolio: ${RESUME_DATA.personal.portfolio}
GitHub: ${RESUME_DATA.personal.github}
LinkedIn: ${RESUME_DATA.personal.linkedin}
Open to Relocate: ${RESUME_DATA.personal.openToRelocate ? 'Yes' : 'No'}
`.trim();

const SUMMARY_CONTEXT = `
PROFESSIONAL SUMMARY:
${RESUME_DATA.summary}
`.trim();

const CAREER_TIMELINE_CONTEXT = `
CAREER TIMELINE:
• July 2024: Graduated from Inderprastha Engineering College (B.Tech Computer Science).
• Sep 2023 - May 2024: Frontend Engineer Intern at I 2 Technology.
• Aug 2024 - Jan 2025: Full-Stack Developer Intern at Skilzen Hiring-Bird.
• Dec 2025 - July 2026: Software Consultant at Hooc AI Technologies.
• Recent: Built SafeNest Backend, a real-time location tracking and emergency response platform.
`.trim();

const EXPERIENCE_CONTEXT = `
WORK EXPERIENCE:
${RESUME_DATA.experience
  .map(
    (exp) => `
${exp.role} at ${exp.company} (${exp.employmentType})
Duration: ${exp.duration} | Location: ${exp.location}
Overview: ${exp.overview}
Tech Stack: ${exp.techStack.join(', ')}
Responsibilities:
${exp.responsibilities.map((r) => `• ${r}`).join('\n')}
Achievements:
${exp.achievements.map((a) => `• ${a}`).join('\n')}
Engineering Focus: ${exp.engineeringFocus.join(', ')}
Collaboration: ${exp.collaboration}
Key Learnings: ${exp.keyLearnings.join(', ')}
`.trim()
  )
  .join('\n\n---\n\n')}
`.trim();

const PROFESSIONAL_PROJECTS_CONTEXT = `
PROFESSIONAL PROJECTS:
${RESUME_DATA.projects.professional
  .map(
    (proj) => `
PROJECT: ${proj.name} (${proj.category})
Company: ${proj.company}
Role: ${proj.myRole || ''}

Overview:
${proj.overview}

Business Problem:
${proj.businessProblem || ''}

Technologies: ${proj.technologies?.join(', ') || ''}

Responsibilities:
${proj.responsibilities?.map((r) => `• ${r}`).join('\n') || ''}
${proj.backendContributions?.length ? `\nBackend Contributions:\n${proj.backendContributions.map((r) => `• ${r}`).join('\n')}` : ''}
${proj.frontendContributions?.length ? `\nFrontend Contributions:\n${proj.frontendContributions.map((r) => `• ${r}`).join('\n')}` : ''}
${proj.apiIntegrations?.length ? `\nAPI Integrations:\n${proj.apiIntegrations.map((r) => `• ${r}`).join('\n')}` : ''}
${proj.authentication?.length ? `\nAuthentication:\n${proj.authentication.map((r) => `• ${r}`).join('\n')}` : ''}
${proj.architecture?.length ? `\nArchitecture:\n${proj.architecture.map((r) => `• ${r}`).join('\n')}` : ''}

Collaboration:
${proj.collaboration || ''}

Ownership:
${proj.ownership || ''}
${proj.engineeringChallenges?.length ? `\nEngineering Challenges:\n${proj.engineeringChallenges.map((c) => `• ${c}`).join('\n')}` : ''}
${proj.problemSolving?.length ? `\nProblem Solving:\n${proj.problemSolving.map((c) => `• ${c}`).join('\n')}` : ''}
${proj.impact ? `\nImpact:\n${proj.impact}` : ''}
${proj.keyFeatures?.length ? `\nKey Features:\n${proj.keyFeatures.map((c) => `• ${c}`).join('\n')}` : ''}
${proj.learnings?.length ? `\nLearnings:\n${proj.learnings.map((c) => `• ${c}`).join('\n')}` : ''}
`.trim()
  )
  .join('\n\n---\n\n')}
`.trim();

const PERSONAL_PROJECTS_CONTEXT = `
PERSONAL PROJECTS:
${RESUME_DATA.projects.personal
  .map(
      (proj) => `
PROJECT: ${proj.name}
${proj.category ? `Category: ${proj.category}` : ''}
${proj.type ? `Type: ${proj.type}` : ''}
${proj.myRole ? `Role: ${proj.myRole}` : ''}
Description: ${proj.description}
${proj.overview ? `Overview:\n${proj.overview}` : ''}
${proj.businessProblem ? `\nProblem Statement & Business Goal:\n${proj.businessProblem}` : ''}
Technologies: ${proj.tech?.join(', ')}
${proj.architecture ? `\nArchitecture:\n${proj.architecture}` : ''}
${proj.modules?.length ? `\nModules:\n${proj.modules.map((m) => `• ${m}`).join('\n')}` : ''}
${proj.backendContributions?.length ? `\nBackend Contributions:\n${proj.backendContributions.map((c) => `• ${c}`).join('\n')}` : ''}
${proj.authentication?.length ? `\nAuthentication:\n${proj.authentication.map((a) => `• ${a}`).join('\n')}` : ''}
${proj.databaseDesign?.length ? `\nDatabase Design:\n${proj.databaseDesign.map((d) => `• ${d}`).join('\n')}` : ''}
${proj.realTimeFeatures?.length ? `\nReal-Time Features:\n${proj.realTimeFeatures.map((r) => `• ${r}`).join('\n')}` : ''}
${proj.emergencySystem ? `\nEmergency System:\n${proj.emergencySystem}` : ''}
${proj.engineeringChallenges?.length ? `\nEngineering Challenges:\n${proj.engineeringChallenges.map((e) => `• ${e}`).join('\n')}` : ''}
${proj.scalabilityConsiderations?.length ? `\nScalability Considerations:\n${proj.scalabilityConsiderations.map((s) => `• ${s}`).join('\n')}` : ''}
${proj.security?.length ? `\nSecurity:\n${proj.security.map((s) => `• ${s}`).join('\n')}` : ''}
${proj.engineeringPractices?.length ? `\nEngineering Practices:\n${proj.engineeringPractices.map((e) => `• ${e}`).join('\n')}` : ''}
${proj.problemSolving ? `\nProblem Solving:\n${proj.problemSolving}` : ''}
${proj.keyLearnings?.length ? `\nKey Learnings:\n${proj.keyLearnings.map((l) => `• ${l}`).join('\n')}` : ''}
${proj.impact ? `\nImpact:\n${proj.impact}` : ''}
${proj.aiRetrievalKeywords?.length ? `\nKeywords: ${proj.aiRetrievalKeywords.join(', ')}` : ''}
${proj.highlights?.length ? `\nHighlights:\n${proj.highlights.map((h) => `• ${h}`).join('\n')}` : ''}
`.trim()
  )
  .join('\n\n---\n\n')}
`.trim();

const SKILLS_CONTEXT = `
TECHNICAL SKILLS:
• Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3
• Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, GSAP, Framer Motion
• Backend: Node.js, Express.js, NestJS, FastAPI
• Databases: MongoDB, PostgreSQL, MySQL, Prisma ORM, Mongoose
• Authentication & Security: JWT Authentication, OAuth 2.0, Google OAuth, Session Authentication, RBAC
• APIs: REST APIs, API Integration, WebSocket APIs
• Real-Time Technologies: Socket.IO
• AI & LLM: LangChain, OpenAI API, Gemini API, Claude API
• Cloud & Storage: AWS S3, Pre-signed URLs, Google Cloud Platform (GCP), AWS
• Tools & Platforms: Git, GitHub, GitLab, Docker, Postman, MongoDB Atlas, Supabase, Vercel, Firebase Cloud Messaging (FCM), Agora.io, Figma, WordPress
• Validation: Zod
`.trim();

const ENGINEERING_PHILOSOPHY_CONTEXT = `
ENGINEERING PHILOSOPHY:
Syed Tabish Haider is deeply committed to understanding business problems first before writing code. His approach focuses on building products from scratch with clean, maintainable architecture. He strongly advocates for scalable backend systems, production-quality engineering, and delivering reliable software that provides real user value. Continuous learning is at the core of his journey.
`.trim();

const ENGINEERING_INTERESTS_CONTEXT = `
ENGINEERING INTERESTS:
• Backend Engineering
• Full-Stack Development
• System Design
• Authentication & Authorization
• AI Applications
• Real-Time Systems
• Cloud Infrastructure
• Healthcare Technology
• SaaS Platforms
• API Design
`.trim();

const RECRUITER_FACTS_CONTEXT = `
RECRUITER QUICK FACTS:
• Current Role: Full-Stack Software Engineer
• Current Status: Software Consultant at Hooc AI Technologies
• Preferred Roles: Full-Stack Engineer, Backend Engineer
• Primary Languages: JavaScript, TypeScript, Python
• Strongest Technologies: React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL
• Open to Relocation: Yes
• Primary Domain Experience: Healthcare SaaS, E-commerce, Real-time Systems
• Backend Expertise: System Architecture, API Design, Authentication, Real-Time Communication
• Frontend Expertise: React, Next.js, Responsive UI
`.trim();

const EDUCATION_CONTEXT = `
EDUCATION:
${RESUME_DATA.education
  .map(
    (edu) => `
${edu.degree}
Institution: ${edu.institution}
Graduation: ${edu.year} | GPA: ${edu.gpa}
Location: ${edu.location || 'N/A'}
`.trim()
  )
  .join('\n\n')}
`.trim();

const COURSEWORK_CONTEXT = `
COURSEWORK:
${RESUME_DATA.coursework.join(', ')}
`.trim();

const CHAT_SUGGESTIONS_CONTEXT = `
CHAT SUGGESTIONS (For UI Prompts):
Recruiter: ${RESUME_DATA.chatSuggestions.recruiter.join(' | ')}
Technical: ${RESUME_DATA.chatSuggestions.technical.join(' | ')}
Projects: ${RESUME_DATA.chatSuggestions.projects.join(' | ')}
`.trim();

const RULES_CONTEXT = `
IMPORTANT RULES:
${RESUME_DATA.rules.map((rule) => `• ${rule}`).join('\n')}
`.trim();

export const RESUME_CONTEXT = [
  PROFILE_CONTEXT,
  SUMMARY_CONTEXT,
  CAREER_TIMELINE_CONTEXT,
  EXPERIENCE_CONTEXT,
  PROFESSIONAL_PROJECTS_CONTEXT,
  PERSONAL_PROJECTS_CONTEXT,
  SKILLS_CONTEXT,
  ENGINEERING_PHILOSOPHY_CONTEXT,
  ENGINEERING_INTERESTS_CONTEXT,
  RECRUITER_FACTS_CONTEXT,
  EDUCATION_CONTEXT,
  COURSEWORK_CONTEXT,
  CHAT_SUGGESTIONS_CONTEXT,
  RULES_CONTEXT,
]
  .filter(Boolean)
  .join('\\n\\n');


