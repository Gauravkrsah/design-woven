
import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with Next.js',
    description: 'Learn how to build performant and scalable web applications using Next.js and React, with a focus on optimization and best practices.',
    tags: ['Next.js', 'React', 'Frontend'],
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
  {
    id: 3,
    title: 'Advanced TypeScript Patterns for Enterprise Apps',
    description: 'Exploring advanced TypeScript patterns and techniques for building robust enterprise applications with improved type safety.',
    tags: ['TypeScript', 'Patterns', 'Enterprise'],
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
];

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <section 
      id="projects" 
      className="py-20 bg-muted/30"
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
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 
            className={cn(
              "text-3xl font-bold tracking-tight transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            Featured Projects
          </h2>
          <p 
            className={cn(
              "text-muted-foreground mt-4 transition-all duration-700 delay-100",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            Showcasing my best work and innovations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                link={project.link}
              />
            </div>
          ))}
        </div>
        
        <div 
          className={cn(
            "mt-12 text-center transition-all duration-700 delay-500",
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          )}
        >
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
