
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  link,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-[#111] text-white transition-all duration-300",
        "border border-gray-800 hover:border-gray-700",
        "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-gray-900">
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col p-2">
        <h3 className="font-medium text-xs tracking-tight text-white mb-1">{title}</h3>
        
        <p className="text-gray-400 line-clamp-2 text-xs mb-1">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-1">
          {tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-300"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="text-[10px] text-gray-400">+{tags.length - 2}</span>
          )}
        </div>
        
        <Link 
          to={link} 
          className={cn(
            "inline-flex items-center text-xs font-medium",
            "text-blue-500 hover:text-blue-400 transition-colors",
            "group-hover:underline"
          )}
        >
          View Project 
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
