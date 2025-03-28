
import React from 'react';
import { Sparkles, ExternalLink, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ToolCard = ({ 
  title, 
  description,
  link,
}: { 
  title: string; 
  description: string;
  link: string;
}) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors mb-2 group"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-white text-sm font-medium mb-1">{title}</h3>
        <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
      </div>
      <p className="text-gray-400 text-xs line-clamp-2">{description}</p>
    </a>
  );
};

const RightSidebar: React.FC = () => {
  const isMobile = useIsMobile();
  
  const handleChatClick = () => {
    if (typeof window !== 'undefined' && window.openChatPopup) {
      window.openChatPopup();
    }
  };

  return (
    <aside className="w-56 h-screen bg-black border-l border-gray-800 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-amber-400 gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">Tools I Made</span>
        </div>
      </div>

      <div className="space-y-4">
        <ToolCard 
          title="AI Interview Questions"
          description="Smart tool that generates role-specific interview questions for candidates"
          link="https://ai-interview-questions.example.com"
        />
        
        <ToolCard 
          title="Job Description Generator"
          description="Automated tool that creates professional job descriptions from simple inputs"
          link="https://jd-generator.example.com"
        />

        <ToolCard 
          title="Developer Roadmap"
          description="Interactive roadmap to help developers navigate their learning journey"
          link="https://dev-roadmap.example.com"
        />

        <ToolCard 
          title="Code Snippet Library"
          description="Collection of reusable code snippets for common programming tasks"
          link="https://snippets.example.com"
        />
      </div>

      {!isMobile && (
        <div className="fixed bottom-4 right-4 z-10">
          <button 
            onClick={handleChatClick} 
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;
