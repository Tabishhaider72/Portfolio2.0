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
