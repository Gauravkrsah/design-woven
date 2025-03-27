
import React, { useEffect } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const Projects: React.FC = () => {
  useEffect(() => {
    document.title = "Projects | Gaurav Kr Sah";
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <LeftSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <p className="text-gray-400">My featured projects will be displayed here.</p>
      </main>
      <RightSidebar />
    </div>
  );
};

export default Projects;
