import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
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
      className="block p-4 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors mb-4 group"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </a>
  );
};

const RightSidebar: React.FC = () => {
  const isMobile = useIsMobile();
  
  const handleChatClick = () => {
    if (window.openChatPopup) {
      window.openChatPopup();
    }
  };

  return (
    <aside className="w-72 h-screen bg-black border-l border-gray-800 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-amber-400 gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Tools I Made</span>
        </div>
      </div>

      <div className="space-y-6">
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
        <div className="fixed bottom-6 right-6 z-10">
          <button 
            onClick={handleChatClick} 
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;
