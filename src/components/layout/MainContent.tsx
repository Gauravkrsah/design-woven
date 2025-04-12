
import React, { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import { useViewportWidth } from '@/hooks/use-mobile';
import About from '@/components/sections/About';

const MainContent: React.FC = () => {
  const viewportWidth = useViewportWidth();
  
  // Force scrollbar to appear to prevent layout shifts
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);
  
  // Calculate padding based on viewport width
  const containerPadding = (() => {
    if (viewportWidth < 640) return 'px-3';
    if (viewportWidth < 768) return 'px-4';
    if (viewportWidth < 1024) return 'px-6';
    return 'px-8 xl:px-12';
  })();
  
  return (
    <main className="flex-1 relative w-full">
      <ScrollArea className="h-screen w-full">
        <div className={`${containerPadding} max-w-screen-2xl mx-auto`}>
          <HeroSection />
          <About />
          <SkillsSection />
          <Contact />
          <Footer />
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
