
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  tags?: string[];
  link: string;
  className?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  excerpt,
  date,
  imageUrl,
  tags = [],
  link,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden bg-card text-card-foreground rounded-lg",
        "border border-border/40 hover:border-border/80",
        "transition-all duration-300 ease-in-out",
        "transform hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className="relative aspect-[2/1] w-full overflow-hidden">
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
      )}
      
      <div className="flex flex-col p-6 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{tags.length - 2}</span>
                )}
              </div>
            )}
            <time className="text-xs text-muted-foreground">{date}</time>
          </div>
          
          <h3 className="font-medium text-lg tracking-tight">{title}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">{excerpt}</p>
        
        <a 
          href={link} 
          className={cn(
            "inline-flex items-center pt-2 text-sm font-medium",
            "text-primary hover:text-primary/80 transition-colors",
            "group-hover:underline"
          )}
        >
          Read more
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default BlogPostCard;
