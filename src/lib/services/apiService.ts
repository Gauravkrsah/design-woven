
import { QueryClient } from '@tanstack/react-query';

// Base types for our content
export interface BaseContent {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
}

export interface Project extends BaseContent {
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

export interface BlogPost extends BaseContent {
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
  readTime: number;
}

export interface OtherWork extends BaseContent {
  description: string;
  imageUrl: string;
  externalUrl?: string;
  category: string;
}

export interface Video extends BaseContent {
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// In-memory data store (in a real app, this would be a database)
let projects: Project[] = [];
let blogPosts: BlogPost[] = [];
let otherWorks: OtherWork[] = [];
let videos: Video[] = [];
let messages: Message[] = [];

// Initialize with sample data
const initializeSampleData = () => {
  // Sample projects
  projects = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, product management, and payments.',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      technologies: ['React', 'Node.js', 'MongoDB'],
      featured: true,
      createdAt: '2023-04-15T12:00:00Z',
      updatedAt: '2023-05-20T15:30:00Z',
      status: 'published'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A productivity app for managing tasks, projects, and team collaboration.',
      imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=600&q=80',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      featured: true,
      createdAt: '2023-02-10T14:20:00Z',
      updatedAt: '2023-03-05T09:15:00Z',
      status: 'published'
    },
  ];

  // Sample blog posts
  blogPosts = [
    {
      id: '1',
      title: 'Building Scalable Web Applications',
      summary: 'Learn how to design and build web applications that can scale to millions of users.',
      content: 'Full content here...',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      tags: ['Web Development', 'Scaling', 'Architecture'],
      readTime: 8,
      createdAt: '2023-05-10T10:30:00Z',
      updatedAt: '2023-05-15T14:20:00Z',
      status: 'published'
    },
    {
      id: '2',
      title: 'The Future of JavaScript Frameworks',
      summary: 'Exploring upcoming trends and innovations in JavaScript frameworks and libraries.',
      content: 'Full content here...',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      tags: ['JavaScript', 'Frameworks', 'Web Development'],
      readTime: 6,
      createdAt: '2023-04-20T09:45:00Z',
      updatedAt: '2023-04-25T11:10:00Z',
      status: 'published'
    },
  ];

  // Sample other works
  otherWorks = [
    {
      id: '1',
      title: 'UI/UX Design for Mobile Banking',
      description: 'Redesigned the user interface for a mobile banking application, focusing on usability and accessibility.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      category: 'UI/UX Design',
      createdAt: '2023-03-05T13:40:00Z',
      updatedAt: '2023-03-10T16:25:00Z',
      status: 'published'
    },
    {
      id: '2',
      title: 'Technical Writing: Cloud Architecture',
      description: 'A comprehensive guide to setting up scalable cloud infrastructure using AWS services.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      externalUrl: 'https://medium.com',
      category: 'Technical Writing',
      createdAt: '2023-02-15T11:20:00Z',
      updatedAt: '2023-02-20T14:50:00Z',
      status: 'published'
    },
  ];

  // Sample videos
  videos = [
    {
      id: '1',
      title: 'How I Built a Real-Time Chat App with React and Firebase',
      description: 'Learn how to create a fully functional chat application with user authentication, real-time messaging, and more.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '18:24',
      createdAt: '2023-06-10T09:30:00Z',
      updatedAt: '2023-06-12T14:15:00Z',
      status: 'published'
    },
    {
      id: '2',
      title: 'Building Responsive UIs with Tailwind CSS',
      description: 'A step-by-step guide to creating beautiful, responsive user interfaces using Tailwind CSS framework.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '14:36',
      createdAt: '2023-05-20T11:45:00Z',
      updatedAt: '2023-05-25T16:30:00Z',
      status: 'published'
    },
    {
      id: '3',
      title: 'Advanced TypeScript Patterns for React Applications',
      description: 'Discover advanced TypeScript techniques to make your React code more robust and maintainable.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '22:18',
      createdAt: '2023-04-15T10:20:00Z',
      updatedAt: '2023-04-20T13:40:00Z',
      status: 'published'
    },
  ];

  // Sample messages
  messages = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I\'m interested in collaborating on a new web application project. Can we schedule a call to discuss?',
      createdAt: '2023-06-15T09:30:00Z',
      read: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Consultation Request',
      message: 'I need help with optimizing my website performance. When would you be available for a consultation?',
      createdAt: '2023-06-14T14:45:00Z',
      read: false
    },
  ];
};

// Initialize data
initializeSampleData();

// QueryClient for cache invalidation
let queryClient: QueryClient | null = null;

export const setQueryClientForAPI = (client: QueryClient) => {
  queryClient = client;
};

// Helper function to invalidate queries
const invalidateQueries = (key: string) => {
  if (queryClient) {
    queryClient.invalidateQueries({ queryKey: [key] });
  }
};

// API methods for projects
export const getProjects = async (): Promise<Project[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return projects.filter(p => p.status === 'published');
};

export const getProjectById = async (id: string): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const project = projects.find(p => p.id === id);
  if (!project) throw new Error('Project not found');
  return project;
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newProject = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  projects.push(newProject);
  invalidateQueries('projects');
  return newProject;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');
  
  projects[index] = {
    ...projects[index],
    ...project,
    updatedAt: new Date().toISOString()
  };
  
  invalidateQueries('projects');
  return projects[index];
};

export const deleteProject = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');
  projects.splice(index, 1);
  invalidateQueries('projects');
};

// API methods for blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return blogPosts.filter(p => p.status === 'published');
};

export const getBlogPostById = async (id: string): Promise<BlogPost> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const post = blogPosts.find(p => p.id === id);
  if (!post) throw new Error('Blog post not found');
  return post;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  blogPosts.push(newPost);
  invalidateQueries('blogPosts');
  return newPost;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const index = blogPosts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Blog post not found');
  
  blogPosts[index] = {
    ...blogPosts[index],
    ...post,
    updatedAt: new Date().toISOString()
  };
  
  invalidateQueries('blogPosts');
  return blogPosts[index];
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = blogPosts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Blog post not found');
  blogPosts.splice(index, 1);
  invalidateQueries('blogPosts');
};

// API methods for other works
export const getOtherWorks = async (): Promise<OtherWork[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return otherWorks.filter(w => w.status === 'published');
};

export const getOtherWorkById = async (id: string): Promise<OtherWork> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const work = otherWorks.find(w => w.id === id);
  if (!work) throw new Error('Work not found');
  return work;
};

export const createOtherWork = async (work: Omit<OtherWork, 'id' | 'createdAt' | 'updatedAt'>): Promise<OtherWork> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newWork = {
    ...work,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  otherWorks.push(newWork);
  invalidateQueries('otherWorks');
  return newWork;
};

export const updateOtherWork = async (id: string, work: Partial<OtherWork>): Promise<OtherWork> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const index = otherWorks.findIndex(w => w.id === id);
  if (index === -1) throw new Error('Work not found');
  
  otherWorks[index] = {
    ...otherWorks[index],
    ...work,
    updatedAt: new Date().toISOString()
  };
  
  invalidateQueries('otherWorks');
  return otherWorks[index];
};

export const deleteOtherWork = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = otherWorks.findIndex(w => w.id === id);
  if (index === -1) throw new Error('Work not found');
  otherWorks.splice(index, 1);
  invalidateQueries('otherWorks');
};

// API methods for videos
export const getVideos = async (): Promise<Video[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return videos.filter(v => v.status === 'published');
};

export const getVideoById = async (id: string): Promise<Video> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const video = videos.find(v => v.id === id);
  if (!video) throw new Error('Video not found');
  return video;
};

export const createVideo = async (video: Omit<Video, 'id' | 'createdAt' | 'updatedAt'>): Promise<Video> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newVideo = {
    ...video,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  videos.push(newVideo);
  invalidateQueries('videos');
  return newVideo;
};

export const updateVideo = async (id: string, video: Partial<Video>): Promise<Video> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const index = videos.findIndex(v => v.id === id);
  if (index === -1) throw new Error('Video not found');
  
  videos[index] = {
    ...videos[index],
    ...video,
    updatedAt: new Date().toISOString()
  };
  
  invalidateQueries('videos');
  return videos[index];
};

export const deleteVideo = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = videos.findIndex(v => v.id === id);
  if (index === -1) throw new Error('Video not found');
  videos.splice(index, 1);
  invalidateQueries('videos');
};

// API methods for messages
export const getMessages = async (): Promise<Message[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getMessageById = async (id: string): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const message = messages.find(m => m.id === id);
  if (!message) throw new Error('Message not found');
  return message;
};

export const createMessage = async (message: Omit<Message, 'id' | 'createdAt' | 'read'>): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newMessage = {
    ...message,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false
  };
  messages.push(newMessage);
  invalidateQueries('messages');
  return newMessage;
};

export const markMessageAsRead = async (id: string): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Message not found');
  
  messages[index] = {
    ...messages[index],
    read: true
  };
  
  invalidateQueries('messages');
  return messages[index];
};

export const deleteMessage = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Message not found');
  messages.splice(index, 1);
  invalidateQueries('messages');
};

// Admin dashboard statistics
export const getDashboardStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    projects: {
      total: projects.length,
      published: projects.filter(p => p.status === 'published').length,
      draft: projects.filter(p => p.status === 'draft').length
    },
    blogPosts: {
      total: blogPosts.length,
      published: blogPosts.filter(p => p.status === 'published').length,
      draft: blogPosts.filter(p => p.status === 'draft').length
    },
    otherWorks: {
      total: otherWorks.length,
      published: otherWorks.filter(w => w.status === 'published').length,
      draft: otherWorks.filter(w => w.status === 'draft').length
    },
    videos: {
      total: videos.length,
      published: videos.filter(v => v.status === 'published').length,
      draft: videos.filter(v => v.status === 'draft').length
    },
    messages: {
      total: messages.length,
      unread: messages.filter(m => !m.read).length
    }
  };
};
