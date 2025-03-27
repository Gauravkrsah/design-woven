
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderKanban, Briefcase, BookOpen, Layers, Mail, Youtube, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const MenuItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false 
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string;
  active?: boolean;
}) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex items-center gap-3 py-3 px-4 rounded-md transition-colors hover:bg-gray-800 text-sm",
        active ? "bg-gray-800 text-white" : "text-gray-400"
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
};

const ProfileSection = () => {
  return (
    <div className="p-6 border-b border-gray-800">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-gray-700">
          <span className="text-white text-2xl font-bold">G</span>
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Gaurav Kr Sah</h2>
          <p className="text-gray-400 text-sm">Designing</p>
          <p className="text-gray-400 text-sm">Developing and</p>
          <p className="text-gray-400 text-sm">Marketing</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-2 text-sm transition-colors">
          Subscribe
        </button>
        <button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-2 text-sm transition-colors">
          Message
        </button>
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

const LeftSidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 h-screen bg-black border-r border-gray-800 flex flex-col overflow-hidden">
      <ProfileSection />
      
      <nav className="flex-1 py-6 overflow-y-auto">
        <MenuItem 
          icon={Home} 
          label="Home" 
          href="/" 
          active={location.pathname === '/'} 
        />
        <MenuItem 
          icon={FolderKanban} 
          label="Projects" 
          href="/projects" 
          active={location.pathname === '/projects'} 
        />
        <MenuItem 
          icon={Briefcase} 
          label="Other Works" 
          href="/other-works" 
          active={location.pathname === '/other-works'} 
        />
        <MenuItem 
          icon={BookOpen} 
          label="Blogs" 
          href="/blogs" 
          active={location.pathname === '/blogs'} 
        />
        <MenuItem 
          icon={Layers} 
          label="Contents" 
          href="/contents" 
          active={location.pathname === '/contents'} 
        />
        <MenuItem 
          icon={Mail} 
          label="Contacts" 
          href="/contacts" 
          active={location.pathname === '/contacts'} 
        />
      </nav>
      
      <SocialIcons />
    </aside>
  );
};

export default LeftSidebar;
