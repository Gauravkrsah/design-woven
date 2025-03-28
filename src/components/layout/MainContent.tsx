
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '../sections/HeroSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';
import Projects from '../sections/Projects';
import RecentWorks from '../sections/RecentWorks';
import ContentCard from '../ui/ContentCard';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="flex-1 bg-black overflow-hidden">
      <ScrollArea className="h-screen">
        <div className="p-6 lg:p-8">
          <HeroSection />
          
          <div className="space-y-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExperienceSection />
              <SkillsSection />
            </div>
            
            <Projects />
            <RecentWorks />
            
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Featured Content</h2>
                  <p className="text-gray-400">Videos, tutorials and courses to help you learn</p>
                </div>
                <a href="/contents" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                  View All
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          
          <div className="mt-16 py-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Gaurav Kr Sah. All rights reserved.</p>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
