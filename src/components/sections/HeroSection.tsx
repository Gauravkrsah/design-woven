import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Calendar, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
      className="py-16 px-4 relative overflow-hidden"
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
      
      <div className="max-w-5xl mx-auto">
        <div 
          ref={textRef}
          className={cn(
            "transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-400 dark:text-blue-300 px-3 py-1 rounded-full text-sm mb-4 border border-blue-800/50 backdrop-blur-sm hero-badge">
              <span className="animate-pulse h-2 w-2 bg-blue-400 dark:bg-blue-300 rounded-full"></span>
              <span>Full Stack Developer & AI Enthusiast</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight hero-title">
            Crafting Digital Experiences with Code & Creativity
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl hero-subtitle">
            Building cutting-edge applications that combine beautiful design with powerful functionality. 
            Specializing in React, Node.js, and modern web technologies.
          </p>
          
          <div className="flex flex-wrap gap-4 hero-buttons">
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
            <button 
              className="px-6 py-3 bg-transparent border border-gray-700 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2"
              onClick={handleScheduleClick}
            >
              <Calendar className="w-4 h-4" /> Schedule a Call
            </button>
            <button 
              onClick={() => setShowVideo(true)}
              className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 group"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 text-white" fill="white" />
              </div>
              Watch Intro
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap gap-8 justify-start">
            <div className="hero-stats">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">5+</p>
              <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
            </div>
            <div className="hero-stats">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">50+</p>
              <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
            </div>
            <div className="hero-stats">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">30+</p>
              <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-3xl p-1 bg-black border border-gray-800 shadow-2xl">
          <div className="aspect-video w-full">
            {/* Replace this with your actual video component */}
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
