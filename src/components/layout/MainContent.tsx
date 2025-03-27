
import React from 'react';
import HeroSection from '../sections/HeroSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 bg-black overflow-y-auto p-8">
      <HeroSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <ExperienceSection />
        <SkillsSection />
      </div>
    </main>
  );
};

export default MainContent;
