
import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with Next.js',
    description: 'Learn how to build performant and scalable web applications using Next.js and React, with a focus on optimization and best practices.',
    tags: ['Next.js', 'React', 'Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    link: '/projects/1',
  },
  {
    id: 2,
    title: 'Machine Learning in Production: Best Practices',
    description: 'A comprehensive guide to deploying and maintaining ML models in production environments, focusing on reliability and scalability.',
    tags: ['Machine Learning', 'ML Ops', 'Production'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    link: '/projects/2',
  },
  {
    id: 3,
    title: 'E-commerce Platform with React and Firebase',
    description: 'Building a complete e-commerce solution with React on the frontend and Firebase for backend services including auth and database.',
    tags: ['React', 'Firebase', 'E-commerce'],
    imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80',
    link: '/projects/3',
  },
  {
    id: 4,
    title: 'AI-Powered Content Recommendation Engine',
    description: 'Developing a sophisticated recommendation system that leverages machine learning to suggest personalized content to users.',
    tags: ['AI', 'Python', 'Recommendation Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    link: '/projects/4',
  },
];

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            
            // GSAP animations
            const title = sectionRef.current?.querySelector('.section-title');
            const subtitle = sectionRef.current?.querySelector('.section-subtitle');
            const viewAll = sectionRef.current?.querySelector('.view-all');
            
            gsap.from(title, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
            
            gsap.from(subtitle, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              delay: 0.2,
              ease: 'power3.out',
            });
            
            gsap.from(viewAll, {
              opacity: 0,
              duration: 0.6,
              delay: 0.4,
              ease: 'power3.out',
            });
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(sectionRef.current);
      
      return () => observer.disconnect();
    }
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-16 bg-gray-50 dark:bg-black relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(25,118,210,0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-4 w-4 bg-purple-500 rounded-full"></span>
              <h2 
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white section-title"
              >
                Featured Projects
              </h2>
            </div>
            <p 
              className="text-gray-600 dark:text-gray-400 section-subtitle"
            >
              Showcasing my best work and innovations
            </p>
          </div>
          
          <Link
            to="/projects" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1 view-all"
          >
            View all projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        
        {/* Desktop view: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                link={project.link}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile view: Horizontal scroll */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none snap-x"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="flex-shrink-0 w-[80%] snap-center"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageUrl={project.imageUrl}
                  link={project.link}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4 space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full filter blur-3xl -z-10"></div>
      </div>
    </section>
  );
};

export default Projects;
