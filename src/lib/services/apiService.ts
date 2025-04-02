import { Project, BlogPost, OtherWork, Content } from '@/types';
import { useQuery } from '@tanstack/react-query';

// Mock data (replace with actual API calls later)
let mockProjects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Social Media Dashboard',
    description: 'A dashboard that uses AI to analyze social media trends and engagement metrics.',
    imageUrl: '/lovable-uploads/63af4e30-199c-4e86-acf9-0c456ce84647.png',
    githubUrl: 'https://github.com/example',
    demoUrl: 'https://example.com',
    tags: ['React', 'Node.js', 'AI', 'TypeScript'],
    category: 'Web Application',
    featured: true,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'E-commerce Mobile App',
    description: 'A mobile app for an e-commerce platform, built with React Native.',
    imageUrl: '/lovable-uploads/71ebdfd0-b894-428b-8b13-23379499b18b.png',
    githubUrl: 'https://github.com/example',
    demoUrl: 'https://example.com',
    tags: ['React Native', 'Mobile App', 'JavaScript'],
    category: 'Mobile Application',
    featured: false,
    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: '2023-02-15T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Personal Portfolio Website',
    description: 'A personal portfolio website built with Next.js and Tailwind CSS.',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/example',
    demoUrl: 'https://example.com',
    tags: ['Next.js', 'Tailwind CSS', 'Web Design'],
    category: 'Website',
    featured: true,
    createdAt: '2023-03-10T00:00:00.000Z',
    updatedAt: '2023-03-10T00:00:00.000Z',
  },
];

let mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Web Development',
    content: 'An article discussing the potential impact of AI on web development.',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Web Development', 'JavaScript'],
    category: 'Technology',
    featured: true,
    createdAt: '2023-04-01T00:00:00.000Z',
    updatedAt: '2023-04-01T00:00:00.000Z',
    likes: 100,
    comments: 20,
    readingTime: '5 min read',
  },
  {
    id: 2,
    title: 'Mastering React Hooks',
    content: 'A guide to understanding and using React Hooks effectively.',
    imageUrl: 'https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Hooks', 'JavaScript'],
    category: 'Tutorial',
    featured: false,
    createdAt: '2023-05-15T00:00:00.000Z',
    updatedAt: '2023-05-15T00:00:00.000Z',
    likes: 150,
    comments: 30,
    readingTime: '7 min read',
  },
];

let mockOtherWorks: OtherWork[] = [
  {
    id: 1,
    title: 'Open Source Contribution to React Native Elements',
    description: 'Contributed a new component to the React Native Elements library.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Open Source', 'JavaScript'],
    category: 'Contribution',
    featured: true,
    createdAt: '2023-06-01T00:00:00.000Z',
    updatedAt: '2023-06-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Created a Chrome Extension for Productivity',
    description: 'Developed a Chrome extension to help users stay focused and productive.',
    imageUrl: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=800&q=80',
    tags: ['Chrome Extension', 'JavaScript', 'Productivity'],
    category: 'Extension',
    featured: false,
    createdAt: '2023-07-15T00:00:00.000Z',
    updatedAt: '2023-07-15T00:00:00.000Z',
  },
];

let mockVideos: Content[] = [
  {
    id: 1,
    title: 'Building a REST API with Node.js and Express',
    description: 'Learn how to build a REST API using Node.js and Express.',
    imageUrl: 'https://i.ytimg.com/vi/vjf774RKrLc/maxresdefault.jpg',
    thumbnailUrl: 'https://i.ytimg.com/vi/vjf774RKrLc/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vjf774RKrLc',
    link: 'https://www.youtube.com/watch?v=vjf774RKrLc',
    duration: '20:30',
    tags: ['Node.js', 'Express', 'REST API'],
    category: 'Tutorial',
    featured: true,
    createdAt: '2023-08-01T00:00:00.000Z',
    updatedAt: '2023-08-01T00:00:00.000Z',
    views: 1000,
  },
  {
    id: 2,
    title: 'Getting Started with React Native',
    description: 'A beginner-friendly guide to React Native development.',
    imageUrl: 'https://i.ytimg.com/vi/qSRrxpdMpVc/maxresdefault.jpg',
    thumbnailUrl: 'https://i.ytimg.com/vi/qSRrxpdMpVc/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/qSRrxpdMpVc',
    link: 'https://www.youtube.com/watch?v=qSRrxpdMpVc',
    duration: '15:45',
    tags: ['React Native', 'Mobile App'],
    category: 'Tutorial',
    featured: false,
    createdAt: '2023-09-15T00:00:00.000Z',
    updatedAt: '2023-09-15T00:00:00.000Z',
    views: 1500,
  },
];

// Add a debounce utility function to prevent too frequent API calls
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Trigger the websocket notification when data is updated
const triggerWebSocketNotification = (event: string) => {
  // In a real app, this would call the server to trigger a websocket event
  // For now, we'll simulate it with a custom event
  const wsEvent = new CustomEvent('websocket_event', { 
    detail: { type: event } 
  });
  document.dispatchEvent(wsEvent);
  
  // Log for debugging
  console.log(`WebSocket event triggered: ${event}`);
};

// Simulated API delay to mimic real API calls
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Function to fetch all projects
export const getProjects = async (): Promise<Project[]> => {
  await simulateApiDelay();
  return mockProjects;
};

// Function to fetch a single project by ID
export const getProjectById = async (id: number): Promise<Project | undefined> => {
  await simulateApiDelay();
  return mockProjects.find(project => project.id === id);
};

// Function to fetch all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  await simulateApiDelay();
  return mockBlogPosts;
};

// Function to fetch a single blog post by ID
export const getBlogPostById = async (id: number): Promise<BlogPost | undefined> => {
  await simulateApiDelay();
  return mockBlogPosts.find(blogPost => blogPost.id === id);
};

// Function to fetch all other works
export const getOtherWorks = async (): Promise<OtherWork[]> => {
  await simulateApiDelay();
  return mockOtherWorks;
};

// Function to fetch a single other work by ID
export const getOtherWorkById = async (id: number): Promise<OtherWork | undefined> => {
  await simulateApiDelay();
  return mockOtherWorks.find(otherWork => otherWork.id === id);
};

// Function to fetch all videos
export const getVideos = async (): Promise<Content[]> => {
  await simulateApiDelay();
  return mockVideos;
};

// Function to fetch a single video by ID
export const getVideoById = async (id: number): Promise<Content | undefined> => {
  await simulateApiDelay();
  return mockVideos.find(video => video.id === id);
};

// Update the functions to implement proper synchronization and WebSocket notifications

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  await simulateApiDelay();
  
  const now = new Date().toISOString();
  const newProject: Project = {
    ...project,
    id: mockProjects.length + 1,
    createdAt: now,
    updatedAt: now
  };
  
  mockProjects.push(newProject);
  triggerWebSocketNotification('project_updated');
  
  return newProject;
};

export const updateProject = async (id: number, project: Partial<Project>): Promise<Project> => {
  await simulateApiDelay();
  
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Project with id ${id} not found`);
  }
  
  const updatedProject = {
    ...mockProjects[index],
    ...project,
    updatedAt: new Date().toISOString()
  };
  
  mockProjects[index] = updatedProject;
  triggerWebSocketNotification('project_updated');
  
  return updatedProject;
};

export const deleteProject = async (id: number): Promise<void> => {
  await simulateApiDelay();
  
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Project with id ${id} not found`);
  }
  
  mockProjects.splice(index, 1);
  triggerWebSocketNotification('project_updated');
};

export const createBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
  await simulateApiDelay();
  
  const now = new Date().toISOString();
  const newBlogPost: BlogPost = {
    ...blogPost,
    id: mockBlogPosts.length + 1,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    comments: 0,
    readingTime: `${Math.floor(Math.random() * 10) + 3} min read`
  };
  
  mockBlogPosts.push(newBlogPost);
  triggerWebSocketNotification('blog_updated');
  
  return newBlogPost;
};

export const updateBlogPost = async (id: number, blogPost: Partial<BlogPost>): Promise<BlogPost> => {
  await simulateApiDelay();
  
  const index = mockBlogPosts.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Blog post with id ${id} not found`);
  }
  
  const updatedBlogPost = {
    ...mockBlogPosts[index],
    ...blogPost,
    updatedAt: new Date().toISOString()
  };
  
  mockBlogPosts[index] = updatedBlogPost;
  triggerWebSocketNotification('blog_updated');
  
  return updatedBlogPost;
};

export const deleteBlogPost = async (id: number): Promise<void> => {
  await simulateApiDelay();
  
  const index = mockBlogPosts.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Blog post with id ${id} not found`);
  }
  
  mockBlogPosts.splice(index, 1);
  triggerWebSocketNotification('blog_updated');
};

export const createOtherWork = async (otherWork: Omit<OtherWork, 'id' | 'createdAt' | 'updatedAt'>): Promise<OtherWork> => {
  await simulateApiDelay();
  
  const now = new Date().toISOString();
  const newOtherWork: OtherWork = {
    ...otherWork,
    id: mockOtherWorks.length + 1,
    createdAt: now,
    updatedAt: now
  };
  
  mockOtherWorks.push(newOtherWork);
  triggerWebSocketNotification('other_work_updated');
  
  return newOtherWork;
};

export const updateOtherWork = async (id: number, otherWork: Partial<OtherWork>): Promise<OtherWork> => {
  await simulateApiDelay();
  
  const index = mockOtherWorks.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Other work with id ${id} not found`);
  }
  
  const updatedOtherWork = {
    ...mockOtherWorks[index],
    ...otherWork,
    updatedAt: new Date().toISOString()
  };
  
  mockOtherWorks[index] = updatedOtherWork;
  triggerWebSocketNotification('other_work_updated');
  
  return updatedOtherWork;
};

export const deleteOtherWork = async (id: number): Promise<void> => {
  await simulateApiDelay();
  
  const index = mockOtherWorks.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Other work with id ${id} not found`);
  }
  
  mockOtherWorks.splice(index, 1);
  triggerWebSocketNotification('other_work_updated');
};

export const createVideo = async (video: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<Content> => {
  await simulateApiDelay();
  
  const now = new Date().toISOString();
  const newVideo: Content = {
    ...video,
    id: mockVideos.length + 1,
    createdAt: now,
    updatedAt: now,
    thumbnailUrl: video.thumbnailUrl || video.imageUrl, // Ensure thumbnailUrl is set
    views: 0
  };
  
  mockVideos.push(newVideo);
  triggerWebSocketNotification('video_updated');
  
  return newVideo;
};

export const updateVideo = async (id: number, video: Partial<Content>): Promise<Content> => {
  await simulateApiDelay();
  
  const index = mockVideos.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Video with id ${id} not found`);
  }
  
  // Ensure thumbnailUrl is updated if imageUrl changes
  if (video.imageUrl && !video.thumbnailUrl) {
    video.thumbnailUrl = video.imageUrl;
  }
  
  const updatedVideo = {
    ...mockVideos[index],
    ...video,
    updatedAt: new Date().toISOString()
  };
  
  mockVideos[index] = updatedVideo;
  triggerWebSocketNotification('video_updated');
  
  return updatedVideo;
};

export const deleteVideo = async (id: number): Promise<void> => {
  await simulateApiDelay();
  
  const index = mockVideos.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Video with id ${id} not found`);
  }
  
  mockVideos.splice(index, 1);
  triggerWebSocketNotification('video_updated');
};

// Function to increment views for a video
export const incrementVideoViews = async (id: number): Promise<Content | undefined> => {
  await simulateApiDelay();

  const index = mockVideos.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Video with id ${id} not found`);
  }

  mockVideos[index].views = (mockVideos[index].views || 0) + 1;
  triggerWebSocketNotification('video_updated');
  return mockVideos[index];
};

// Update the websocket service integration
export const setQueryClientForAPI = (queryClient: any) => {
  // Listen for custom websocket events and invalidate the appropriate queries
  document.addEventListener('websocket_event', ((event: CustomEvent) => {
    const { type } = event.detail;
    
    switch (type) {
      case 'project_updated':
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        break;
      case 'blog_updated':
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        break;
      case 'other_work_updated':
        queryClient.invalidateQueries({ queryKey: ['other-works'] });
        break;
      case 'video_updated':
        queryClient.invalidateQueries({ queryKey: ['videos'] });
        break;
      default:
        break;
    }
  }) as EventListener);
};
