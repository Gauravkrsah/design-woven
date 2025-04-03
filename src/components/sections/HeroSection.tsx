
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Play, Mail } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-900/10 dark:to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2"></span>
              <span>Full Stack Developer & AI Enthusiast</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="block">Crafting Digital</span>
              <span className="block">Experiences with</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Precision & Innovation</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Building innovative web applications with modern technologies. 
              Specialized in React, TypeScript, and full-stack development with a focus on 
              creating exceptional user experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="px-6 py-6 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                onClick={handleContactClick}
              >
                <Mail className="w-4 h-4" /> Contact Me <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              
              <Button 
                variant="outline"
                className="px-6 py-6 h-12 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
                onClick={handleScheduleClick}
              >
                <Calendar className="w-4 h-4" /> Schedule a Call
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800 mt-6">
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
          </motion.div>
          
          {/* Video showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="aspect-video">
                <img 
                  src="/lovable-uploads/a9ea1072-fb78-4113-93a5-3d8b22ce7d7d.png" 
                  alt="Featured work" 
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowVideo(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                  <button 
                    onClick={() => setShowVideo(true)}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="h-6 w-6 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-4xl p-0 bg-black border-none">
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
