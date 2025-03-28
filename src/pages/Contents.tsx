
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight, Search, Youtube, FileText, Headphones, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  "All",
  "Videos",
  "Articles",
  "Podcasts",
  "Resources"
];

const contents = [
  {
    id: "1",
    title: "Building Accessible Web Applications",
    description: "A comprehensive guide to implementing accessibility in modern web applications",
    category: "Articles",
    date: "August 15, 2023",
    icon: FileText,
    link: "https://example.com/accessibility-guide",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "React Performance Optimization Techniques",
    description: "Learn how to make your React applications faster and more efficient",
    category: "Videos",
    date: "July 22, 2023",
    icon: Youtube,
    link: "https://youtube.com/watch?v=example",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    duration: "18:35"
  },
  {
    id: "3",
    title: "The Future of UI/UX Design",
    description: "Discussing emerging trends and technologies shaping the future of design",
    category: "Podcasts",
    date: "June 10, 2023",
    icon: Headphones,
    link: "https://podcasts.example.com/future-of-design",
    imageUrl: "https://images.unsplash.com/photo-1557684459-6f545f2438cf?auto=format&fit=crop&w=800&q=80",
    duration: "42:15"
  },
  {
    id: "4",
    title: "Modern CSS Techniques Every Developer Should Know",
    description: "A deep dive into advanced CSS features that are transforming web development",
    category: "Articles",
    date: "May 28, 2023",
    icon: FileText,
    link: "https://example.com/modern-css",
    imageUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Web Animation Performance Tips",
    description: "How to create smooth, performant animations for web applications",
    category: "Videos",
    date: "April 15, 2023",
    icon: Youtube,
    link: "https://youtube.com/watch?v=example2",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    duration: "22:07"
  },
  {
    id: "6",
    title: "Free UI Component Library",
    description: "A collection of ready-to-use UI components for modern web applications",
    category: "Resources",
    date: "March 10, 2023",
    icon: Globe,
    link: "https://example.com/ui-library",
    imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7",
    title: "Designing for Dark Mode",
    description: "Best practices for implementing effective dark mode in your applications",
    category: "Articles",
    date: "February 22, 2023",
    icon: FileText,
    link: "https://example.com/dark-mode-design",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "8",
    title: "State Management in 2023",
    description: "Comparing modern state management solutions for frontend applications",
    category: "Podcasts",
    date: "January 15, 2023",
    icon: Headphones,
    link: "https://podcasts.example.com/state-management",
    imageUrl: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&w=800&q=80",
    duration: "55:42"
  }
];

const Contents: React.FC = () => {
  useEffect(() => {
    document.title = "Contents | Gaurav Kr Sah";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredContents, setFilteredContents] = useState(contents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter contents based on category and search query
    const filtered = contents.filter(content => {
      const matchesCategory = activeCategory === "All" || content.category === activeCategory;
      const matchesSearch = 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredContents(filtered);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="p-8 max-w-6xl mx-auto">
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}>
              <h1 className="text-3xl font-bold mb-2">Content Library</h1>
              <p className="text-gray-400 mb-8">Articles, videos, podcasts, and resources I've created</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm transition-colors",
                        activeCategory === category 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              
              {filteredContents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContents.map((content, index) => {
                    const Icon = content.icon;
                    
                    return (
                      <div 
                        key={content.id}
                        className={cn(
                          "transition-all duration-700",
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                        )}
                        style={{ transitionDelay: `${index * 100 + 200}ms` }}
                      >
                        <a 
                          href={content.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="glass-card rounded-lg overflow-hidden h-full flex flex-col group">
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={content.imageUrl} 
                                alt={content.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs rounded-full flex items-center">
                                  <Icon className="h-3 w-3 mr-1" />
                                  {content.category}
                                </span>
                              </div>
                              {content.duration && (
                                <div className="absolute bottom-4 right-4">
                                  <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full">
                                    {content.duration}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center text-gray-400 text-sm mb-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                {content.date}
                              </div>
                              <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-blue-400">{content.title}</h3>
                              <p className="text-gray-400 text-sm mb-4 flex-grow">{content.description}</p>
                              <span 
                                className="inline-flex items-center text-blue-500 group-hover:text-blue-400 transition-colors"
                              >
                                View Content <ArrowRight className="ml-2 h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-gray-400">
                    No content matches your current filters. Try adjusting your search or category selection.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </main>
      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Contents;
