
import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, Mail, Calendar, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile, useBreakpoint } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useBreakpoint('lg');
  
  // Scroll animations
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactClick = () => {
    if (window.openMessagePopup) {
      window.openMessagePopup();
    }
  };

  const handleScheduleClick = () => {
    if (window.openSchedulePopup) {
      window.openSchedulePopup();
    }
  };

  const handleScrollDown = () => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight;
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center py-12 sm:py-16 md:py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 space-x-2 bg-blue-900/30 text-blue-300 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Full Stack Developer & AI Enthusiast</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              <span className="block">Crafting Digital</span>
              <span className="block">Solutions with</span>
              <span className="text-blue-400">Precision & Creativity</span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto pt-4">
              Building innovative web applications with modern technologies. 
              Specialized in React, TypeScript, and full-stack development.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2 justify-center">
            <Button 
              className="group bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 sm:px-6 py-2 transition shadow-md hover:shadow-lg flex items-center"
              onClick={handleContactClick}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
              <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              className="rounded-lg border border-gray-700 px-4 sm:px-6 py-2 hover:bg-gray-800 text-gray-200 transition"
              onClick={handleScheduleClick}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Call
            </Button>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800 mt-8 max-w-lg mx-auto">
            <div>
              <div className="text-3xl font-bold text-white">5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">30+</div>
              <div className="text-sm text-gray-400">Clients</div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 bottom-10 left-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl"></div>
          <div className="absolute -z-10 top-10 right-10 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl"></div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={handleScrollDown}
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
