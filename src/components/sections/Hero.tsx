
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;
      const translateY = scrollPosition * 0.3;
      
      if (opacity > 0) {
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      ref={heroRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background via-muted/20 opacity-70 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 z-10 mt-16">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-8">
          <div 
            className={cn(
              "space-y-4 transition-all duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-muted-foreground">Hi, my name is</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              <AnimatedText text="Gaurav Kr Sah" className="block" />
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground tracking-tight text-balance leading-relaxed">
              <AnimatedText 
                text="I create digital experiences with code and creativity." 
                className="block"
                speed={30}
              />
            </h2>
          </div>
          
          <p 
            className={cn(
              "text-muted-foreground max-w-xl mx-auto text-balance transition-all duration-1000 ease-out delay-300",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            I'm a senior ML engineer specializing in building and deploying machine learning solutions 
            that power data-driven decisions. Currently focused on developing scalable AI systems.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:translate-y-[-2px] hover:shadow-lg"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all hover:translate-y-[-2px]"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#experience" aria-label="Scroll down">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
