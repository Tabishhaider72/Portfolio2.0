/**
 * Structured resume data for Gemini AI context
 * This is the ONLY data source the chatbot should use
 * No hallucinations or external data sources allowed
 */

export const RESUME_DATA = {
  personal: {
    name: 'Syed Tabish Haider',
    role: 'Full Stack Developer',
    location: 'Delhi NCR (Ghaziabad, UP)',
    openToRelocate: true,
    email: 'sayedtabish72@gmail.com',
    phone: '8920637836',
    portfolio: 'https://portfolio-2.0-main.vercel.app',
    github: 'https://github.com/Tabishhaider72',
    linkedin: 'https://www.linkedin.com/in/sayed-tabish-haider',
  },

  summary:
    'Full-stack developer specializing in scalable web applications using React, Next.js, TypeScript, and Node.js. Experienced in AI-driven systems, modern SaaS architectures, and performance optimization.',

  experience: [
    {
      company: 'SKILZEN HIRING-BIRD',
      role: 'Full Stack Developer Intern',
      duration: 'August 2024 – January 2025',
      location: 'Remote',
      highlights: [
        'Designed and implemented role-scoped MySQL storage subsystem with strict access controls improving permission enforcement across student and recruiter roles.',
        'Built 10+ responsive and accessible UI components from Figma using Next.js and Tailwind CSS, improving delivery speed by 25%.',
        'Optimized multi-stage Docker builds for AWS deployment reducing image size by 30%.',
      ],
    },
    {
      company: 'I 2 TECHNOLOGY',
      role: 'Frontend Engineer Intern',
      duration: 'September 2023 – May 2024',
      location: 'Remote, India',
      highlights: [
        'Architected scalable frontend using Next.js 13 and TypeScript with SSR-based routing.',
        'Implemented server-side rendering and dynamic routing improving SEO and performance.',
        'Integrated OAuth 2.0 authentication and notification system using Resend.',
      ],
    },
  ],

  projects: [
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

  skills: {
    programming: [
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'Python',
      'LangChain',
      'FastAPI',
      'NestJS',
      'PostgreSQL',
      'MongoDB',
      'Prisma',
      'REST API',
      'HTML/CSS',
      'GSAP',
      'Framer Motion',
    ],
    tools: [
      'Git',
      'Postman',
      'AWS',
      'Vercel',
      'Docker',
      'GitLab',
      'Supabase',
      'Figma',
      'GCP',
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
};

// System prompt for Gemini to stay grounded in resume data
export const SYSTEM_PROMPT = `You are an AI assistant representing Syed Tabish Haider, a Full Stack Developer from Delhi NCR.

CRITICAL RULES:
1. Answer ONLY questions about Syed Tabish Haider using the provided resume data
2. Base ALL answers strictly on the provided resume information
3. Never invent experience, skills, projects, or education
4. Keep responses professional, concise (2-3 sentences max for quick questions, more for detailed project inquiries)
5. Be friendly and approachable while maintaining professionalism

RESPONSE GUIDELINES:
- For experience questions: Reference specific companies, roles, durations, and achievements
- For project questions: Discuss tech stack, highlights, and personal contributions
- For skill questions: List technologies and tools from the resume
- For out-of-scope questions: Politely decline and redirect to relevant topics

BOUNDARIES:
If asked something not in the resume, respond:
"I can only share information about Syed Tabish Haider and his work. That specific detail isn't in my knowledge base. Feel free to ask about his experience, projects, skills, or education."

TONE:
- Professional but friendly
- Confident about capabilities from resume
- Humble about limitations (only what's in resume)
- Engaging and conversational`;

// Format resume data as string for API context
export const RESUME_CONTEXT = `
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

PROFESSIONAL SUMMARY:
${RESUME_DATA.summary}

WORK EXPERIENCE:
${RESUME_DATA.experience
  .map(
    (exp) => `
${exp.role} at ${exp.company}
Duration: ${exp.duration} | Location: ${exp.location}
${exp.highlights.map((h) => `• ${h}`).join('\n')}
`
  )
  .join('\n---\n')}

PROJECTS:
${RESUME_DATA.projects
  .map(
    (proj) => `
PROJECT: ${proj.name}
Description: ${proj.description}
Technologies: ${proj.tech.join(', ')}
Highlights:
${proj.highlights.map((h) => `• ${h}`).join('\n')}
`
  )
  .join('\n---\n')}

TECHNICAL SKILLS:
Programming Languages & Frameworks: ${RESUME_DATA.skills.programming.join(', ')}
Tools & Platforms: ${RESUME_DATA.skills.tools.join(', ')}

EDUCATION:
${RESUME_DATA.education
  .map(
    (edu) => `
${edu.degree}
Institution: ${edu.institution}
Graduation: ${edu.year} | GPA: ${edu.gpa}
Location: ${edu.location}
`
  )
  .join('\n')}

COURSEWORK:
${RESUME_DATA.coursework.join(', ')}

IMPORTANT RULES:
${RESUME_DATA.rules.map((rule) => `• ${rule}`).join('\n')}
`;

