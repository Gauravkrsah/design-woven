
import React, { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '@/components/sections/HeroSection';
import Projects from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/SkillsSection';
import RecentBlogs from '@/components/sections/RecentBlogs';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Videos from '@/components/sections/Videos';
import RecentWorks from '@/components/sections/RecentWorks';
import { useToast } from '@/components/ui/use-toast';
import { useWebSocketStatus, initWebSocket } from '@/lib/services/websocketService';

const MainContent: React.FC = () => {
  const { toast } = useToast();
  const wsConnected = useWebSocketStatus();

  useEffect(() => {
    const connectWebSocket = () => {
      if (!wsConnected) {
        const success = initWebSocket();
        if (!success) {
          console.log("WebSocket connection failed, retrying in 3 seconds...");
          setTimeout(connectWebSocket, 3000);
        } else {
          console.log("WebSocket connected successfully");
          // No toast for successful connection to avoid distraction
        }
      }
    };

    connectWebSocket();

    const pingInterval = setInterval(() => {
      if (wsConnected) {
        console.log("Sending ping to keep WebSocket alive");
        const event = new CustomEvent('ws-ping');
        window.dispatchEvent(event);
      } else {
        connectWebSocket();
      }
    }, 30000);

    return () => {
      clearInterval(pingInterval);
    };
  }, [wsConnected]);

  return (
    <main className="flex-1 relative">
      <ScrollArea className="h-screen">
        <div className="px-8 md:px-12 lg:px-16">
          <HeroSection />
          <Videos />
          <SkillsSection />
          <Projects />
          <RecentWorks />
          <RecentBlogs />
          <Contact />
          <Footer />
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
