
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

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
        "group relative overflow-hidden rounded-lg bg-card text-card-foreground transition-all duration-300 ease-in-out",
        "border border-border/40 hover:border-border/80",
        "transform hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out",
            isHovered ? "scale-105" : "scale-100"
          )}
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col space-y-2 p-6">
        <h3 className="font-medium text-xl tracking-tight">{title}</h3>
        
        <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={link} 
          className={cn(
            "inline-flex items-center text-sm font-medium mt-4",
            "text-primary hover:text-primary/80 transition-colors",
            "group-hover:underline"
          )}
        >
          View Project 
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
