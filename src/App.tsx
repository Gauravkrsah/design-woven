
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import OtherWorks from "./pages/OtherWorks";
import OtherWorkDetail from "./pages/OtherWorkDetail";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contents from "./pages/Contents";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/Login";
import { ThemeProvider } from '@/hooks/use-theme';
import { setQueryClientForAPI } from './lib/services/apiService';
import { initializeDatabase } from './lib/services/firebaseService';

// Auth context for admin access
export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// Declare window object type to include our custom methods
declare global {
  interface Window {
    openSchedulePopup?: () => void;
    openMessagePopup?: () => void;
    openChatPopup?: () => void;
    openSubscribePopup?: () => void;
  }
}

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/gaurav3690/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if there's already an auth token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
    
    // Initialize API service with query client
    setQueryClientForAPI(queryClient);
    
    // Initialize Firebase database
    initializeDatabase().then(success => {
      if (success) {
        console.log("Firebase database initialized successfully");
      } else {
        console.error("Failed to initialize Firebase database");
      }
    });
  }, [queryClient]);

  const login = (username: string, password: string) => {
    // Simple authentication (in a real app, this would be an API call)
    if (username === "admin" && password === "admin123") {
      localStorage.setItem('admin_token', 'admin_authenticated');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/other-works" element={<OtherWorks />} />
                <Route path="/other-works/:id" element={<OtherWorkDetail />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/contents" element={<Contents />} />
                <Route path="/contacts" element={<Contacts />} />
                
                {/* Admin routes with protection */}
                <Route path="/gaurav3690/login" element={<AdminLogin />} />
                <Route path="/gaurav3690" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
