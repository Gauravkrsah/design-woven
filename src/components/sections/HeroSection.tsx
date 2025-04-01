
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Calendar, Play, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    setIsVisible(true);
    
    if (textRef.current) {
      const splitText = (text: string) => {
        return text.split('').map((char, i) => (
          <span key={i} className="inline-block opacity-0">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ));
      };
      
      const title = textRef.current.querySelector('.hero-title');
      const subtitle = textRef.current.querySelector('.hero-subtitle');
      
      if (title && subtitle) {
        const titleText = title.textContent || '';
        const subtitleText = subtitle.textContent || '';
        
        if (title instanceof HTMLElement) {
          title.innerHTML = '';
          splitText(titleText).forEach(span => {
            const spanNode = document.createElement('span');
            spanNode.className = 'inline-block opacity-0';
            spanNode.textContent = span.props.children;
            title.appendChild(spanNode);
          });
        }
        
        if (subtitle instanceof HTMLElement) {
          subtitle.innerHTML = '';
          splitText(subtitleText).forEach(span => {
            const spanNode = document.createElement('span');
            spanNode.className = 'inline-block opacity-0';
            spanNode.textContent = span.props.children;
            subtitle.appendChild(spanNode);
          });
        }
        
        const titleChars = title.querySelectorAll('span');
        const subtitleChars = subtitle.querySelectorAll('span');
        
        gsap.from('.hero-badge', {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2
        });
        
        gsap.to(titleChars, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.5
        });
        
        gsap.to(subtitleChars, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power3.out',
          delay: 1.2
        });
        
        gsap.from('.hero-buttons', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1.8
        });
        
        gsap.from('.hero-stats', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 2.2,
          stagger: 0.2
        });
        
        gsap.from('.hero-social', {
          opacity: 0,
          x: -20,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 2.5
        });
      }
      
      // Background animation
      if (heroRef.current) {
        const dots = Array.from({ length: 100 }).map((_, i) => {
          const dot = document.createElement('div');
          dot.className = 'absolute rounded-full opacity-0';
          dot.style.width = `${Math.random() * 5 + 1}px`;
          dot.style.height = dot.style.width;
          dot.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
          dot.style.top = `${Math.random() * 100}%`;
          dot.style.left = `${Math.random() * 100}%`;
          heroRef.current?.appendChild(dot);
          return dot;
        });
        
        gsap.to(dots, {
          opacity: 1,
          duration: 2,
          delay: 0.5,
          stagger: 0.02,
          ease: 'power2.out'
        });
        
        gsap.to(dots, {
          y: -30,
          duration: 8,
          repeat: -1,
          yoyo: true,
          stagger: 0.1,
          ease: 'sine.inOut'
        });
      }
    }
  }, [theme]);

  const handleScheduleClick = () => {
    if (window.openSchedulePopup) {
      window.openSchedulePopup();
    }
  };

  return (
    <section 
      ref={heroRef}
      className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 dark:from-blue-900/20 to-transparent rounded-3xl -z-10"></div>
      
      {/* Background dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)' 
            : 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <div 
            ref={textRef}
            className={cn(
              "lg:col-span-7 transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Social icons - vertical on desktop */}
            <div className="hidden lg:flex flex-col gap-4 absolute left-0 top-1/2 -translate-y-1/2">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hero-social border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hero-social border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hero-social border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-900/20 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm mb-4 border border-blue-500/30 backdrop-blur-sm hero-badge">
                <span className="animate-pulse h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                <span>Full Stack Developer & AI Enthusiast</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight hero-title">
              Crafting Digital <span className="text-blue-600 dark:text-blue-400">Experiences</span> with Code & Creativity
            </h1>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-2xl hero-subtitle leading-relaxed">
              Building cutting-edge applications that combine beautiful design with powerful functionality. 
              Specializing in React, Node.js, and modern web technologies.
            </p>
            
            <div className="flex flex-wrap gap-4 hero-buttons">
              <Button 
                className="px-6 py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-500/30 h-12"
                onClick={() => {
                  if (window.openMessagePopup) {
                    window.openMessagePopup();
                  }
                }}
              >
                <Mail className="w-4 h-4 mr-1" /> Contact Me <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button 
                variant="outline"
                className="px-6 py-6 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 h-12"
                onClick={handleScheduleClick}
              >
                <Calendar className="w-4 h-4" /> Schedule a Call
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setShowVideo(true)}
                className="px-6 py-6 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 group h-12"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                </div>
                <span className="ml-2">Watch Intro</span>
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap gap-12 justify-start">
              <div className="hero-stats">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">5+</p>
                <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
              </div>
              <div className="hero-stats">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">50+</p>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div className="hero-stats">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">30+</p>
                <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
              </div>
            </div>
            
            {/* Social icons - horizontal on mobile */}
            <div className="flex lg:hidden justify-center gap-4 mt-8">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hero-social border border-gray-200 dark:border-gray-700"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hero-social border border-gray-200 dark:border-gray-700"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hero-social border border-gray-200 dark:border-gray-700"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Right content - Profile image or illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3 scale-105 dark:from-blue-600/20 dark:to-purple-600/20"></div>
              <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 dark:border-gray-800 shadow-xl">
                <img 
                  src="/lovable-uploads/63af4e30-199c-4e86-acf9-0c456ce84647.png" 
                  alt="Gaurav Kr Sah" 
                  className="w-full h-auto rounded-3xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold">Gaurav Kr Sah</h3>
                    <p className="text-gray-300 text-sm">Full Stack Developer</p>
                  </div>
                </div>
              </div>
              
              {/* Floating skill badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white animate-bounce">
                React.js
              </div>
              <div className="absolute top-1/3 -left-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white animate-pulse">
                Node.js
              </div>
              <div className="absolute bottom-10 -right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white animate-bounce">
                TypeScript
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-4xl p-1 bg-black border border-gray-800 shadow-2xl">
          <div className="aspect-video w-full">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Introduction Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
