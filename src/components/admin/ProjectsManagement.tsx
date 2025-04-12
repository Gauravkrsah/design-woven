
import React, { useState } from 'react';
import BasePlaceholder from './BasePlaceholder';

const ProjectsManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProject = () => {
    setIsDialogOpen(true);
    // This would normally open a dialog for adding a project
    console.log("Opening add project dialog");
  };

  return (
    <BasePlaceholder
      title="Projects Management"
      description="Add, edit, and manage your portfolio projects"
      addButtonText="Add New Project"
      onAddClick={handleAddProject}
    />
  );
};

export default ProjectsManagement;
