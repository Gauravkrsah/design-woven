
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[400px] flex items-center py-20 overflow-hidden bg-black"
    >
      <div className="container mx-auto px-4 md:px-6 z-10 mt-16">
        <div className="max-w-3xl">
          <div 
            className={cn(
              "space-y-4 transition-all duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-blue-500 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Full Stack Developer & AI Enthusiast
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Crafting Digital Experiences with Code & Creativity
            </h1>
            
            <div className="flex gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-2 flex items-center gap-2">
                Hire Me <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent hover:bg-gray-800 text-white border border-gray-700 rounded-full px-6 py-2">
                View CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
