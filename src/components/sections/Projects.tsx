
import React, { useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with Next.js',
    description: 'Learn how to build performant and scalable web applications using Next.js and React, with a focus on optimization and best practices.',
    tags: ['Next.js', 'React', 'Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Machine Learning in Production: Best Practices',
    description: 'A comprehensive guide to deploying and maintaining ML models in production environments, focusing on reliability and scalability.',
    tags: ['Machine Learning', 'ML Ops', 'Production'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
];

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <section 
      id="projects" 
      className="py-20 bg-black"
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(el);
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-4 w-4 bg-purple-500 rounded-full"></span>
              <h2 
                className={cn(
                  "text-2xl font-bold tracking-tight text-white transition-all duration-700",
                  isVisible ? "opacity-100" : "opacity-0 translate-y-4"
                )}
              >
                Featured Projects
              </h2>
            </div>
            <p 
              className={cn(
                "text-gray-400 transition-all duration-700 delay-100",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}
            >
              Showcasing my best work and innovations
            </p>
          </div>
          
          <a 
            href="#" 
            className={cn(
              "text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            View all projects <ArrowRight className="h-3 w-3" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                link={project.link}
                className="bg-[#111] border-gray-800 h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
