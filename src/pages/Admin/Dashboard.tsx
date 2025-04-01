
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Video, 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  BarChart4,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ThemeProvider } from '@/hooks/use-theme';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { format } from 'date-fns';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiService from '@/lib/services/apiService';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
    { icon: <FileText size={18} />, label: 'Blog Posts' },
    { icon: <FolderOpen size={18} />, label: 'Projects' },
    { icon: <Video size={18} />, label: 'Content' },
    { icon: <Users size={18} />, label: 'Clients' },
    { icon: <MessageSquare size={18} />, label: 'Messages' },
    { icon: <Calendar size={18} />, label: 'Schedule' },
  ];

  return (
    <div className="h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-6 flex flex-col hidden lg:flex">
      <div className="px-6 flex items-center gap-2 mb-8">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
        <div className="font-semibold text-lg text-gray-900 dark:text-white">Admin Panel</div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  item.active 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto px-3">
        <Separator className="my-4" />
        <ul className="space-y-1">
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Settings size={18} />
              Settings
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOut size={18} />
              Logout
            </a>
          </li>
        </ul>
        
        <div className="mt-4 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">G</span>
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Gaurav</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

const MobileTopBar = () => {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
        <div className="font-semibold text-lg text-gray-900 dark:text-white">Admin Panel</div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="icon">
          <Menu size={18} />
        </Button>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: string } | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Set the query client for API service
  useEffect(() => {
    apiService.setQueryClientForAPI(queryClient);
  }, [queryClient]);
  
  // Fetch dashboard stats
  const { 
    data: dashboardStats, 
    isLoading: isLoadingStats 
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats
  });
  
  // Fetch projects
  const { 
    data: projects, 
    isLoading: isLoadingProjects 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: apiService.getProjects
  });
  
  // Fetch blog posts
  const { 
    data: blogPosts, 
    isLoading: isLoadingBlogPosts 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: apiService.getBlogPosts
  });
  
  // Fetch messages
  const { 
    data: messages, 
    isLoading: isLoadingMessages 
  } = useQuery({
    queryKey: ['messages'],
    queryFn: apiService.getMessages
  });
  
  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteProject(id),
    onSuccess: () => {
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });
  
  // Delete blog post mutation
  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteBlogPost(id),
    onSuccess: () => {
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });
  
  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteMessage(id),
    onSuccess: () => {
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete message: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });
  
  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => apiService.markMessageAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to mark message as read: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });
  
  const handleEdit = (id: string, type: string) => {
    toast({
      title: `Edit ${type}`,
      description: `Editing ${type} with ID: ${id}`,
    });
  };
  
  const handleDelete = (id: string, type: string) => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    const { id, type } = itemToDelete;
    
    if (type === 'project') {
      deleteProjectMutation.mutate(id);
    } else if (type === 'blog post') {
      deleteBlogPostMutation.mutate(id);
    } else if (type === 'message') {
      deleteMessageMutation.mutate(id);
    }
    
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  const handleView = (id: string, type: string) => {
    if (type === 'message') {
      markAsReadMutation.mutate(id);
      
      const message = messages?.find(m => m.id === id);
      if (message) {
        toast({
          title: message.subject,
          description: message.message,
        });
      }
    } else {
      // Redirect to the appropriate page for other types
      const path = type === 'project' ? `/projects/${id}` : type === 'blog post' ? `/blogs/${id}` : '';
      if (path) window.open(path, '_blank');
    }
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-hidden flex flex-col">
          <MobileTopBar />
          <ScrollArea className="h-screen">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search..." 
                      className="pl-10 pr-4 py-2 w-full md:w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="h-4 w-4 mr-2" /> New
                  </Button>
                </div>
              </div>
              
              {isLoadingStats ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
                </div>
              ) : dashboardStats ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{dashboardStats.projects.total}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Published:</span>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">{dashboardStats.projects.published}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Draft:</span>
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{dashboardStats.projects.draft}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Blog Posts</p>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{dashboardStats.blogPosts.total}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Published:</span>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">{dashboardStats.blogPosts.published}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Draft:</span>
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{dashboardStats.blogPosts.draft}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Messages</p>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{dashboardStats.messages.total}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Unread:</span>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{dashboardStats.messages.unread}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Videos</p>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{dashboardStats.videos.total}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                        <Video className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Published:</span>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">{dashboardStats.videos.published}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Draft:</span>
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{dashboardStats.videos.draft}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 flex items-center gap-3 mb-6">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Could not load dashboard statistics. Please try again later.</p>
                </div>
              )}
              
              <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-0 h-auto">
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex-1 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="projects" 
                    className="flex-1 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger 
                    value="blogs" 
                    className="flex-1 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Blog Posts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="messages" 
                    className="flex-1 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Messages
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                    
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">New blog post published</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">The Future of JavaScript Frameworks</p>
                          </div>
                          <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">New message received</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">From: Jane Smith</p>
                          </div>
                          <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">3 hours ago</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <FolderOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Project updated</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">E-commerce Platform</p>
                          </div>
                          <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {isLoadingProjects ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
                      </div>
                    ) : projects && projects.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">ID</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {projects.map((project) => (
                              <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.id}</TableCell>
                                <TableCell>{project.title}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    project.status === 'published' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                  }`}>
                                    {project.status}
                                  </span>
                                </TableCell>
                                <TableCell>{format(new Date(project.createdAt), 'MMM d, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleView(project.id, 'project')}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleEdit(project.id, 'project')}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                      onClick={() => handleDelete(project.id, 'project')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <FolderOpen className="h-10 w-10 text-gray-400 mb-2" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get started by adding your first project.</p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" /> Add Project
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="blogs" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {isLoadingBlogPosts ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
                      </div>
                    ) : blogPosts && blogPosts.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">ID</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {blogPosts.map((post) => (
                              <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    post.status === 'published' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                  }`}>
                                    {post.status}
                                  </span>
                                </TableCell>
                                <TableCell>{format(new Date(post.createdAt), 'MMM d, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleView(post.id, 'blog post')}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleEdit(post.id, 'blog post')}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                      onClick={() => handleDelete(post.id, 'blog post')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No blog posts found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get started by adding your first blog post.</p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" /> Add Blog Post
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="messages" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {isLoadingMessages ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
                      </div>
                    ) : messages && messages.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">ID</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {messages.map((message) => (
                              <TableRow key={message.id} className={message.read ? '' : 'bg-blue-50/50 dark:bg-blue-900/10'}>
                                <TableCell className="font-medium">{message.id}</TableCell>
                                <TableCell>{message.name}</TableCell>
                                <TableCell>{message.email}</TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    {!message.read && (
                                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                                    )}
                                    {message.subject}
                                  </div>
                                </TableCell>
                                <TableCell>{format(new Date(message.createdAt), 'MMM d, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleView(message.id, 'message')}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                      onClick={() => handleDelete(message.id, 'message')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <MessageSquare className="h-10 w-10 text-gray-400 mb-2" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No messages found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Messages from your contact form will appear here.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {itemToDelete?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ThemeProvider>
  );
};

export default Dashboard;
