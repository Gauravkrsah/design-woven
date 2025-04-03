
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Calendar, Play, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import AnimatedText from '../ui/AnimatedText';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    setIsVisible(true);
    
    if (heroRef.current) {
      // Background animation
      const dots = Array.from({ length: 30 }).map((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'absolute rounded-full opacity-0';
        dot.style.width = `${Math.random() * 3 + 1}px`;
        dot.style.height = dot.style.width;
        dot.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        heroRef.current?.appendChild(dot);
        return dot;
      });
      
      gsap.to(dots, {
        opacity: 0.5,
        duration: 2,
        delay: 0.5,
        stagger: 0.02,
        ease: 'power2.out'
      });
      
      gsap.to(dots, {
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: 'sine.inOut'
      });
      
      // Hero content animations
      const tl = gsap.timeline();
      
      tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      })
      .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.2")
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.4")
      .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, "-=0.4")
      .from('.hero-stats', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, "-=0.4")
      .from('.hero-video', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=1");
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
      className="py-16 md:py-24 px-6 md:px-12 lg:px-16 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 dark:from-blue-900/10 to-transparent rounded-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-6 transition-all duration-1000 ease-out">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-900/10 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm mb-4 border border-blue-500/20 backdrop-blur-sm hero-badge">
                <span className="animate-pulse h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                <span>Full Stack Developer & AI Enthusiast</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight hero-title">
              <AnimatedText 
                text="Crafting Digital" 
                className="block" 
                speed={30}
              />
              <AnimatedText 
                text="Experiences with" 
                className="block" 
                speed={30}
              />
              <AnimatedText 
                text="Code & Creativity" 
                className="block text-blue-600 dark:text-blue-400" 
                speed={30}
              />
            </h1>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-2xl hero-subtitle leading-relaxed">
              Building cutting-edge applications that combine beautiful design with powerful functionality. 
              Specializing in React, Node.js, and modern web technologies.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="px-6 py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-500/30 h-12 hero-buttons"
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
                className="px-6 py-6 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 h-12 hero-buttons"
                onClick={handleScheduleClick}
              >
                <Calendar className="w-4 h-4" /> Schedule a Call
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setShowVideo(true)}
                className="px-6 py-6 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 group h-12 hero-buttons"
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
          </div>
          
          {/* Right content - Video */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-md relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl hero-video">
              <div className="aspect-video relative">
                <img 
                  src="/lovable-uploads/a9ea1072-fb78-4113-93a5-3d8b22ce7d7d.png" 
                  alt="Featured skills" 
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowVideo(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
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
