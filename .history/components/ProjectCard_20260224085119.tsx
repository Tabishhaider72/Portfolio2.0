import { IProject } from '@/types';
import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

interface ProjectCardProps {
  project: IProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = React.useState(project.thumbnail || '/projects/placeholder.svg');

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      delay: index * 0.15,
      duration: 0.7,
      ease: 'power2.out',
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-none transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover:border-gray-400 focus-within:border-black"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
    >
      <div className="aspect-[4/3] w-full relative">
        <TransitionLink href={`/projects/${project.slug}`} className="block focus:outline-none">
          <Image
            src={imgSrc}
            alt={project.title}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgSrc('/projects/placeholder.svg')}
          />
        </TransitionLink>
      </div>

      <div className="p-6 flex flex-col gap-2">
        <TransitionLink href={`/projects/${project.slug}`} className="no-underline">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-black mb-1">
            {project.title}
          </h3>
          <div className="text-xs text-gray-600 font-medium mb-2">
            {project.techStack[0] || 'Website Design'}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span key={tech} className="">
                {tech}
                {idx !== project.techStack.slice(0, 3).length - 1 && (
                  <span className="inline-block mx-1">•</span>
                )}
              </span>
            ))}
          </div>
        </TransitionLink>

        <div className="mt-4">
          <TransitionLink
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-200"
          >
            View Project
          </TransitionLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
