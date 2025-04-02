
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/services/apiService';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Globe, Github, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import { cn } from '@/lib/utils';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(Number(id)),
    enabled: !!id,
  });
  
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Project | Gaurav Kr Sah`;
    } else {
      document.title = 'Project Details | Gaurav Kr Sah';
    }
  }, [project]);
  
  const goBack = () => {
    navigate('/projects');
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-500">Error loading project</h3>
          <p className="text-gray-400 mt-2">Unable to load the project details. Please try again.</p>
          <Button onClick={goBack} variant="ghost" className="mt-4">
            Go back to projects
          </Button>
        </div>
      );
    }
    
    if (!project) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Project not found</h3>
          <p className="text-gray-400 mt-2">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={goBack} variant="ghost" className="mt-4">
            Go back to projects
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={goBack} 
            className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
            
          <div className="rounded-xl overflow-hidden mb-6">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {format(new Date(project.createdAt), 'MMM dd, yyyy')}
              </span>
              
              <Badge variant="outline" className="ml-4 bg-green-500/10 text-green-500 border-green-500/20">
                {project.category}
              </Badge>
              
              {project.featured && (
                <Badge className="ml-2 bg-purple-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub Repository
            </a>
          )}
          
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              <Globe className="mr-2 h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <MobileNavbar />
      
      <div className="flex flex-1 pt-[60px] lg:pt-0">
        <div className="hidden lg:block sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-screen">
            <div className="p-6 lg:p-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {renderContent()}
              </motion.div>
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

export default ProjectDetail;
