
import React from 'react';
import { Sparkles, Download, FileText, MessageCircle } from 'lucide-react';

const ToolCard = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) => {
  return (
    <div className="p-4 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors mb-4">
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-72 min-h-screen bg-black border-l border-gray-800 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-amber-400 gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Tools I Made</span>
        </div>
      </div>

      <div className="space-y-6">
        <ToolCard 
          title="AI Interview Questions"
          description="Smart tool that generates role-specific interview questions for candidates"
        />
        
        <ToolCard 
          title="Job Description Generator"
          description="Automated tool that creates professional job descriptions from simple inputs"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-3 transition-colors">
          <Download className="w-5 h-5" />
          <span>Resume</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-3 transition-colors">
          <FileText className="w-5 h-5" />
          <span>View CV</span>
        </button>
      </div>

      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
