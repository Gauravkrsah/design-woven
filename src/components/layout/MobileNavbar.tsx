
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FolderKanban, Briefcase, BookOpen, Layers, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const MenuItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false,
  onClick
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link 
      to={href} 
      onClick={onClick}
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

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const handleSubscribeClick = () => {
    if (typeof window !== 'undefined' && window.openSubscribePopup) {
      window.openSubscribePopup();
    }
    setOpen(false);
  };
  
  const handleMessageClick = () => {
    if (typeof window !== 'undefined' && window.openMessagePopup) {
      window.openMessagePopup();
    }
    setOpen(false);
  };
  
  const handleMenuItemClick = () => {
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800 lg:hidden">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-gray-700">
            <span className="text-white text-lg font-bold">G</span>
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Gaurav Kr Sah</h2>
            <p className="text-gray-400 text-xs">Developer & Designer</p>
          </div>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md bg-gray-800 text-white">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-black border-l border-gray-800 p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h2 className="font-bold text-white">Menu</h2>
                <button onClick={() => setOpen(false)} className="p-1 rounded-md text-gray-400 hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="flex-1 py-4 overflow-y-auto">
                <MenuItem 
                  icon={Home} 
                  label="Home" 
                  href="/" 
                  active={location.pathname === '/'} 
                  onClick={handleMenuItemClick}
                />
                <MenuItem 
                  icon={FolderKanban} 
                  label="Projects" 
                  href="/projects" 
                  active={location.pathname === '/projects'} 
                  onClick={handleMenuItemClick}
                />
                <MenuItem 
                  icon={Briefcase} 
                  label="Other Works" 
                  href="/other-works" 
                  active={location.pathname === '/other-works'} 
                  onClick={handleMenuItemClick}
                />
                <MenuItem 
                  icon={BookOpen} 
                  label="Blogs" 
                  href="/blogs" 
                  active={location.pathname === '/blogs'} 
                  onClick={handleMenuItemClick}
                />
                <MenuItem 
                  icon={Layers} 
                  label="Contents" 
                  href="/contents" 
                  active={location.pathname === '/contents'} 
                  onClick={handleMenuItemClick}
                />
                <MenuItem 
                  icon={Mail} 
                  label="Contacts" 
                  href="/contacts" 
                  active={location.pathname === '/contacts'} 
                  onClick={handleMenuItemClick}
                />
              </nav>
              
              <div className="mt-auto p-4 border-t border-gray-800 space-y-3">
                <button 
                  onClick={handleSubscribeClick}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-2 text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe to Newsletter
                </button>
                <button 
                  onClick={handleMessageClick}
                  className="w-full bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-2 text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Send a Message
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-800">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavbar;
