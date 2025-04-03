
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Globe, Github, ArrowLeft, ExternalLink, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import { cn } from '@/lib/utils';
import { getProjectById, getFeaturedProjects } from '@/lib/services/firebaseService';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/lib/models';
import { toast } from '@/components/ui/use-toast';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id as string),
    enabled: !!id,
  });
  
  const { data: relatedProjects } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: getFeaturedProjects,
    enabled: !!project,
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title || 'Project Details',
        text: project?.description || 'Check out this project',
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({ title: "Link copied to clipboard", description: "Share it with your network" });
      });
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-32 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Error loading project</h3>
          <p className="text-gray-400 mt-2 mb-6">Unable to load the project details. Please try again.</p>
          <Button onClick={goBack} variant="outline" className="mt-4">
            Go back to projects
          </Button>
        </div>
      );
    }
    
    if (!project) {
      return (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">Project not found</h3>
          <p className="text-gray-400 mt-2 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={goBack} variant="outline" className="mt-4">
            Go back to projects
          </Button>
        </div>
      );
    }
    
    const filteredRelatedProjects = relatedProjects?.filter(p => p.id !== project.id).slice(0, 3) || [];
    
    return (
      <div className="space-y-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={goBack} 
            className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
            
          <div className="rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
            <img 
              src={project.imageUrl || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80'} 
              alt={project.title} 
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2">
              {project.tags && project.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs sm:text-sm bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {project.createdAt ? format(new Date(project.createdAt), 'MMM dd, yyyy') : 'No date'}
              </span>
              
              <Badge variant="outline" className="ml-4 bg-green-500/10 text-green-500 border-green-500/20">
                {project.category || 'Project'}
              </Badge>
              
              {project.featured && (
                <Badge className="ml-2 bg-purple-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs sm:text-sm"
                onClick={handleShare}
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs sm:text-sm"
              >
                <Bookmark className="h-3.5 w-3.5 mr-1.5" /> Save
              </Button>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>
          {project.content && (
            <div className="mt-4 prose dark:prose-invert max-w-none text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: project.content }}></div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {(project.githubUrl || project.githubLink) && (
            <a 
              href={project.githubUrl || project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs sm:text-sm"
            >
              <Github className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> GitHub Repository
            </a>
          )}
          
          {(project.demoUrl || project.liveDemo) && (
            <a 
              href={project.demoUrl || project.liveDemo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors text-xs sm:text-sm"
            >
              <Globe className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Live Demo
            </a>
          )}
        </div>
        
        {filteredRelatedProjects.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">More Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRelatedProjects.map((relatedProject: Project) => (
                <div 
                  key={relatedProject.id} 
                  className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" 
                  onClick={() => navigate(`/projects/${relatedProject.id}`)}
                >
                  <div className="aspect-video rounded-md overflow-hidden mb-3">
                    <img 
                      src={relatedProject.imageUrl || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80'} 
                      alt={relatedProject.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h4 className="font-medium text-sm line-clamp-1">{relatedProject.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">{relatedProject.description}</p>
                  <div className="flex items-center text-blue-500 text-xs mt-2">
                    Learn more <ExternalLink className="ml-1 h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <MobileNavbar />
      
      <div className="flex flex-1 pt-[56px] sm:pt-[64px] lg:pt-0">
        <div className="hidden lg:block sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-screen">
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
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
