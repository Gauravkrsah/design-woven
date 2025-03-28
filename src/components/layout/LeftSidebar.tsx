import React from 'react';
import { Github, Linkedin, Twitter, Users, Bell, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileSection = () => {
  const handleSubscribeClick = () => {
    if (typeof window !== 'undefined' && window.openSubscribePopup) {
      window.openSubscribePopup();
    }
  };
  
  const handleMessageClick = () => {
    if (typeof window !== 'undefined' && window.openMessagePopup) {
      window.openMessagePopup();
    }
  };

  return (
    <div className="p-6 border-b border-gray-800">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-gray-700">
          <span className="text-white text-2xl font-bold">G</span>
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Gaurav Kr Sah</h2>
          <p className="text-gray-400 text-sm">Designing • Developing</p>
          <p className="text-gray-400 text-sm">& Marketing</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button 
          onClick={handleSubscribeClick}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium"
        >
          <Bell className="mr-2 h-4 w-4" />
          Subscribe
        </Button>
        <Button 
          onClick={handleMessageClick}
          variant="outline" 
          className="w-full border-gray-700 hover:bg-gray-800 text-white"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Message
        </Button>
      </div>
    </div>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-auto p-4 border-t border-gray-800">
      <a 
        href="https://github.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Github className="w-5 h-5" />
      </a>
      <a 
        href="https://linkedin.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a 
        href="https://twitter.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </a>
    </div>
  );
};

const UpcomingEvents = () => {
  return (
    <div className="p-6 border-t border-gray-800">
      <div className="flex items-center text-blue-400 gap-2 mb-4">
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">Upcoming Events</span>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="text-xs text-blue-400 mb-1">WEBINAR • OCT 15</div>
          <h4 className="text-sm text-white mb-1">Modern React Architecture</h4>
          <p className="text-xs text-gray-400">Join me for a live session on building scalable React applications</p>
        </div>
        
        <div className="p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="text-xs text-blue-400 mb-1">WORKSHOP • NOV 5</div>
          <h4 className="text-sm text-white mb-1">AI in Frontend Development</h4>
          <p className="text-xs text-gray-400">A hands-on workshop exploring AI integration in modern web apps</p>
        </div>
      </div>
    </div>
  );
};

const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-black border-r border-gray-800 flex flex-col overflow-hidden">
      <ProfileSection />
      <UpcomingEvents />
      <SocialIcons />
    </aside>
  );
};

export default LeftSidebar;
