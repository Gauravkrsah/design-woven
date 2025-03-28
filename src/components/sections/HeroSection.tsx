
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent rounded-3xl -z-10"></div>
      
      {/* Background dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div 
          className={cn(
            "transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm mb-4 border border-blue-800/50 backdrop-blur-sm">
              <span className="animate-pulse h-2 w-2 bg-blue-400 rounded-full"></span>
              <span>Full Stack Developer & AI Enthusiast</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Crafting Digital
            <span className="relative">
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
              <span className="relative"> Experiences </span>
            </span>
            with Code & Creativity
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Building cutting-edge applications that combine beautiful design with powerful functionality. 
            Specializing in React, Node.js, and modern web technologies.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-500/30"
              onClick={() => {
                if (window.openMessagePopup) {
                  window.openMessagePopup();
                }
              }}
            >
              Let's Talk <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="/projects" 
              className="px-6 py-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              View Projects
            </a>
          </div>
          
          <div className="mt-16 flex flex-wrap gap-8 justify-start">
            <div>
              <p className="text-3xl font-bold text-white">5+</p>
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">30+</p>
              <p className="text-gray-400">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
