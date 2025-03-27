
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FolderKanban, Briefcase, BookOpen, Layers, Mail, Youtube, MessageCircle } from 'lucide-react';
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
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border-2 border-gray-700">
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
        <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-md px-4 py-2 text-sm">
          Subscribe
        </button>
        <button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-2 text-sm">
          Message
        </button>
      </div>
    </div>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-auto p-4 border-t border-gray-800">
      <button className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white">
        <Youtube className="w-5 h-5" />
      </button>
      <button className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white">
        <Mail className="w-5 h-5" />
      </button>
      <button className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white">
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-64 min-h-screen bg-black border-r border-gray-800 flex flex-col overflow-hidden">
      <ProfileSection />
      
      <nav className="flex-1 py-6">
        <MenuItem icon={Home} label="Home" href="/" active={true} />
        <MenuItem icon={FolderKanban} label="Projects" href="/projects" />
        <MenuItem icon={Briefcase} label="Other Works" href="/other-works" />
        <MenuItem icon={BookOpen} label="Blogs" href="/blogs" />
        <MenuItem icon={Layers} label="Contents" href="/contents" />
        <MenuItem icon={Mail} label="Contacts" href="/contacts" />
      </nav>
      
      <SocialIcons />
    </aside>
  );
};

export default LeftSidebar;
