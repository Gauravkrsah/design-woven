
import React, { useState } from 'react';
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
  Trash2
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
    <div className="h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-6 flex flex-col">
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

const projects = [
  { id: 1, title: 'E-commerce Platform Redesign', status: 'Published', date: '2023-06-15' },
  { id: 2, 'title': 'AI-Powered Content Generator', status: 'Draft', date: '2023-05-22' },
  { id: 3, 'title': 'Building Scalable Web Applications', status: 'Published', date: '2023-04-10' },
  { id: 4, 'title': 'Machine Learning in Production', status: 'Published', date: '2023-03-18' },
  { id: 5, 'title': 'Mobile App for Fitness Tracking', status: 'Draft', date: '2023-02-05' },
];

const blogPosts = [
  { id: 1, title: 'The Future of AI in Web Development', status: 'Published', date: '2023-06-15' },
  { id: 2, 'title': 'Designing for Accessibility', status: 'Draft', date: '2023-05-22' },
  { id: 3, 'title': 'The Rise of Web3 Technologies', status: 'Published', date: '2023-04-10' },
  { id: 4, 'title': 'Best Practices for React Performance', status: 'Published', date: '2023-03-18' },
  { id: 5, 'title': 'Creating Responsive Layouts with CSS Grid', status: 'Draft', date: '2023-02-05' },
];

const messages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', date: '2023-06-15', read: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Collaboration Opportunity', date: '2023-06-14', read: false },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Feedback on Website', date: '2023-06-12', read: true },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', subject: 'Job Position', date: '2023-06-10', read: false },
  { id: 5, name: 'David Brown', email: 'david@example.com', subject: 'Conference Invitation', date: '2023-06-08', read: true },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { toast } = useToast();
  
  const handleEdit = (id: number, type: string) => {
    toast({
      title: `Edit ${type}`,
      description: `Editing ${type} with ID: ${id}`,
    });
  };
  
  const handleDelete = (id: number, type: string) => {
    toast({
      title: `Delete ${type}`,
      description: `Successfully deleted ${type} with ID: ${id}`,
      variant: 'destructive',
    });
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-screen">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search..." 
                      className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="h-4 w-4 mr-2" /> New
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">42</h3>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    +12% from last month
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Blog Posts</p>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">18</h3>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    +5% from last month
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Messages</p>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">24</h3>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                    -3% from last month
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Meetings</p>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">8</h3>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    +2% from last month
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="projects" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-0 h-auto">
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
                
                <TabsContent value="projects" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
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
                                project.status === 'Published' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              }`}>
                                {project.status}
                              </span>
                            </TableCell>
                            <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => window.open(`/projects/${project.id}`, '_blank')}
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
                </TabsContent>
                
                <TabsContent value="blogs" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
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
                                post.status === 'Published' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              }`}>
                                {post.status}
                              </span>
                            </TableCell>
                            <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => window.open(`/blogs/${post.id}`, '_blank')}
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
                </TabsContent>
                
                <TabsContent value="messages" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
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
                            <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEdit(message.id, 'message')}
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
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
