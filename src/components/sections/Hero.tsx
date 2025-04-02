
import React, { useEffect, useState } from 'react';
import { ChevronRight, Github, Linkedin, Twitter, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  
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

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] flex items-center py-20 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent -z-10"></div>
      
      {/* Subtle background dots */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/5 dark:bg-blue-400/5"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Full Stack Developer & AI Enthusiast</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              <span className="block">Crafting Digital</span>
              <span className="block">Solutions with</span>
              <span className="text-blue-600 dark:text-blue-400">Precision & Creativity</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              Building innovative web applications with modern technologies. 
              Specialized in React, TypeScript, and full-stack development.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="group bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 transition shadow-md hover:shadow-lg flex items-center"
                onClick={handleContactClick}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
                <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition"
                onClick={handleScheduleClick}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Call
              </Button>
            </div>
            
            {/* Stats section */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800 mt-8">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clients</div>
              </div>
            </div>
            
            {/* Social media links */}
            <div className="flex items-center space-x-4 pt-6">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-2xl"></div>
              
              {/* Profile image with subtle border */}
              <div className="relative z-10 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg max-w-md">
                <img 
                  src="/lovable-uploads/63af4e30-199c-4e86-acf9-0c456ce84647.png" 
                  alt="Gaurav Kr Sah" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="text-white text-xl font-bold">Gaurav Kr Sah</div>
                    <div className="text-gray-200 text-sm">Full Stack Developer</div>
                  </div>
                </div>
              </div>
              
              {/* Floating skill badges */}
              <div className="absolute top-4 -right-6 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-md border border-gray-100 dark:border-gray-700 animate-float">
                React.js
              </div>
              <div className="absolute top-1/3 -left-8 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-md border border-gray-100 dark:border-gray-700 animate-float" style={{animationDelay: '1s'}}>
                Node.js
              </div>
              <div className="absolute bottom-12 -right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-md border border-gray-100 dark:border-gray-700 animate-float" style={{animationDelay: '0.5s'}}>
                TypeScript
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
