
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/services/firebaseService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useViewportWidth } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const viewportWidth = useViewportWidth();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id || ''),
    enabled: !!id,
  });
  
  useEffect(() => {
    // Reset scroll position when viewing project details
    window.scrollTo(0, 0);
  }, [id]);
  
  // Calculate padding based on viewport width
  const containerPadding = (() => {
    if (viewportWidth < 640) return 'px-4';
    if (viewportWidth < 768) return 'px-6';
    if (viewportWidth < 1024) return 'px-8';
    return 'px-12';
  })();
  
  if (isLoading) {
    return (
      <div className={`max-w-6xl mx-auto py-8 ${containerPadding}`}>
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        
        <Skeleton className="w-full h-96 rounded-xl mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <div>
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className={`max-w-6xl mx-auto py-8 ${containerPadding}`}>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/projects">Browse All Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`max-w-6xl mx-auto py-8 ${containerPadding}`}
    >
      {/* Back button */}
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link to="/projects" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400">
          {project.category}
        </p>
      </div>
      
      {/* Featured image */}
      <div className="rounded-xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-auto object-cover aspect-video"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About this project</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {project.description}
            </p>
            {project.content && (
              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {project.content}
                </p>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <Tag className="h-4 w-4" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Links & Info</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              {project.githubLink && (
                <li>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github className="h-5 w-5" />
                    <span>View Source Code</span>
                  </a>
                </li>
              )}
              
              {project.liveDemo && (
                <li>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Live Demo</span>
                  </a>
                </li>
              )}
            </ul>
            
            {/* Add more project details if available */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Category</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.category}</p>
            </div>
          </div>
          
          {/* Contact for similar projects section */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 border border-blue-100 dark:border-blue-900/50">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Interested in something similar?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              I can build a custom solution tailored to your specific needs.
            </p>
            <Button className="w-full" onClick={() => window.openMessagePopup && window.openMessagePopup()}>
              Contact Me
            </Button>
          </div>
        </div>
      </div>
      
      {/* More projects section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">More Projects</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/projects" className="block">
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <p className="font-medium text-gray-900 dark:text-white">Browse All Projects</p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
