
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '@/components/sections/HeroSection';
import Projects from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/SkillsSection';
import RecentBlogs from '@/components/sections/RecentBlogs';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Videos from '@/components/sections/Videos';
import RecentWorks from '@/components/sections/RecentWorks';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 relative">
      <ScrollArea className="h-screen">
        <div className="px-4 md:px-6 lg:px-8">
          <HeroSection />
          <Videos />
          <SkillsSection />
          <Projects />
          <RecentWorks />
          <RecentBlogs />
          <Contact />
          <Footer />
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
