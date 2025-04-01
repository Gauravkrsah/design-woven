
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from '../sections/HeroSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';
import Projects from '../sections/Projects';
import RecentWorks from '../sections/RecentWorks';
import RecentBlogs from '../sections/RecentBlogs';
import VideosHero from '../sections/VideosHero';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Code, ExternalLink, Star, Users, Zap } from 'lucide-react';
import ContentCard from '../ui/ContentCard';
import { Button } from '../ui/button';

const featuredContent = [
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
  }
];

// Stats for the numbers section
const stats = [
  { icon: <Code className="h-5 w-5 text-blue-500" />, value: "500+", label: "Projects Completed", description: "Across various industries and technologies" },
  { icon: <Users className="h-5 w-5 text-purple-500" />, value: "150+", label: "Happy Clients", description: "From startups to enterprise companies" },
  { icon: <Award className="h-5 w-5 text-amber-500" />, value: "12+", label: "Years Experience", description: "In software development and design" },
  { icon: <Star className="h-5 w-5 text-green-500" />, value: "30+", label: "Technologies", description: "Mastered and implemented in projects" },
];

// Timeline items for the journey section
const timeline = [
  { 
    year: "2022-Present", 
    title: "Senior Full-Stack Developer", 
    company: "TechInnovate Solutions", 
    description: "Leading development of enterprise-scale applications and mentoring junior developers."
  },
  { 
    year: "2019-2022", 
    title: "Frontend Developer", 
    company: "Digital Crafters", 
    description: "Specialized in React ecosystem and modern UI/UX implementations."
  },
  { 
    year: "2016-2019", 
    title: "Web Developer", 
    company: "CreativeWeb Agency", 
    description: "Built responsive websites and web applications for clients across industries."
  },
  { 
    year: "2012-2016", 
    title: "Freelance Developer", 
    company: "Self-employed", 
    description: "Worked on various projects while completing education in Computer Science."
  },
];

const MainContent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  
  // Initialize visibility state
  useEffect(() => {
    setIsVisible(true);
    
    // Add floating particles animation
    const container = document.querySelector('.main-background');
    if (container) {
      // Clear existing particles when theme changes
      container.innerHTML = '';
      
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`;
        
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        container.appendChild(particle);
      }
    }
    
    // Add global float animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-15px) translateX(5px); }
        50% { transform: translateY(-5px) translateX(-5px); }
        75% { transform: translateY(-10px) translateX(10px); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [theme]);

  // Animation variants for scroll animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <main className="flex-1 bg-gray-50 dark:bg-black overflow-hidden relative">
      {/* Animated background */}
      <div className="main-background absolute inset-0 overflow-hidden pointer-events-none -z-10"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 dark:from-blue-600/20 via-transparent to-transparent -z-10 pointer-events-none"></div>
      
      <ScrollArea className="h-screen">
        <div className="space-y-24 pb-20">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Journey Timeline Section */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                My Professional <span className="text-blue-600 dark:text-blue-400">Journey</span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A timeline of my career path and key milestones that shaped my expertise
              </motion.p>
            </div>
            
            <motion.div 
              className="relative"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Timeline line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 transform -translate-x-1/2 hidden md:block"></div>
              
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-4 mb-12 relative ${
                    index % 2 === 0 ? 'md:flex-row-reverse text-right' : 'text-left'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[50%] w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 transform -translate-x-1/2 z-10 hidden md:block"></div>
                  
                  {/* Year badge */}
                  <div className="md:w-1/2 flex md:justify-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full px-4 py-1 text-sm font-medium inline-block">
                      {item.year}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{item.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          
          {/* Stats Numbers Section */}
          <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-100 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="text-center mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Numbers <span className="text-blue-600 dark:text-blue-400">Speak</span></h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A snapshot of my professional achievements and impact</p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{stat.label}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
            {/* Services Section (what I do) */}
            <section>
              <motion.div 
                className="text-center mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What I <span className="text-blue-600 dark:text-blue-400">Do</span></h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Specialized services I offer to help businesses succeed in the digital world</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                    <Zap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Web Development</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Creating responsive, high-performance websites and web applications with modern technologies.</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></div>
                      React & Next.js Applications
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></div>
                      E-commerce Solutions
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></div>
                      Progressive Web Apps
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                    <Code className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Backend Development</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Building robust, scalable backend systems and APIs to power your applications.</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mr-2"></div>
                      Node.js & Express
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mr-2"></div>
                      Database Design
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mr-2"></div>
                      RESTful & GraphQL APIs
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-6">
                    <ExternalLink className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Digital Consulting</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Strategic guidance for digital transformation and technology implementation.</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mr-2"></div>
                      Technical Architecture
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mr-2"></div>
                      Code Reviews & Audits
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mr-2"></div>
                      Performance Optimization
                    </li>
                  </ul>
                </motion.div>
              </div>
            </section>
            
            {/* Skills and Experience Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <SkillsSection />
              <ExperienceSection />
            </div>
            
            {/* Projects Section */}
            <Projects />
            
            {/* Videos Hero Section */}
            <VideosHero />
            
            {/* Recent Works Section */}
            <RecentWorks />
            
            {/* Recent Blogs Section */}
            <RecentBlogs />
            
            {/* Featured Content */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Featured Content</h2>
                  <p className="text-gray-600 dark:text-gray-400">Videos, tutorials and courses to help you learn</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="ghost"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors group"
                    asChild
                  >
                    <a href="/contents" className="flex items-center gap-1">
                      View All
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {featuredContent.map((content, index) => (
                  <motion.div
                    key={content.id}
                    variants={scaleIn}
                    transition={{ delay: index * 0.1 }}
                    className="transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <ContentCard {...content} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </div>
          
          {/* Call to Action Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 -z-10"></div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 -z-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"></rect>
              </svg>
            </div>
            
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to bring your ideas to life?
              </motion.h2>
              <motion.p 
                className="text-blue-100 mb-8 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Let's collaborate on your next project and create something amazing together.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => {
                    if (window.openMessagePopup) {
                      window.openMessagePopup();
                    }
                  }}
                >
                  Get in Touch
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    if (window.openSchedulePopup) {
                      window.openSchedulePopup();
                    }
                  }}
                >
                  Schedule a Call
                </Button>
              </motion.div>
            </div>
          </section>
          
          {/* Footer */}
          <div className="py-8 border-t border-gray-200 dark:border-gray-800 text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">© {new Date().getFullYear()} Gaurav Kr Sah. All rights reserved.</p>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default MainContent;
