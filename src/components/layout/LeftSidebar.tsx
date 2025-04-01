
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Twitter, Home, FolderKanban, Briefcase, BookOpen, Layers, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

const NavItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false 
}: { 
  icon: React.ElementType, 
  label: string, 
  href: string,
  active?: boolean 
}) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex items-center gap-2 py-2 px-3 rounded-md transition-all hover:bg-gray-800 text-sm group",
        active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400")} />
      <span>{label}</span>
    </Link>
  );
};

const LeftSidebar: React.FC = () => {
  const location = useLocation();
  
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
    <aside className="w-56 h-screen bg-black border-r border-gray-800 p-4 overflow-auto">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-gray-700">
            <span className="text-white text-lg font-bold">G</span>
          </div>
          <div>
            <h2 className="font-bold text-white">Gaurav Kr Sah</h2>
            <p className="text-gray-400 text-xs">Developer & Designer</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            size="sm"
            className="h-8 text-xs bg-blue-600 hover:bg-blue-500"
            onClick={handleSubscribeClick}
          >
            Subscribe
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs border-gray-700 hover:bg-gray-800 hover:text-white"
            onClick={handleMessageClick}
          >
            Message
          </Button>
          
          <ThemeToggle />
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-medium uppercase text-gray-500 mb-2 px-3">Navigation</p>
          <nav className="space-y-1">
            <NavItem 
              icon={Home} 
              label="Home" 
              href="/" 
              active={location.pathname === '/'} 
            />
            <NavItem 
              icon={FolderKanban} 
              label="Projects" 
              href="/projects" 
              active={location.pathname === '/projects' || location.pathname.startsWith('/projects/')} 
            />
            <NavItem 
              icon={Briefcase} 
              label="Other Works" 
              href="/other-works" 
              active={location.pathname === '/other-works' || location.pathname.startsWith('/other-works/')} 
            />
            <NavItem 
              icon={BookOpen} 
              label="Blogs" 
              href="/blogs" 
              active={location.pathname === '/blogs' || location.pathname.startsWith('/blogs/')} 
            />
            <NavItem 
              icon={Layers} 
              label="Contents" 
              href="/contents" 
              active={location.pathname === '/contents'} 
            />
            <NavItem 
              icon={Mail} 
              label="Contact" 
              href="/contacts" 
              active={location.pathname === '/contacts'} 
            />
          </nav>
        </div>
        
        <div className="mb-4 mt-4">
          <p className="text-xs font-medium uppercase text-gray-500 mb-2 px-3">Admin</p>
          <nav className="space-y-1">
            <NavItem 
              icon={User} 
              label="Dashboard" 
              href="/admin" 
              active={location.pathname === '/admin'} 
            />
          </nav>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-center gap-2">
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
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
