
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
import Videos from '@/components/sections/Videos';
import Education from '@/components/sections/Education';

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "Gaurav Kr Sah | Portfolio";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Experience />
          <Education />
        </div>
        <Projects />
        <Blog />
        <Videos />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
