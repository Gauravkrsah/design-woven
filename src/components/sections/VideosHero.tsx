import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import gsap from 'gsap';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const featuredVideos: Video[] = [
  {
    id: '1',
    title: 'How I Built a Real-Time Chat App with React and Firebase',
    description: 'Learn how to create a fully functional chat application with user authentication, real-time messaging, and more.',
    duration: '18:24',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Building Responsive UIs with Tailwind CSS',
    description: 'A step-by-step guide to creating beautiful, responsive user interfaces using Tailwind CSS framework.',
    duration: '14:36',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Advanced TypeScript Patterns for React Applications',
    description: 'Discover advanced TypeScript techniques to make your React code more robust and maintainable.',
    duration: '22:18',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

const VideosHero: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      const videoTitles = sectionRef.current.querySelectorAll('.video-title');
      const videoCards = sectionRef.current.querySelectorAll('.video-card');
      
      gsap.from(videoTitles, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      gsap.from(videoCards, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
      });
    }
  }, []);
  
  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };
  
  const closeVideoModal = () => {
    setIsPlaying(false);
    setSelectedVideo(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-gray-900 dark:text-white video-title"
          >
            Featured <span className="text-gradient">Videos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto video-title"
          >
            Check out my latest tutorials, code walkthroughs, and tech discussions
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredVideos.map((video, index) => (
            <div key={video.id} className="video-card">
              <div 
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md text-white text-xs flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              </div>
              
              <div className="mt-3">
                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">{video.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="/contents"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View all videos <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && closeVideoModal()}>
        <DialogContent className="sm:max-w-4xl p-1 bg-black border border-gray-800 shadow-2xl">
          <div className="aspect-video w-full">
            {selectedVideo && isPlaying && (
              <iframe 
                width="100%" 
                height="100%" 
                src={`${selectedVideo.videoUrl}?autoplay=1`} 
                title={selectedVideo.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/5 dark:bg-blue-600/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-400/5 dark:bg-purple-600/10 rounded-full filter blur-3xl -z-10"></div>
    </section>
  );
};

export default VideosHero;
