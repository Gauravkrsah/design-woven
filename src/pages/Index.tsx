
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MainContent from '@/components/layout/MainContent';
import MobileNavbar from '@/components/layout/MobileNavbar';
import SubscribePopup from '@/components/ui/SubscribePopup';
import MessagePopup from '@/components/ui/MessagePopup';
import ChatPopup from '@/components/ui/ChatPopup';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';

const Index: React.FC = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "Gaurav Kr Sah | Portfolio";
    
    // Show subscribe popup after 5 seconds for new visitors
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && !isMobile) {
      const timer = setTimeout(() => {
        setIsSubscribeOpen(true);
        localStorage.setItem('hasVisited', 'true');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Function to handle subscribe button click from anywhere in the app
  const openSubscribePopup = () => {
    setIsSubscribeOpen(true);
  };

  // Function to handle message button click from anywhere in the app
  const openMessagePopup = () => {
    setIsMessageOpen(true);
  };

  // Function to handle chat button click from anywhere in the app
  const openChatPopup = () => {
    setIsChatOpen(true);
  };

  // Make these functions available globally
  React.useEffect(() => {
    window.openSubscribePopup = openSubscribePopup;
    window.openMessagePopup = openMessagePopup;
    window.openChatPopup = openChatPopup;
    
    return () => {
      delete window.openSubscribePopup;
      delete window.openMessagePopup;
      delete window.openChatPopup;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Mobile navbar - only visible on mobile */}
      <MobileNavbar />
      
      <div className="flex flex-1 pt-[72px] lg:pt-0">
        {/* Left sidebar - hidden on mobile */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        
        {/* Main content - always visible */}
        <MainContent />
        
        {/* Right sidebar - hidden on mobile */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
      
      {/* Mobile floating action buttons */}
      {isMobile && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg"
            onClick={openMessagePopup}
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg"
            onClick={openChatPopup}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      {/* Popups */}
      <SubscribePopup 
        open={isSubscribeOpen} 
        onOpenChange={setIsSubscribeOpen} 
      />
      
      <MessagePopup 
        open={isMessageOpen} 
        onOpenChange={setIsMessageOpen} 
      />
      
      <ChatPopup 
        open={isChatOpen} 
        onOpenChange={setIsChatOpen} 
      />
    </div>
  );
};

export default Index;
