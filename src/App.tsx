
import React from "react";
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
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { initializeDatabase } from './lib/services/firebaseService';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Initialize database when app loads
initializeDatabase().catch(console.error);

// Define window object type for our custom methods
declare global {
  interface Window {
    openSchedulePopup?: () => void;
    openMessagePopup?: () => void;
  }
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/other-works" element={<OtherWorks />} />
                <Route path="/other-works/:id" element={<OtherWorkDetail />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/contents" element={<Contents />} />
                <Route path="/contact" element={<Contacts />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                      </Routes>
                    </ProtectedRoute>
                  } 
                />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>

          {/* Toaster components for notifications */}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
