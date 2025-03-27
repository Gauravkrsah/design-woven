
import React, { useState } from 'react';
import ExperienceItem from '@/components/ui/ExperienceItem';
import { cn } from '@/lib/utils';

const experiences = [
  {
    id: 1,
    title: 'Senior ML Engineer',
    company: 'Resonant Inc.',
    period: '2022 - Present',
    description: 'Leading machine learning platform design and implementation while building advanced models for predictive analytics and optimization.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Data Analysis'],
  },
  {
    id: 2,
    title: 'Python Developer',
    company: 'Pure Streamline Inc.',
    period: '2019 - 2022',
    description: 'Developed advanced recommendation systems and machine learning models for predictive analytics.',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Cloud Computing'],
  },
  {
    id: 3,
    title: 'Junior Data Scientist',
    company: 'Golden Solutions',
    period: '2017 - 2019',
    description: 'Utilized statistical tools and machine learning algorithms to transform raw data into valuable insights to solve business problems.',
    skills: ['Python', 'Statistical Modeling', 'Data Visualization', 'SQL', 'Scikit-learn'],
  },
];

const Experience: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState(experiences[0].id);
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <section 
      id="experience" 
      className="py-20 relative"
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
              Experience
            </h2>
            <p 
              className={cn(
                "text-muted-foreground mt-4 transition-all duration-700 delay-100",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4"
              )}
            >
              My professional journey and expertise
            </p>
          </div>
          
          <div 
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            {experiences.map((exp) => (
              <ExperienceItem
                key={exp.id}
                title={exp.title}
                company={exp.company}
                period={exp.period}
                description={exp.description}
                skills={exp.skills}
                isActive={exp.id === activeExperience}
                className="mb-2 cursor-pointer"
                // @ts-ignore - Event handling
                onClick={() => setActiveExperience(exp.id)}
              />
            ))}
          </div>
          
          <div 
            className={cn(
              "mt-12 text-center transition-all duration-700 delay-300",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
