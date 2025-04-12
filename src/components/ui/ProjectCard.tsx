
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  githubLink?: string;
  liveDemo?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  link,
  githubLink,
  liveDemo,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract project ID from link for direct navigation
  const projectId = link.split('/').pop();

  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white/5 dark:bg-[#111] text-gray-900 dark:text-white transition-all duration-300",
        "border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
        "hover:shadow-xl h-full flex flex-col",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="flex flex-col p-3 sm:p-4 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags && tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags && tags.length > 3 && (
            <span className="text-[10px] text-gray-500 dark:text-gray-400 px-1">+{tags.length - 3}</span>
          )}
        </div>

        <h3 className="font-medium text-sm sm:text-base tracking-tight mb-1 line-clamp-1">{title}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-xs sm:text-sm mb-2">{description}</p>
        
        <div className="mt-auto flex flex-col gap-2">
          <Link 
            to={link || `/projects/${projectId || '1'}`} 
            className={cn(
              "inline-flex items-center text-xs sm:text-sm font-medium",
              "text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors",
              "group-hover:underline"
            )}
          >
            View Details 
            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Github className="h-3 w-3 mr-1" />
                Code
              </a>
            )}
            
            {liveDemo && (
              <a 
                href={liveDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a 
          href={link || `/projects/${projectId || '1'}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-6 w-6 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 transition-colors"
        >
          <ExternalLink className="h-3 w-3 text-black dark:text-white" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
