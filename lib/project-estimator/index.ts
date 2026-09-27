import { ComplexityCategory } from '@/types/hire';

export interface ProjectEstimateInput {
    projectType: string;
    features: string[];
    timeline: string;
    budget: string;
}

export interface ProjectEstimateResult {
    score: number;
    category: ComplexityCategory;
    categoryLabel: string;
    description: string;
    estimatedRange: string;
    typicalDuration: string;
    recommendedTechStack: string[];
    featureBreakdownCount: number;
}

// Configurable weights for project types
const PROJECT_TYPE_WEIGHTS: Record<string, number> = {
    'Website': 10,
    'Internal Tool': 15,
    'API / Backend': 20,
    'E-commerce': 25,
    'Mobile App': 30,
    'SaaS': 35,
    'AI / LLM Product': 40,
    'Other': 15,
};

// Configurable weights for individual requested features
const FEATURE_WEIGHTS: Record<string, number> = {
    'Authentication': 10,
    'Database': 10,
    'File storage': 10,
    'Analytics': 10,
    'Third-party APIs': 15,
    'Notifications': 15,
    'Admin Dashboard': 20,
    'Payments': 25,
    'Maps': 20,
    'Real-time functionality': 30,
    'AI / LLM': 35,
    'Mobile application': 35,
    'Other': 10,
};

// Configurable multiplier based on timeline urgency
const TIMELINE_WEIGHTS: Record<string, number> = {
    'Flexible': 0,
    '2+ months': 5,
    '1–2 months': 10,
    '3–4 weeks': 20,
    '1–2 weeks': 35, // Rush delivery
};

export function calculateProjectComplexity(input: ProjectEstimateInput): ProjectEstimateResult {
    let score = 0;

    // 1. Base score from project type
    const typeScore = PROJECT_TYPE_WEIGHTS[input.projectType] || 15;
    score += typeScore;

    // 2. Add score for each selected feature
    let featureScore = 0;
    if (Array.isArray(input.features)) {
        input.features.forEach((feature) => {
            featureScore += FEATURE_WEIGHTS[feature] || 10;
        });
    }
    score += featureScore;

    // 3. Timeline urgency boost
    const timelineScore = TIMELINE_WEIGHTS[input.timeline] || 0;
    score += timelineScore;

    // 4. Map total score to category
    let category: ComplexityCategory = 'STARTER';
    let categoryLabel = 'Starter Project';
    let description = 'Clean, single-purpose application or landing product with standard essential features.';
    let estimatedRange = '₹40,000 – ₹80,000 (~$500 – $1,000)';
    let typicalDuration = '1–2 weeks';
    let recommendedTechStack = ['Next.js', 'React', 'Tailwind CSS', 'Vercel'];

    if (score >= 110) {
        category = 'CUSTOM';
        categoryLabel = 'Enterprise & AI Solutions';
        description = 'High-scale architecture featuring real-time systems, multi-modal AI agents, mobile applications, or custom cloud setups.';
        estimatedRange = '₹2,50,000+ (~$3,500+)';
        typicalDuration = '6+ weeks';
        recommendedTechStack = ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Python / OpenAI', 'Docker'];
    } else if (score >= 70) {
        category = 'ADVANCED';
        categoryLabel = 'Advanced SaaS / Full Stack';
        description = 'Multi-feature full-stack application with authentication, database models, payment workflows, and real-time or AI features.';
        estimatedRange = '₹1,20,000 – ₹2,50,000 (~$1,500 – $3,000)';
        typicalDuration = '3–5 weeks';
        recommendedTechStack = ['Next.js 16', 'TypeScript', 'PostgreSQL / Prisma', 'Stripe', 'Tailwind CSS'];
    } else if (score >= 40) {
        category = 'STANDARD';
        categoryLabel = 'Standard Production App';
        description = 'Complete web application with dynamic data management, admin tools, user accounts, and API integrations.';
        estimatedRange = '₹80,000 – ₹1,20,000 (~$1,000 – $1,500)';
        typicalDuration = '2–3 weeks';
        recommendedTechStack = ['Next.js', 'React', 'PostgreSQL / Prisma', 'Tailwind CSS'];
    }

    return {
        score,
        category,
        categoryLabel,
        description,
        estimatedRange,
        typicalDuration,
        recommendedTechStack,
        featureBreakdownCount: input.features?.length || 0,
    };
}
