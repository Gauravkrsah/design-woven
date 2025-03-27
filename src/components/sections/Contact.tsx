
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset the submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="py-20 bg-muted/30"
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(el);
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className={cn(
                "text-3xl font-bold tracking-tight transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}
            >
              Get In Touch
            </h2>
            <p 
              className={cn(
                "text-muted-foreground mt-4 transition-all duration-700 delay-100",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}
            >
              Have a question or want to work together? Drop me a message.
            </p>
          </div>
          
          <div 
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Contact Information</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out through the form or connect with me directly via email or social media.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <a href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                    contact@example.com
                  </a>
                </div>
                
                <div className="flex space-x-4 pt-2">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center animate-fade-in">
                  <h4 className="text-lg font-medium mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-3 rounded-lg font-medium transition-all",
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                      isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
