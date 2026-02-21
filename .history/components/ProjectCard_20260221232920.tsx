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
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="block focus:outline-none"
      >
        <div className="aspect-[4/3] w-full relative">
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-6 flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-black mb-1">
            {project.title}
          </h3>
          <div className="text-xs text-gray-600 font-medium mb-2">
            {/* Example: Branding, Website Design, Mobile App */}
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
        </div>
      </TransitionLink>
    </div>
  );
};

export default ProjectCard;
