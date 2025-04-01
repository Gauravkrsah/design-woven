
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, FolderKanban, Briefcase, BookOpen, Layers, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const handleSubscribeClick = () => {
    if (window.openSubscribePopup) {
      window.openSubscribePopup();
    }
    closeMenu();
  };
  
  const handleMessageClick = () => {
    if (window.openMessagePopup) {
      window.openMessagePopup();
    }
    closeMenu();
  };

  return (
    <>
      {/* Fixed top navigation */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50 lg:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
              <span className="text-white text-lg font-bold">G</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">Gaurav Kr Sah</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Developer & Designer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-gray-700 dark:text-gray-300"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-16 transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 h-full overflow-auto">
          <nav className="mb-8">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 ml-3">Navigation</p>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <FolderKanban className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/other-works" 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Other Works</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/blogs" 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Blogs</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contents" 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Contents</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacts" 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 ml-3">Actions</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                onClick={handleMessageClick}
              >
                Message Me
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleSubscribeClick}
              >
                Subscribe
              </Button>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 ml-3">Social</p>
            <div className="flex gap-3 ml-3">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-auto py-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">© {new Date().getFullYear()} Gaurav Kr Sah</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
