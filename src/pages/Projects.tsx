
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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
                    {filteredProjects && filteredProjects.length === 0 && projectsData && projectsData.length > 0 && searchTerm && (
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
                    
                    {projectsData && projectsData.length === 0 && (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Projects added from the admin dashboard will appear here.
                        </p>
                      </div>
                    )}
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {filteredProjects && filteredProjects.map((project, index) => (
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
