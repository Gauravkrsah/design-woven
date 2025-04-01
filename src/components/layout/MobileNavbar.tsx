
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FolderKanban, Briefcase, BookOpen, Layers, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';

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
        "flex items-center gap-2 py-2.5 px-3 rounded-md transition-colors hover:bg-gray-800 text-sm",
        active ? "bg-gray-800 text-white" : "text-gray-400"
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
};

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 lg:hidden",
        scrolled 
          ? "bg-white/80 dark:bg-black/80 border-gray-200 dark:border-gray-800" 
          : "bg-white/50 dark:bg-black/50 border-transparent"
      )}
    >
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-gray-100 dark:border-gray-800">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Gaurav Kr Sah</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Developer & Designer</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-white">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900 dark:text-white text-sm">Navigation</h2>
                  <button onClick={() => setOpen(false)} className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <nav className="flex-1 p-4 overflow-y-auto space-y-1.5">
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
                    active={location.pathname === '/projects' || location.pathname.startsWith('/projects/')} 
                    onClick={handleMenuItemClick}
                  />
                  <MenuItem 
                    icon={Briefcase} 
                    label="Other Works" 
                    href="/other-works" 
                    active={location.pathname === '/other-works' || location.pathname.startsWith('/other-works/')} 
                    onClick={handleMenuItemClick}
                  />
                  <MenuItem 
                    icon={BookOpen} 
                    label="Blogs" 
                    href="/blogs" 
                    active={location.pathname === '/blogs' || location.pathname.startsWith('/blogs/')}
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
                
                <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <button 
                    onClick={handleSubscribeClick}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    Subscribe to Newsletter
                  </button>
                  <button 
                    onClick={handleMessageClick}
                    className="w-full bg-transparent border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    Send a Message
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-200 dark:border-gray-800">
                  <a 
                    href="https://github.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://linkedin.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://twitter.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavbar;
