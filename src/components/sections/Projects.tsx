
import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedProjects } from '@/lib/services/firebaseService';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: getFeaturedProjects
  });
  
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
            
            if (title && subtitle && viewAll) {
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
      className="py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-black relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(25,118,210,0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <span className="h-3 w-3 sm:h-4 sm:w-4 bg-purple-500 rounded-full"></span>
              <h2 
                className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white section-title"
              >
                Featured Projects
              </h2>
            </div>
            <p 
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 section-subtitle"
            >
              Showcasing my best work and innovations
            </p>
          </div>
          
          <Link
            to="/projects" 
            className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1 view-all"
          >
            View all projects <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>
        
        {/* Desktop view: Grid layout */}
        {isLoading ? (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags || []}
                    imageUrl={project.imageUrl}
                    link={`/projects/${project.id}`}
                    className="h-full"
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No featured projects available. Add projects from the admin dashboard.
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Mobile view: Horizontal scroll */}
        {isLoading ? (
          <div className="md:hidden pb-4">
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-shrink-0 w-[80%] space-y-3">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="md:hidden relative">
            {projects && projects.length > 0 ? (
              <>
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none snap-x no-scrollbar"
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
                        tags={project.tags || []}
                        imageUrl={project.imageUrl}
                        link={`/projects/${project.id}`}
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
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No featured projects available. Add projects from the admin dashboard.
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full filter blur-3xl -z-10"></div>
      </div>
    </section>
  );
};

export default Projects;
