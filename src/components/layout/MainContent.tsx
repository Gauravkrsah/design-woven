
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '../sections/HeroSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';
import Projects from '../sections/Projects';
import RecentWorks from '../sections/RecentWorks';
import RecentBlogs from '../sections/RecentBlogs';
import RecentContents from '../sections/RecentContents';
import VideosHero from '../sections/VideosHero';
import ContentCard from '../ui/ContentCard';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const featuredContent = [
  {
    id: "1",
    title: "Building a Full-Stack App with React and Node.js",
    imageUrl: "/lovable-uploads/63af4e30-199c-4e86-acf9-0c456ce84647.png",
    platform: "YouTube",
    duration: "32:15",
    likes: 1245,
    comments: 83,
    shares: 41,
    category: "Video Tutorial",
    isVideo: true,
    link: "https://youtube.com/example"
  },
  {
    id: "2",
    title: "Designing Modern UIs with Figma",
    imageUrl: "/lovable-uploads/71ebdfd0-b894-428b-8b13-23379499b18b.png",
    platform: "Udemy",
    duration: "45:22",
    likes: 876,
    comments: 65,
    shares: 32,
    category: "Masterclass",
    isVideo: true,
    link: "https://udemy.com/example"
  },
  {
    id: "3",
    title: "Advanced TypeScript Patterns for React",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
    platform: "YouTube",
    duration: "28:17",
    likes: 932,
    comments: 47,
    shares: 28,
    category: "Code Walkthrough",
    isVideo: true,
    link: "https://youtube.com/example"
  },
  {
    id: "4",
    title: "Introduction to Machine Learning",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    platform: "Skillshare",
    duration: "1:15:08",
    likes: 1529,
    comments: 104,
    shares: 89,
    category: "Workshop",
    isVideo: true,
    link: "https://skillshare.com/example"
  }
];

const MainContent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
    
    // Add floating particles animation
    const container = document.querySelector('.main-background');
    if (container) {
      // Clear existing particles when theme changes
      container.innerHTML = '';
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`;
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
      }
    }
  }, [theme]);

  return (
    <main className="flex-1 bg-gray-50 dark:bg-black overflow-hidden relative">
      {/* Animated background */}
      <div className="main-background absolute inset-0 overflow-hidden pointer-events-none -z-10"></div>
      
      <ScrollArea className="h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <HeroSection />
          
          <div className="space-y-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExperienceSection />
              <SkillsSection />
            </div>
            
            <Projects />
            <VideosHero />
            <RecentWorks />
            <RecentBlogs />
            
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Featured Content</h2>
                  <p className="text-gray-600 dark:text-gray-400">Videos, tutorials and courses to help you learn</p>
                </div>
                <a href="/contents" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors text-sm">
                  View All
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredContent.map((content, index) => (
                  <div 
                    key={content.id}
                    className={cn(
                      "transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <ContentCard {...content} />
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">© {new Date().getFullYear()} Gaurav Kr Sah. All rights reserved.</p>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
