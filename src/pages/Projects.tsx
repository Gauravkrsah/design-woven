
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ProjectCard from '@/components/ui/ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/services/firebaseService';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const projectCategories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "AI/ML Projects"
];

const Projects: React.FC = () => {
  useEffect(() => {
    document.title = "Projects | Gaurav Kr Sah";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
  
  const [filteredProjects, setFilteredProjects] = useState(projectsData || []);
  
  // Filter projects based on category and search term
  useEffect(() => {
    if (!projectsData) return;
    
    let filtered = projectsData;
    
    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeCategory, searchTerm, projectsData]);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Fallback projects if none are loaded
  const fallbackProjects = [
    {
      id: '1',
      title: 'E-commerce Platform Redesign',
      description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization',
      tags: ['UI/UX Design', 'Web Development', 'Shopify'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      link: '/projects/1',
      category: 'UI/UX Design',
    },
    {
      id: '2',
      title: 'AI-Powered Content Generator',
      description: 'A tool that uses machine learning to generate copy for marketing materials, blogs, and social media',
      tags: ['AI/ML', 'Web Development', 'Python'],
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      link: '/projects/2',
      category: 'AI/ML Projects',
    },
    {
      id: '3',
      title: 'Building Scalable Web Applications with Next.js',
      description: 'Learn how to build performant and scalable web applications using Next.js and React',
      tags: ['Next.js', 'React', 'Performance'],
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
      link: '/projects/3',
      category: 'Web Development',
    },
    {
      id: '4',
      title: 'Machine Learning in Production',
      description: 'A comprehensive guide to deploying and maintaining ML models in production environments',
      tags: ['Machine Learning', 'ML Ops', 'Production'],
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      link: '/projects/4',
      category: 'AI/ML Projects',
    },
    {
      id: '5',
      title: 'Mobile App for Fitness Tracking',
      description: 'A cross-platform mobile app built with React Native for tracking fitness activities and progress',
      tags: ['React Native', 'Mobile Development', 'Fitness'],
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      link: '/projects/5',
      category: 'Mobile Apps',
    },
    {
      id: '6',
      title: 'Design System for Enterprise Apps',
      description: 'Creating a comprehensive design system for large-scale enterprise applications',
      tags: ['Design Systems', 'UI/UX', 'Enterprise'],
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
      link: '/projects/6',
      category: 'UI/UX Design',
    },
  ];

  const displayProjects = (filteredProjects && filteredProjects.length > 0) 
    ? filteredProjects 
    : (!isLoading && projectsData && projectsData.length === 0) 
      ? fallbackProjects 
      : fallbackProjects;

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="space-y-3">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-12 rounded-full" />
            <Skeleton className="h-3 w-12 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <MobileNavbar />
      
      <div className="flex flex-1 pt-[56px] sm:pt-[64px] lg:pt-0">
        <div className="hidden lg:block sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-screen">
            <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
              <div className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Projects</h1>
                <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">A showcase of my best work and creative endeavors</p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search projects..." 
                      className="pl-9 h-9 text-sm focus-visible:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-2.5"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible gap-2 no-scrollbar">
                    {projectCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors",
                          activeCategory === category 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {isLoading ? (
                  renderSkeletons()
                ) : (
                  <>
                    {filteredProjects && filteredProjects.length === 0 && searchTerm && (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium mb-2">No projects found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          No projects match your search criteria. Try another search term.
                        </p>
                        <Button variant="outline" onClick={() => setSearchTerm("")}>
                          Clear Search
                        </Button>
                      </div>
                    )}
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {displayProjects.map((project, index) => (
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
                            tags={project.tags || []}
                            imageUrl={project.imageUrl}
                            link={`/projects/${project.id}`}
                            className="h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </ScrollArea>
        </main>
        
        <div className="hidden lg:block sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Projects;
