
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/services/firebaseService';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/ui/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, ArrowLeft } from 'lucide-react';
import { useViewportWidth } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const viewportWidth = useViewportWidth();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
  
  // Reset scroll position when visiting the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter projects based on search query and category filter
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      project.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter dropdown
  const categories = projects 
    ? ['all', ...new Set(projects.map(project => project.category))]
    : ['all'];
  
  // Calculate padding based on viewport width
  const containerPadding = (() => {
    if (viewportWidth < 640) return 'px-4';
    if (viewportWidth < 768) return 'px-6';
    if (viewportWidth < 1024) return 'px-8';
    return 'px-12';
  })();
  
  // Render skeletons during loading
  if (isLoading) {
    return (
      <div className={`max-w-7xl mx-auto py-8 ${containerPadding}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse through my portfolio of work
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`max-w-7xl mx-auto py-8 ${containerPadding}`}
    >
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through my portfolio of work and technical projects
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select 
            value={categoryFilter} 
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Project grid */}
      {filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags || []}
                imageUrl={project.imageUrl}
                link={`/projects/${project.id}`}
                githubLink={project.githubLink}
                liveDemo={project.liveDemo}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Projects;
