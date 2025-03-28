
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MainContent from '@/components/layout/MainContent';
import SubscribePopup from '@/components/ui/SubscribePopup';
import MessagePopup from '@/components/ui/MessagePopup';
import ChatPopup from '@/components/ui/ChatPopup';
import { useIsMobile } from '@/hooks/use-mobile';

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
    window.openMessagePopup = openMessagePopup;
    window.openChatPopup = openChatPopup;
    
    return () => {
      delete window.openMessagePopup;
      delete window.openChatPopup;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <MainContent />
      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
      
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
