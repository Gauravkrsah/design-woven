
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
import { useMediaQuery } from '@/hooks/use-media-query';

const MainContent: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <main className="flex-1 relative">
      <ScrollArea className="h-screen">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12">
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
