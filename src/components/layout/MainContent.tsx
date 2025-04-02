
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import RecentBlogs from '@/components/sections/RecentBlogs';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 relative">
      <ScrollArea className="h-screen">
        <div className="px-0">
          <Hero />
          <SkillsSection />
          <Projects />
          <ExperienceSection />
          <RecentBlogs />
          <Contact />
          <Footer />
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
