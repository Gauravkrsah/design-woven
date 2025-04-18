
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MainContent from '@/components/layout/MainContent';
import MobileNavbar from '@/components/layout/MobileNavbar';
import SubscribePopup from '@/components/ui/SubscribePopup';
import MessagePopup from '@/components/ui/MessagePopup';
import ChatPopup from '@/components/ui/ChatPopup';
import SchedulePopup from '@/components/ui/SchedulePopup';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Calendar } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setQueryClientForAPI } from '@/lib/services/apiService';
import { initializeDatabase } from '@/lib/services/firebaseService';
import { ThemeProvider } from '@/hooks/use-theme';

// Global popup states are managed through window object
// Each page can trigger these popups
declare global {
  interface Window {
    openSubscribePopup?: () => void;
    openMessagePopup?: () => void;
    openChatPopup?: () => void;
    openSchedulePopup?: () => void;
  }
}

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const Index: React.FC = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "Portfolio | Full Stack Developer & AI Enthusiast";
    
    // Initialize query client for API service
    setQueryClientForAPI(queryClient);
    
    // Initialize Firebase database
    initializeDatabase().then(success => {
      if (success) {
        console.log("Firebase database initialized successfully");
      } else {
        console.error("Failed to initialize Firebase database");
      }
    });
    
    // Show subscribe popup after 5 seconds for new visitors
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && !isMobile && typeof window !== 'undefined') {
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

  // Function to handle schedule button click from anywhere in the app
  const openSchedulePopup = () => {
    setIsScheduleOpen(true);
  };

  // Make these functions available globally
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.openSubscribePopup = openSubscribePopup;
      window.openMessagePopup = openMessagePopup;
      window.openChatPopup = openChatPopup;
      window.openSchedulePopup = openSchedulePopup;
      
      return () => {
        delete window.openSubscribePopup;
        delete window.openMessagePopup;
        delete window.openChatPopup;
        delete window.openSchedulePopup;
      };
    }
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          {/* Mobile navbar - only visible on mobile */}
          <MobileNavbar />
          
          <div className="flex flex-1 pt-[60px] lg:pt-0">
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
            <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2">
              <Button 
                size="icon" 
                className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg"
                onClick={openMessagePopup}
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg"
                onClick={openChatPopup}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg"
                onClick={openSchedulePopup}
              >
                <Calendar className="h-4 w-4" />
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

          <SchedulePopup
            open={isScheduleOpen}
            onOpenChange={setIsScheduleOpen}
          />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Index;
