
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ProjectCard from '@/components/ui/ProjectCard';

const projectCategories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "AI/ML Projects"
];

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization',
    tags: ['UI/UX Design', 'Web Development', 'Shopify'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    link: '#',
    category: 'UI/UX Design',
  },
  {
    id: 2,
    title: 'AI-Powered Content Generator',
    description: 'A tool that uses machine learning to generate copy for marketing materials, blogs, and social media',
    tags: ['AI/ML', 'Web Development', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    link: '#',
    category: 'AI/ML Projects',
  },
  {
    id: 3,
    title: 'Building Scalable Web Applications with Next.js',
    description: 'Learn how to build performant and scalable web applications using Next.js and React',
    tags: ['Next.js', 'React', 'Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    link: '#',
    category: 'Web Development',
  },
  {
    id: 4,
    title: 'Machine Learning in Production',
    description: 'A comprehensive guide to deploying and maintaining ML models in production environments',
    tags: ['Machine Learning', 'ML Ops', 'Production'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    link: '#',
    category: 'AI/ML Projects',
  },
  {
    id: 5,
    title: 'Mobile App for Fitness Tracking',
    description: 'A cross-platform mobile app built with React Native for tracking fitness activities and progress',
    tags: ['React Native', 'Mobile Development', 'Fitness'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    link: '#',
    category: 'Mobile Apps',
  },
  {
    id: 6,
    title: 'Design System for Enterprise Apps',
    description: 'Creating a comprehensive design system for large-scale enterprise applications',
    tags: ['Design Systems', 'UI/UX', 'Enterprise'],
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    link: '#',
    category: 'UI/UX Design',
  },
];

const Projects: React.FC = () => {
  useEffect(() => {
    document.title = "Projects | Gaurav Kr Sah";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="p-8 max-w-6xl mx-auto">
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}>
              <h1 className="text-3xl font-bold mb-2">Projects</h1>
              <p className="text-gray-400 mb-8">A showcase of my best work and creative endeavors</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {projectCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-colors",
                      activeCategory === category 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
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
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Projects;
