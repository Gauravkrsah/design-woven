
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Lightbulb, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Code className="h-6 w-6 text-blue-500" />,
      title: "Clean Code",
      description: "I write maintainable, scalable, and well-documented code following best practices and design patterns."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
      title: "Creative Solutions",
      description: "I approach problems with creativity, finding innovative solutions that meet business goals."
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: "Performance Focused",
      description: "I optimize applications for speed and efficiency, ensuring a smooth user experience."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-y-0 left-1/3 right-0 bg-gradient-to-r from-transparent to-blue-50 dark:to-blue-950 -z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a seasoned full-stack developer passionate about creating elegant solutions 
              to complex problems. With expertise in modern web technologies, I build 
              applications that are not just functional, but delightful to use.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-100/50'} blur-3xl -z-10`}></div>
        <div className={`absolute bottom-20 right-10 w-72 h-72 rounded-full ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-100/50'} blur-3xl -z-10`}></div>
      </div>
    </section>
  );
};

export default About;
