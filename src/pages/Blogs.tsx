
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Search } from 'lucide-react';

const blogCategories = [
  "All",
  "Web Development",
  "Design",
  "Machine Learning",
  "Career Advice"
];

const blogs = [
  {
    id: 1,
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring how artificial intelligence is transforming the way we build and interact with websites and web applications',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2023',
    readTime: '5 min read',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Designing for Accessibility: Best Practices',
    excerpt: 'How to create inclusive digital experiences that work for everyone, regardless of ability or disability',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    date: 'May 22, 2023',
    readTime: '7 min read',
    category: 'Design',
  },
  {
    id: 3,
    title: 'The Rise of Web3 Technologies',
    excerpt: 'Understanding the fundamental concepts behind blockchain, cryptocurrencies, and decentralized applications',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    date: 'April 10, 2023',
    readTime: '8 min read',
    category: 'Web Development',
  },
  {
    id: 4,
    title: 'Navigating Your Career in Tech',
    excerpt: 'Strategies for career advancement in the rapidly evolving technology industry based on personal experience',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    date: 'March 05, 2023',
    readTime: '10 min read',
    category: 'Career Advice',
  },
  {
    id: 5,
    title: 'Getting Started with Machine Learning',
    excerpt: 'A beginner-friendly introduction to machine learning concepts, tools, and frameworks',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    date: 'February 18, 2023',
    readTime: '12 min read',
    category: 'Machine Learning',
  },
  {
    id: 6,
    title: 'UI Design Trends to Watch in 2023',
    excerpt: 'Exploring the latest trends in user interface design and how they impact user experience',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    date: 'January 02, 2023',
    readTime: '6 min read',
    category: 'Design',
  },
];

const Blogs: React.FC = () => {
  useEffect(() => {
    document.title = "Blogs | Gaurav Kr Sah";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter by category and search query
    const filtered = blogs.filter(blog => {
      const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredBlogs(filtered);
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
              <h1 className="text-3xl font-bold mb-2">Blog</h1>
              <p className="text-gray-400 mb-8">Insights and thoughts on design, development, and technology</p>
              
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map(category => (
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
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 text-white rounded-md px-4 py-2 pl-10 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute top-2.5 left-3 text-gray-400 w-4 h-4" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <div 
                    key={blog.id}
                    className={cn(
                      "bg-gray-900 rounded-lg overflow-hidden transition-all duration-700 group hover:shadow-lg",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between text-gray-400 text-xs mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{blog.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                        <a href={`/blogs/${blog.id}`} className="text-blue-500 text-sm hover:underline">
                          Read more
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

export default Blogs;
