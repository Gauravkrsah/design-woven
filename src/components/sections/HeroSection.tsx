
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm mb-4">
            <span>Full Stack Developer & AI Enthusiast</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-16">
          Crafting Digital<br />
          Experiences with Code &<br />
          Creativity
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
