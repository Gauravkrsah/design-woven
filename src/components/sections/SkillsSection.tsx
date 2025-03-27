
import React from 'react';

const SkillBadge = ({ name }: { name: string }) => {
  return (
    <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md">
      {name}
    </span>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-6">Education & Skills</h2>
      
      <div className="space-y-4 mb-8">
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-medium text-white">Ph.D. in Computer Science</h3>
              <p className="text-gray-400">Stanford University</p>
            </div>
            <span className="text-gray-400">2017</span>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-medium text-white">M.S. in Machine Learning</h3>
              <p className="text-gray-400">MIT</p>
            </div>
            <span className="text-gray-400">2015</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <SkillBadge name="Python" />
        <SkillBadge name="TensorFlow" />
        <SkillBadge name="PyTorch" />
        <SkillBadge name="Data Analysis" />
        <SkillBadge name="Machine Learning" />
        <SkillBadge name="Deep Learning" />
        <SkillBadge name="NLP" />
        <SkillBadge name="Cloud Computing" />
      </div>
    </section>
  );
};

export default SkillsSection;
