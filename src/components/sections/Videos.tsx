
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Play } from 'lucide-react';
import { getFeaturedVideos } from '@/lib/services/firebaseService';
import { Content } from '@/lib/models';
import { useQuery } from '@tanstack/react-query';

const Videos: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['featuredVideos'],
    queryFn: getFeaturedVideos
  });
  
  if (isLoading) {
    return (
      <section id="videos" className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-4 w-4 bg-red-500 rounded-full"></span>
                <h2 className="text-2xl font-bold tracking-tight text-white">Latest Videos</h2>
              </div>
              <p className="text-gray-400">Educational content and tech insights</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[1, 2].map((index) => (
              <div key={index} className="bg-[#111] rounded-xl overflow-hidden border border-gray-800 h-full animate-pulse">
                <div className="aspect-video bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-800 rounded-md mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded-md w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      id="videos" 
      className="py-20 bg-black"
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(el);
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-4 w-4 bg-red-500 rounded-full"></span>
              <h2 
                className={cn(
                  "text-2xl font-bold tracking-tight text-white transition-all duration-700",
                  isVisible ? "opacity-100" : "opacity-0 translate-y-4"
                )}
              >
                Latest Videos
              </h2>
            </div>
            <p 
              className={cn(
                "text-gray-400 transition-all duration-700 delay-100",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}
            >
              Educational content and tech insights
            </p>
          </div>
          
          <a 
            href="#" 
            className={cn(
              "text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            View all videos <ArrowRight className="h-3 w-3" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {videos && videos.length > 0 ? (
            videos.map((video, index) => (
              <a 
                href={video.link} 
                key={video.id}
                className={cn(
                  "transition-all duration-700 group",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800 h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={video.thumbnailUrl || video.imageUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
                      New Video
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      {video.title}
                    </h3>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span>{video.views || '0'} views</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-400">No videos available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Videos;
