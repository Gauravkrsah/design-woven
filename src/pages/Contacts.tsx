
import React, { useEffect } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const Contacts: React.FC = () => {
  useEffect(() => {
    document.title = "Contacts | Gaurav Kr Sah";
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <LeftSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Contacts</h1>
        <p className="text-gray-400">Contact information and form will be displayed here.</p>
      </main>
      <RightSidebar />
    </div>
  );
};

export default Contacts;
