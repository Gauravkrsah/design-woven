
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Twitter, Users, Bell, MessageCircle, Home, FolderKanban, BookOpen, Layers, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavItem = ({ icon: Icon, label, to, active }: { icon: React.ElementType, label: string, to: string, active: boolean }) => (
  <Link to={to} className={cn(
    "flex items-center gap-3 py-2 px-3 rounded-md text-sm transition-colors",
    active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
  )}>
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </Link>
);

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
    <div className="p-4 border-b border-gray-800">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-gray-700">
          <span className="text-white text-lg font-bold">G</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-white text-base">Gaurav Kr Sah</h2>
          <p className="text-gray-400 text-xs">Developer & Designer</p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button 
          onClick={handleSubscribeClick}
          className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white"
        >
          <Bell className="mr-1 h-3 w-3" />
          Subscribe
        </Button>
        <Button 
          onClick={handleMessageClick}
          variant="outline" 
          className="flex-1 h-8 text-xs border-gray-700 hover:bg-gray-800 text-white"
        >
          <MessageCircle className="mr-1 h-3 w-3" />
          Message
        </Button>
      </div>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="p-4 border-b border-gray-800">
      <h3 className="text-xs font-medium text-gray-500 uppercase mb-3 px-1">Navigation</h3>
      <nav className="space-y-1">
        <NavItem icon={Home} label="Home" to="/" active={path === '/'} />
        <NavItem icon={FolderKanban} label="Projects" to="/projects" active={path === '/projects' || path.startsWith('/projects/')} />
        <NavItem icon={Layers} label="Other Works" to="/other-works" active={path === '/other-works' || path.startsWith('/other-works/')} />
        <NavItem icon={BookOpen} label="Blogs" to="/blogs" active={path === '/blogs' || path.startsWith('/blogs/')} />
        <NavItem icon={Users} label="Contents" to="/contents" active={path === '/contents'} />
        <NavItem icon={Mail} label="Contact" to="/contacts" active={path === '/contacts'} />
      </nav>
    </div>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-3 mt-auto p-4 border-t border-gray-800">
      <a 
        href="https://github.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Github className="w-4 h-4" />
      </a>
      <a 
        href="https://linkedin.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a 
        href="https://twitter.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </a>
    </div>
  );
};

const UpcomingEvents = () => {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center text-blue-400 gap-2 mb-3">
        <Users className="w-3 h-3" />
        <span className="text-xs font-medium">Upcoming Events</span>
      </div>
      
      <div className="space-y-2">
        <div className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="text-xs text-blue-400 mb-1">WEBINAR • OCT 15</div>
          <h4 className="text-xs text-white mb-1">Modern React Architecture</h4>
          <p className="text-xs text-gray-400 line-clamp-2">Join me for a live session</p>
        </div>
        
        <div className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="text-xs text-blue-400 mb-1">WORKSHOP • NOV 5</div>
          <h4 className="text-xs text-white mb-1">AI in Frontend Development</h4>
          <p className="text-xs text-gray-400 line-clamp-2">A hands-on workshop</p>
        </div>
      </div>
    </div>
  );
};

const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-56 h-screen bg-black border-r border-gray-800 flex flex-col overflow-hidden">
      <ProfileSection />
      <Navigation />
      <UpcomingEvents />
      <SocialIcons />
    </aside>
  );
};

export default LeftSidebar;
