
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { ThemeProvider } from '@/hooks/use-theme';
import { initWebSocket, closeWebSocket } from './lib/services/websocketService';
import { setQueryClientForAPI } from './lib/services/apiService';

// Declare window object type to include our custom methods
declare global {
  interface Window {
    openSchedulePopup?: () => void;
    openMessagePopup?: () => void;
  }
}

const App: React.FC = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // Initialize API service with query client
    setQueryClientForAPI(queryClient);
    
    // Initialize WebSocket
    initWebSocket();
    
    // Clean up on unmount
    return () => {
      closeWebSocket();
    };
  }, [queryClient]);

  return (
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
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
