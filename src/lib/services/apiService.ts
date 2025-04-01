
import { QueryClient } from '@tanstack/react-query';

// Store the query client instance to use in mock API functions
let queryClientInstance: QueryClient | null = null;

export const setQueryClientForAPI = (queryClient: QueryClient) => {
  queryClientInstance = queryClient;
};

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include product listings, cart functionality, payment processing, and user authentication.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://example.com/e-commerce-demo',
    githubUrl: 'https://github.com/yourusername/e-commerce',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    status: 'published',
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-10-05T14:20:00Z'
  },
  {
    id: '2',
    title: 'AI Image Generator',
    description: 'An application that utilizes OpenAI\'s API to generate images based on text prompts. Built with React and TailwindCSS with a clean and intuitive user interface.',
    imageUrl: 'https://images.unsplash.com/photo-1633536736282-792c61bcc3ef?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://example.com/ai-generator',
    githubUrl: 'https://github.com/yourusername/ai-image-generator',
    category: 'AI & ML',
    tags: ['React', 'OpenAI', 'TailwindCSS', 'API Integration'],
    status: 'published',
    createdAt: '2023-08-20T09:15:00Z',
    updatedAt: '2023-09-01T11:45:00Z'
  },
  {
    id: '3',
    title: 'Task Management System',
    description: 'A Kanban-style task management application built with React and Firebase. Features include drag-and-drop functionality, task assignments, due dates, and real-time updates.',
    imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://example.com/task-manager',
    githubUrl: 'https://github.com/yourusername/task-manager',
    category: 'Web Development',
    tags: ['React', 'Firebase', 'DnD', 'Real-time'],
    status: 'published',
    createdAt: '2023-07-10T15:45:00Z',
    updatedAt: '2023-08-05T12:30:00Z'
  },
  {
    id: '4',
    title: 'Real-time Chat Application',
    description: 'A real-time chat application built with Socket.io and React. Features include private messaging, group chats, read receipts, and message notifications.',
    imageUrl: 'https://images.unsplash.com/photo-1565272381829-48ebfded6136?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://example.com/chat-app',
    githubUrl: 'https://github.com/yourusername/chat-app',
    category: 'Communication',
    tags: ['React', 'Socket.io', 'Node.js', 'Real-time'],
    status: 'draft',
    createdAt: '2023-06-05T08:20:00Z',
    updatedAt: '2023-07-01T10:10:00Z'
  }
];

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: '1',
    title: 'The Future of JavaScript Frameworks',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'An in-depth look at the future of JavaScript frameworks and the evolving landscape of front-end development.',
    category: 'Web Development',
    tags: ['JavaScript', 'React', 'Vue', 'Angular', 'Frameworks'],
    status: 'published',
    createdAt: '2023-10-05T14:20:00Z',
    updatedAt: '2023-10-10T09:30:00Z',
    authorName: 'Gaurav Kr Sah',
    likes: 35,
    comments: 8,
    readingTime: '6 min read'
  },
  {
    id: '2',
    title: 'Getting Started with TypeScript',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://images.unsplash.com/photo-1627398242683-712c886e0ea5?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'A beginner-friendly guide to TypeScript and how it can improve your JavaScript development workflow.',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    status: 'published',
    createdAt: '2023-09-20T11:05:00Z',
    updatedAt: '2023-09-25T13:45:00Z',
    authorName: 'Gaurav Kr Sah',
    likes: 42,
    comments: 12,
    readingTime: '8 min read'
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://images.unsplash.com/photo-1627398243732-78e453c7f912?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Learn how to design and implement scalable APIs using Node.js, Express, and MongoDB.',
    category: 'Backend Development',
    tags: ['Node.js', 'Express', 'MongoDB', 'API', 'Backend'],
    status: 'draft',
    createdAt: '2023-09-10T09:15:00Z',
    updatedAt: '2023-09-15T16:30:00Z',
    authorName: 'Gaurav Kr Sah',
    likes: 18,
    comments: 3,
    readingTime: '10 min read'
  }
];

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    subject: 'Project Inquiry',
    message: 'Hi Gaurav, I\'m interested in hiring you for a web development project. Could we schedule a call to discuss the details? Thanks!',
    read: false,
    createdAt: '2023-10-15T09:30:00Z'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Collaboration Opportunity',
    message: 'Hello, I have a startup and I\'m looking for a skilled developer to join our team. Would you be interested in discussing a potential collaboration?',
    read: true,
    createdAt: '2023-10-12T14:20:00Z'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    subject: 'Blog Feedback',
    message: 'Hi Gaurav, I just read your article on TypeScript and found it incredibly helpful. I have a few questions about implementing it in my project. Would you mind if I asked you a few questions?',
    read: false,
    createdAt: '2023-10-10T11:45:00Z'
  }
];

// Mock data for videos
const mockVideos = [
  {
    id: '1',
    title: 'Building a Full-Stack App with React and Node.js',
    description: 'Learn how to create a complete full-stack application using React for the frontend and Node.js with Express for the backend.',
    thumbnailUrl: '/lovable-uploads/63af4e30-199c-4e86-acf9-0c456ce84647.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '32:15',
    category: 'Web Development',
    status: 'published',
    views: 15243,
    likes: 1245,
    comments: 83,
    createdAt: '2023-09-25T10:30:00Z'
  },
  {
    id: '2',
    title: 'Designing Modern UIs with Figma',
    description: 'A step-by-step guide on designing modern and responsive user interfaces using Figma\'s powerful design tools.',
    thumbnailUrl: '/lovable-uploads/71ebdfd0-b894-428b-8b13-23379499b18b.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45:22',
    category: 'UI/UX Design',
    status: 'published',
    views: 9876,
    likes: 876,
    comments: 65,
    createdAt: '2023-09-15T14:20:00Z'
  },
  {
    id: '3',
    title: 'Advanced TypeScript Patterns for React',
    description: 'Explore advanced TypeScript patterns and techniques to improve your React applications with better type safety and developer experience.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '28:17',
    category: 'Programming',
    status: 'published',
    views: 12543,
    likes: 932,
    comments: 47,
    createdAt: '2023-09-05T09:15:00Z'
  }
];

// Mock data for other works
const mockOtherWorks = [
  {
    id: '1',
    title: 'UI/UX Redesign for Mobile App',
    description: 'Complete redesign of a mobile application\'s user interface and user experience to improve usability and engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=1000&q=80',
    category: 'UI/UX Design',
    clientName: 'TechStart Inc.',
    completionDate: '2023-08-15',
    projectUrl: 'https://example.com/portfolio/ui-redesign',
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
    status: 'published',
    createdAt: '2023-08-20T09:15:00Z',
    updatedAt: '2023-09-01T11:45:00Z'
  },
  {
    id: '2',
    title: 'Brand Identity for Startup',
    description: 'Created a complete brand identity including logo design, color scheme, typography, and brand guidelines for a tech startup.',
    imageUrl: 'https://images.unsplash.com/photo-1600380303892-12109ae9e097?auto=format&fit=crop&w=1000&q=80',
    category: 'Branding',
    clientName: 'InnovateHub',
    completionDate: '2023-07-10',
    projectUrl: 'https://example.com/portfolio/brand-identity',
    technologies: ['Adobe Illustrator', 'Photoshop', 'Brand Design'],
    status: 'published',
    createdAt: '2023-07-15T14:20:00Z',
    updatedAt: '2023-07-30T10:30:00Z'
  },
  {
    id: '3',
    title: 'Motion Graphics for Product Launch',
    description: 'Created animated motion graphics for a product launch campaign, including promotional videos and social media content.',
    imageUrl: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80',
    category: 'Motion Graphics',
    clientName: 'ProductX',
    completionDate: '2023-06-05',
    projectUrl: 'https://example.com/portfolio/motion-graphics',
    technologies: ['After Effects', 'Premiere Pro', '3D Animation'],
    status: 'draft',
    createdAt: '2023-06-10T09:15:00Z',
    updatedAt: '2023-06-25T11:45:00Z'
  }
];

// Mock API function to get dashboard stats
export const getDashboardStats = async () => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    projects: {
      total: mockProjects.length,
      published: mockProjects.filter(p => p.status === 'published').length,
      draft: mockProjects.filter(p => p.status === 'draft').length
    },
    blogPosts: {
      total: mockBlogPosts.length,
      published: mockBlogPosts.filter(p => p.status === 'published').length,
      draft: mockBlogPosts.filter(p => p.status === 'draft').length
    },
    messages: {
      total: mockMessages.length,
      unread: mockMessages.filter(m => !m.read).length
    },
    videos: {
      total: mockVideos.length,
      published: mockVideos.filter(v => v.status === 'published').length,
      draft: mockVideos.filter(v => v.status === 'draft').length
    },
    otherWorks: {
      total: mockOtherWorks.length,
      published: mockOtherWorks.filter(w => w.status === 'published').length,
      draft: mockOtherWorks.filter(w => w.status === 'draft').length
    }
  };
};

// Mock API function to get projects
export const getProjects = async () => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...mockProjects];
};

// Mock API function to get blog posts
export const getBlogPosts = async () => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...mockBlogPosts];
};

// Mock API function to get messages
export const getMessages = async () => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...mockMessages];
};

// Mock API function to get videos
export const getVideos = async () => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...mockVideos];
};

// Mock API function to get other works
export const getOtherWorks = async () => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...mockOtherWorks];
};

// Mock API function to create a project
export const createProject = async (projectData: any) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newProject = {
    id: String(mockProjects.length + 1),
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockProjects.push(newProject);
  
  return newProject;
};

// Mock API function to update a project
export const updateProject = async (id: string, projectData: any) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockProjects.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Project not found');
  }
  
  const updatedProject = {
    ...mockProjects[index],
    ...projectData,
    updatedAt: new Date().toISOString()
  };
  
  mockProjects[index] = updatedProject;
  
  return updatedProject;
};

// Mock API function to delete a project
export const deleteProject = async (id: string) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockProjects.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Project not found');
  }
  
  mockProjects.splice(index, 1);
  
  return { success: true, message: 'Project deleted successfully' };
};

// Mock API function to create a blog post
export const createBlogPost = async (blogData: any) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newBlog = {
    id: String(mockBlogPosts.length + 1),
    ...blogData,
    likes: 0,
    comments: 0,
    readingTime: `${Math.floor(Math.random() * 10) + 3} min read`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockBlogPosts.push(newBlog);
  
  return newBlog;
};

// Mock API function to update a blog post
export const updateBlogPost = async (id: string, blogData: any) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockBlogPosts.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Blog post not found');
  }
  
  const updatedBlog = {
    ...mockBlogPosts[index],
    ...blogData,
    updatedAt: new Date().toISOString()
  };
  
  mockBlogPosts[index] = updatedBlog;
  
  return updatedBlog;
};

// Mock API function to delete a blog post
export const deleteBlogPost = async (id: string) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockBlogPosts.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Blog post not found');
  }
  
  mockBlogPosts.splice(index, 1);
  
  return { success: true, message: 'Blog post deleted successfully' };
};

// Mock API function to mark a message as read
export const markMessageAsRead = async (id: string) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockMessages.findIndex(m => m.id === id);
  
  if (index === -1) {
    throw new Error('Message not found');
  }
  
  mockMessages[index].read = true;
  
  return mockMessages[index];
};

// Mock API function to delete a message
export const deleteMessage = async (id: string) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockMessages.findIndex(m => m.id === id);
  
  if (index === -1) {
    throw new Error('Message not found');
  }
  
  mockMessages.splice(index, 1);
  
  return { success: true, message: 'Message deleted successfully' };
};

// Mock API function to create an other work
export const createOtherWork = async (workData: any) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newWork = {
    id: String(mockOtherWorks.length + 1),
    ...workData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockOtherWorks.push(newWork);
  
  return newWork;
};

// Mock API function to update an other work
export const updateOtherWork = async (id: string, workData: any) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockOtherWorks.findIndex(w => w.id === id);
  
  if (index === -1) {
    throw new Error('Work not found');
  }
  
  const updatedWork = {
    ...mockOtherWorks[index],
    ...workData,
    updatedAt: new Date().toISOString()
  };
  
  mockOtherWorks[index] = updatedWork;
  
  return updatedWork;
};

// Mock API function to delete an other work
export const deleteOtherWork = async (id: string) => {
  // Wait for a short delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = mockOtherWorks.findIndex(w => w.id === id);
  
  if (index === -1) {
    throw new Error('Work not found');
  }
  
  mockOtherWorks.splice(index, 1);
  
  return { success: true, message: 'Work deleted successfully' };
};
