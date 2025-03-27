
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "Gaurav Kr Sah | Portfolio";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
