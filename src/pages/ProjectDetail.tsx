
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Github, Globe, Calendar, Tag, Clock } from 'lucide-react';

// Simulated project data (in a real app, this would come from an API)
const projectsData = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization',
    fullDescription: `
      <p>This project involved a complete overhaul of an existing e-commerce platform that was struggling with low conversion rates and poor user engagement. The client needed a modern, user-friendly interface that would improve the shopping experience and drive sales.</p>
      
      <h3>The Challenge</h3>
      <p>The existing platform had an outdated design, confusing navigation, and a checkout process that was causing high cart abandonment rates. Mobile users were particularly dissatisfied with the experience, leading to poor conversion on mobile devices.</p>
      
      <h3>Solution</h3>
      <p>I conducted extensive user research to understand pain points and designed a completely new user interface with:</p>
      <ul>
        <li>Streamlined product navigation and filtering</li>
        <li>Simplified checkout process reduced from 5 steps to 3</li>
        <li>Responsive design optimized for mobile, tablet, and desktop</li>
        <li>Improved product pages with better imagery and information hierarchy</li>
        <li>Personalized product recommendations</li>
      </ul>
      
      <h3>Results</h3>
      <p>The redesign led to significant improvements in key performance metrics:</p>
      <ul>
        <li>35% increase in conversion rate</li>
        <li>42% reduction in cart abandonment</li>
        <li>28% increase in average order value</li>
        <li>52% increase in mobile conversions</li>
      </ul>
    `,
    tags: ['UI/UX Design', 'Web Development', 'Shopify'],
    category: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561069934-eee225952461?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
    ],
    link: 'https://example.com/project',
    githubLink: 'https://github.com/example/project',
    date: '2023-06-15',
    client: 'FashionHub',
    duration: '3 months',
  },
  {
    id: '2',
    title: 'AI-Powered Content Generator',
    description: 'A tool that uses machine learning to generate copy for marketing materials, blogs, and social media',
    fullDescription: `
      <p>This project involved building an AI-powered content generation tool to help marketers create high-quality copy for various marketing channels more efficiently. The tool uses advanced natural language processing models to understand context and generate relevant content.</p>
      
      <h3>The Challenge</h3>
      <p>Content creation is a time-consuming process, and marketers often struggle to produce enough high-quality content to meet their needs. Manual content creation is costly and doesn't scale well with growing marketing demands.</p>
      
      <h3>Solution</h3>
      <p>I developed a web application that:</p>
      <ul>
        <li>Utilizes GPT-4 API for generating human-like content</li>
        <li>Features templates for different types of marketing content</li>
        <li>Includes a user-friendly interface for content customization</li>
        <li>Provides editing tools to refine the generated content</li>
        <li>Allows easy export to various formats and platforms</li>
      </ul>
      
      <h3>Technical Details</h3>
      <p>The application was built with:</p>
      <ul>
        <li>React and TypeScript for the frontend</li>
        <li>Node.js and Express for the backend</li>
        <li>MongoDB for data storage</li>
        <li>OpenAI API for content generation</li>
        <li>AWS for hosting and deployment</li>
      </ul>
      
      <h3>Results</h3>
      <p>The tool has significantly improved content creation efficiency:</p>
      <ul>
        <li>75% reduction in time spent creating marketing copy</li>
        <li>300% increase in content output</li>
        <li>Consistent brand voice across all materials</li>
        <li>Cost savings of approximately $50,000 annually</li>
      </ul>
    `,
    tags: ['AI/ML', 'Web Development', 'Python'],
    category: 'AI/ML Projects',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    ],
    link: 'https://ai-content-generator.example.com',
    githubLink: 'https://github.com/example/ai-content-generator',
    date: '2023-02-28',
    client: 'MarketingPro Agency',
    duration: '5 months',
  },
  // More project data would be here
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    document.title = "Project Detail | Gaurav Kr Sah";
    
    // Simulate API call to fetch project data
    setTimeout(() => {
      const foundProject = projectsData.find(p => p.id === id);
      setProject(foundProject);
      setIsLoading(false);
      
      if (foundProject) {
        document.title = `${foundProject.title} | Gaurav Kr Sah`;
      }
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <div className="sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="animate-pulse space-y-8 w-full max-w-3xl">
            <div className="h-8 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
            </div>
          </div>
        </main>
        <div className="sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <div className="sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        <main className="flex-1 p-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects" className="flex items-center text-blue-500 hover:text-blue-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </main>
        <div className="sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    );
  }

  const allImages = [project.imageUrl, ...project.additionalImages];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="p-8 max-w-6xl mx-auto">
            <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                <p className="text-xl text-gray-400">{project.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-900">
                    <img 
                      src={allImages[activeImageIndex]} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                    {allImages.map((img: string, index: number) => (
                      <div 
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative cursor-pointer rounded-md overflow-hidden w-20 h-20 flex-shrink-0 transition ${
                          activeImageIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6 h-fit">
                  <h3 className="font-semibold text-lg mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Completion Date</p>
                        <p>{project.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <Tag className="w-5 h-5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p>{project.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-5 h-5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p>{project.duration}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2 px-4 w-full transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          <span>View Live Project</span>
                        </a>
                      )}
                      
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 text-white rounded-md py-2 px-4 w-full transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Project Overview</h2>
                <div 
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                />
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

export default ProjectDetail;
