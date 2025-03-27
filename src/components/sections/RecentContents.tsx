
import React, { useState } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const contents = [
  {
    id: 1,
    title: 'Building a Full-Stack App with React and Node.js',
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    type: 'Video Tutorial',
    duration: '32:15',
    platform: 'YouTube',
  },
  {
    id: 2,
    title: 'Designing Modern UIs with Figma',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    type: 'Masterclass',
    duration: '45:22',
    platform: 'Udemy',
  },
  {
    id: 3,
    title: 'Advanced TypeScript Patterns for React',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    type: 'Code Walkthrough',
    duration: '28:17',
    platform: 'YouTube',
  },
  {
    id: 4,
    title: 'Introduction to Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    type: 'Workshop',
    duration: '1:15:08',
    platform: 'Skillshare',
  },
];

const RecentContents: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <section 
      id="recent-contents" 
      className="py-10 pb-20"
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(el);
        }
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-4 w-4 bg-purple-500 rounded-full"></span>
              <h2 
                className={cn(
                  "text-2xl font-bold tracking-tight text-white transition-all duration-700",
                  isVisible ? "opacity-100" : "opacity-0 translate-y-4"
                )}
              >
                Featured Content
              </h2>
            </div>
            <p 
              className={cn(
                "text-gray-400 transition-all duration-700 delay-100",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}
            >
              Videos, tutorials and educational content I've created
            </p>
          </div>
          
          <Link
            to="/contents" 
            className={cn(
              "text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            View all content <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {contents.map((content, index) => (
            <div 
              key={content.id}
              className={cn(
                "bg-gray-900 rounded-lg overflow-hidden transition-all duration-700 group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={content.thumbnail} 
                  alt={content.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white/90" />
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {content.duration}
                </div>
                <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md">
                  {content.type}
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-400 mb-1">{content.platform}</div>
                <h3 className="text-white font-medium line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {content.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentContents;
