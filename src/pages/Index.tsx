
import React, { useEffect } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MainContent from '@/components/layout/MainContent';

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "Gaurav Kr Sah | Portfolio";
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default Index;
