
import React, { useEffect } from 'react';
import { Sparkles, ExternalLink, MessageCircle, Menu, X, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useWebSocketStatus, initWebSocket } from '@/lib/services/websocketService';
import { toast } from '@/components/ui/use-toast';

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
      className="block p-2 rounded-lg bg-gray-900/80 dark:bg-gray-900 hover:bg-gray-800 transition-colors mb-2 group"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-white text-xs font-medium mb-1">{title}</h3>
        <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
      </div>
      <p className="text-gray-400 text-xs line-clamp-2">{description}</p>
    </a>
  );
};

const RightSidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const wsConnected = useWebSocketStatus();
  
  const handleChatClick = () => {
    if (typeof window !== 'undefined' && window.openChatPopup) {
      window.openChatPopup();
    }
  };

  const handleReconnectWebSocket = () => {
    toast({
      title: "Reconnecting...",
      description: "Attempting to reconnect to server",
      duration: 2000,
    });
    
    const success = initWebSocket();
    if (!success) {
      setTimeout(() => {
        initWebSocket();
      }, 2000);
    }
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-amber-400 gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">Tools I Made</span>
        </div>
        {isMobile && (
          <button onClick={() => setOpen(false)} className="p-1 rounded-md text-gray-400 hover:bg-gray-800">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
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

      <div className={`mt-4 p-2 rounded-md ${wsConnected ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs ${wsConnected ? 'text-green-500' : 'text-red-500'}`}>
              {wsConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {!wsConnected && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleReconnectWebSocket}
            >
              <RefreshCw className="h-3 w-3 text-gray-400" />
            </Button>
          )}
        </div>
      </div>
    </>
  );

  // For desktop, show the sidebar normally
  if (!isMobile) {
    return (
      <aside className="w-56 h-screen bg-black/90 dark:bg-black border-l border-gray-800 p-4 overflow-auto">
        {sidebarContent}
        
        <div className="fixed bottom-16 right-4 z-10">
          <Button 
            onClick={handleChatClick} 
            size="sm"
            className="h-8 w-8 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg"
            aria-label="Open chat"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </Button>
        </div>
      </aside>
    );
  }

  // For mobile, use a trigger button and sheet (drawer)
  return (
    <>
      <div className="fixed top-[60px] right-3 z-40">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-gray-800 text-white"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open tools menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-black/90 dark:bg-black border-l border-gray-800 p-4">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default RightSidebar;
