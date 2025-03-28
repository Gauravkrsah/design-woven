
import React from 'react';
import { Clock, ExternalLink, Heart, MessageSquare, Share2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContentCardProps {
  id: string;
  title: string;
  imageUrl: string;
  platform: string;
  duration: string;
  likes?: number;
  comments?: number;
  shares?: number;
  category?: string;
  isVideo?: boolean;
  link: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  imageUrl,
  platform,
  duration,
  likes = 0,
  comments = 0,
  shares = 0,
  category,
  isVideo = false,
  link
}) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors group">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
          {isVideo && (
            <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </div>
          )}
          
          {category && (
            <div className="absolute top-4 left-4 bg-blue-600/80 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">
              {category}
            </div>
          )}
          
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center">
                <Play className="h-6 w-6 text-white ml-1" fill="white" />
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 flex items-center">
            <div className="text-white text-sm font-medium px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm">
              {platform}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white text-base font-medium mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs">{comments}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">{shares}</span>
            </div>
          </div>
          
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:bg-gray-700"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
