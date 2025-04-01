
// Portfolio content types

export interface Project {
  id: number;
  title: string;
  description: string;
  content?: string;
  tags: string[];
  category: string;
  imageUrl: string;
  link: string;
  githubLink?: string;
  liveDemo?: string;
  featured: boolean;
  status: 'Draft' | 'Published';
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  tags: string[];
  author: string;
  readTime: string;
  status: 'Draft' | 'Published';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OtherWork {
  id: number;
  title: string;
  description: string;
  content?: string;
  category: string;
  date: string;
  imageUrl: string;
  link?: string;
  featured: boolean;
  status: 'Draft' | 'Published';
}

export interface Content {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  platform: string;
  duration: string;
  likes: number;
  comments: number;
  shares: number;
  category: string;
  isVideo: boolean;
  link: string;
  featured: boolean;
  status: 'Draft' | 'Published';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Meeting {
  id: number;
  name: string;
  email: string;
  subject: string;
  message?: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Subscriber {
  id: number;
  email: string;
  name?: string;
  subscriptionDate: string;
  active: boolean;
}

// Mock API functions - These would be replaced with real API calls in a production app

let mockProjects: Project[] = [];
let mockBlogPosts: BlogPost[] = [];
let mockOtherWorks: OtherWork[] = [];
let mockContents: Content[] = [];
let mockMessages: Message[] = [];
let mockMeetings: Meeting[] = [];
let mockSubscribers: Subscriber[] = [];

// Generate some mock data
for (let i = 1; i <= 10; i++) {
  mockProjects.push({
    id: i,
    title: `Project ${i}`,
    description: `This is a description for project ${i}`,
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    category: i % 2 === 0 ? 'Web Development' : 'UI/UX Design',
    imageUrl: `https://picsum.photos/seed/project${i}/800/600`,
    link: '#',
    featured: i <= 3,
    status: i <= 8 ? 'Published' : 'Draft',
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
  });
  
  mockBlogPosts.push({
    id: i,
    title: `Blog Post ${i}`,
    excerpt: `This is a short excerpt for blog post ${i}`,
    imageUrl: `https://picsum.photos/seed/blog${i}/800/600`,
    tags: ['Web Development', 'UI/UX', 'Career'],
    author: 'Gaurav Kr Sah',
    readTime: `${i + 2} min read`,
    status: i <= 7 ? 'Published' : 'Draft',
    featured: i <= 2,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
  });
}

// API functions
export const getProjects = () => {
  return Promise.resolve(mockProjects);
};

export const getProject = (id: number) => {
  const project = mockProjects.find(p => p.id === id);
  return Promise.resolve(project);
};

export const createProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newProject: Project = {
    ...project,
    id: mockProjects.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProjects.push(newProject);
  return Promise.resolve(newProject);
};

export const updateProject = (id: number, project: Partial<Project>) => {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProjects[index] = {
      ...mockProjects[index],
      ...project,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(mockProjects[index]);
  }
  return Promise.reject(new Error('Project not found'));
};

export const deleteProject = (id: number) => {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProjects = mockProjects.filter(p => p.id !== id);
    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Project not found'));
};

export const getBlogPosts = () => {
  return Promise.resolve(mockBlogPosts);
};

export const getBlogPost = (id: number) => {
  const post = mockBlogPosts.find(p => p.id === id);
  return Promise.resolve(post);
};

export const createBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newPost: BlogPost = {
    ...post,
    id: mockBlogPosts.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockBlogPosts.push(newPost);
  return Promise.resolve(newPost);
};

export const updateBlogPost = (id: number, post: Partial<BlogPost>) => {
  const index = mockBlogPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockBlogPosts[index] = {
      ...mockBlogPosts[index],
      ...post,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(mockBlogPosts[index]);
  }
  return Promise.reject(new Error('Blog post not found'));
};

export const deleteBlogPost = (id: number) => {
  const index = mockBlogPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockBlogPosts = mockBlogPosts.filter(p => p.id !== id);
    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Blog post not found'));
};

// Similar functions would be implemented for other content types
