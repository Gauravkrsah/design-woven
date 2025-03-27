
import React, { useState } from 'react';
import BlogPostCard from '@/components/ui/BlogPostCard';
import { cn } from '@/lib/utils';

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with Next.js',
    excerpt: 'Learn how to build performant and scalable web applications using Next.js and React, with a focus on optimization and best practices.',
    date: 'Apr 15, 2023',
    tags: ['Next.js', 'React', 'Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Machine Learning in Production: Best Practices',
    excerpt: 'A comprehensive guide to deploying and maintaining ML models in production environments, focusing on reliability and scalability.',
    date: 'Mar 22, 2023',
    tags: ['Machine Learning', 'ML Ops', 'Production'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
];

const Blog: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <section 
      id="blog" 
      className="py-20"
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
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 
            className={cn(
              "text-3xl font-bold tracking-tight transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            Latest Blog Posts
          </h2>
          <p 
            className={cn(
              "text-muted-foreground mt-4 transition-all duration-700 delay-100",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            Thoughts, tutorials, and insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <BlogPostCard
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                tags={post.tags}
                imageUrl={post.imageUrl}
                link={post.link}
              />
            </div>
          ))}
        </div>
        
        <div 
          className={cn(
            "mt-12 text-center transition-all duration-700 delay-400",
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          )}
        >
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
          >
            Read All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
