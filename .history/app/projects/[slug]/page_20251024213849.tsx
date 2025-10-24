// page.tsx
import { notFound } from 'next/navigation';
import ProjectDetails from './_components/ProjectDetails';
import { PROJECTS } from '@/lib/data';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
    const { slug } = params;
    const project = PROJECTS.find((project) => project.slug === slug);
    return {
        title: `${project?.title} - ${project?.techStack.slice(0, 3).join(', ')}`,
        description: project?.description,
    };
};

interface PageParams {
    params: {
        slug: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params }: PageParams) => {
    const { slug } = params;
    const project = PROJECTS.find((project) => project.slug === slug);
    if (!project) {
        return notFound();
    }
    return <ProjectDetails project={project} />;
};

export default Page;
