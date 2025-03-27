
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '../sections/HeroSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';
import Projects from '../sections/Projects';
import RecentWorks from '../sections/RecentWorks';
import RecentBlogs from '../sections/RecentBlogs';
import RecentContents from '../sections/RecentContents';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 bg-black overflow-hidden">
      <ScrollArea className="h-screen">
        <div className="p-8">
          <HeroSection />
          
          <div className="space-y-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExperienceSection />
              <SkillsSection />
            </div>
            
            <Projects />
            <RecentWorks />
            <RecentBlogs />
            <RecentContents />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
