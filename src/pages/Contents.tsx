
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileNavbar from '@/components/layout/MobileNavbar';
import ContentCard from '@/components/ui/ContentCard';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

const categories = [
  "All",
  "Videos",
  "Articles",
  "Podcasts",
  "Tutorials",
  "Courses"
];

const contentItems = [
  {
    id: "1",
    title: "Building a Full-Stack App with React and Node.js",
    imageUrl: "/lovable-uploads/63af4e30-199c-4e86-acf9-0c456ce84647.png",
    platform: "YouTube",
    duration: "32:15",
    likes: 1245,
    comments: 83,
    shares: 41,
    category: "Video Tutorial",
    isVideo: true,
    link: "https://youtube.com/example"
  },
  {
    id: "2",
    title: "Designing Modern UIs with Figma",
    imageUrl: "/lovable-uploads/71ebdfd0-b894-428b-8b13-23379499b18b.png",
    platform: "Udemy",
    duration: "45:22",
    likes: 876,
    comments: 65,
    shares: 32,
    category: "Masterclass",
    isVideo: true,
    link: "https://udemy.com/example"
  },
  {
    id: "3",
    title: "Advanced TypeScript Patterns for React",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
    platform: "YouTube",
    duration: "28:17",
    likes: 932,
    comments: 47,
    shares: 28,
    category: "Code Walkthrough",
    isVideo: true,
    link: "https://youtube.com/example"
  },
  {
    id: "4",
    title: "Introduction to Machine Learning",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    platform: "Skillshare",
    duration: "1:15:08",
    likes: 1529,
    comments: 104,
    shares: 89,
    category: "Workshop",
    isVideo: true,
    link: "https://skillshare.com/example"
  },
  {
    id: "5",
    title: "The Future of UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=800&q=80",
    platform: "Medium",
    duration: "8 min read",
    likes: 432,
    comments: 19,
    shares: 37,
    category: "Article",
    isVideo: false,
    link: "https://medium.com/example"
  },
  {
    id: "6",
    title: "Mastering CSS Grid Layout",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    platform: "YouTube",
    duration: "41:23",
    likes: 721,
    comments: 53,
    shares: 42,
    category: "Tutorial",
    isVideo: true,
    link: "https://youtube.com/example"
  },
  {
    id: "7",
    title: "Implementing Authentication in React Apps",
    imageUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=800&q=80",
    platform: "DEV",
    duration: "12 min read",
    likes: 347,
    comments: 28,
    shares: 19,
    category: "Article",
    isVideo: false,
    link: "https://dev.to/example"
  },
  {
    id: "8",
    title: "State Management in 2023",
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    platform: "Spotify",
    duration: "55:42",
    likes: 183,
    comments: 21,
    shares: 14,
    category: "Podcast",
    isVideo: true,
    link: "https://spotify.com/example"
  }
];

const Contents: React.FC = () => {
  useEffect(() => {
    document.title = "Content Feed | Gaurav Kr Sah";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredContents, setFilteredContents] = useState(contentItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter contents based on category and search query
    const filtered = contentItems.filter(content => {
      const matchesCategory = activeCategory === "All" || content.category.includes(activeCategory);
      const matchesSearch = 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.platform.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredContents(filtered);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile navbar - only visible on mobile */}
      <MobileNavbar />
      
      <div className="flex flex-1 pt-[72px] lg:pt-0">
        {/* Left sidebar - hidden on mobile */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        
        {/* Main content - always visible */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-screen">
            <div className="p-6 lg:p-8 max-w-6xl mx-auto">
              <div className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}>
                <h1 className="text-3xl font-bold mb-2">Content Feed</h1>
                <p className="text-gray-400 mb-8">Videos, articles, podcasts, and tutorials I've created</p>
                
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
                    {filteredContents.map((content, index) => (
                      <div 
                        key={content.id}
                        className={cn(
                          "transition-all duration-700",
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                        )}
                        style={{ transitionDelay: `${index * 100 + 200}ms` }}
                      >
                        <ContentCard {...content} />
                      </div>
                    ))}
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
        
        {/* Right sidebar - hidden on mobile */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Contents;
