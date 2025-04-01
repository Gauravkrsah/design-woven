import React, { useEffect, useState, useRef } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  Loader2, 
  CheckCircle, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import gsap from 'gsap';

const Contacts: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Contact Me | Gaurav Kr Sah";
    
    if (contactInfoRef.current) {
      const items = contactInfoRef.current.querySelectorAll('.contact-item');
      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
      });
    }
    
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, textarea, button');
      gsap.from(formElements, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5,
      });
    }
    
    const container = document.querySelector('.particles-container');
    if (container) {
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`;
        
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 50 - 25,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 5,
        });
      }
    }
  }, [theme]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success('Message sent!', {
        description: 'I will get back to you as soon as possible.',
      });
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="relative">
            <div className="particles-container absolute inset-0 overflow-hidden -z-10"></div>
            
            <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold mb-2 text-gradient">Get in Touch</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                  I'm always open to new opportunities, collaborations, or just a friendly chat. 
                  Feel free to reach out through any of the channels below.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                <div ref={contactInfoRef} className="space-y-6">
                  <div className="glass-card p-6 rounded-xl contact-item">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Location</h3>
                        <p className="text-gray-600 dark:text-gray-400">San Francisco, California</p>
                        <p className="text-gray-600 dark:text-gray-400">United States</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl contact-item">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Email</h3>
                        <a 
                          href="mailto:contact@gauravkrsah.com" 
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          contact@gauravkrsah.com
                        </a>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          I typically respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl contact-item">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Phone className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Phone</h3>
                        <a 
                          href="tel:+1234567890" 
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          +1 (234) 567-890
                        </a>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Monday-Friday, 9am-5pm PST
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl contact-item">
                    <h3 className="text-xl font-medium mb-4">Connect with me</h3>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="glass-card p-6 md:p-8 rounded-xl">
                    <h3 className="text-xl font-medium mb-6">Send me a message</h3>
                    
                    {submitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center p-6"
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h4 className="text-lg font-medium mb-2">Message Sent!</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Thank you for reaching out. I'll get back to you as soon as possible.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                              Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                              Email
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-1">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            required
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <h3 className="text-xl font-medium mb-6">Find me here</h3>
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555179327!2d-122.50764029971194!3d37.75781499651501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1655840208032!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  />
                </div>
              </div>
              
              <div className="text-center py-8 border-t border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} Gaurav Kr Sah. All rights reserved.
                </p>
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

export default Contacts;
