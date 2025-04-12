
import React, { useState } from 'react';
import BasePlaceholder from './BasePlaceholder';

const OtherWorksManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWork = () => {
    setIsDialogOpen(true);
    // This would normally open a dialog for adding other work
    console.log("Opening add work dialog");
  };

  return (
    <BasePlaceholder
      title="Other Works Management"
      description="Manage your designs, consultations, and other professional work"
      addButtonText="Add New Work"
      onAddClick={handleAddWork}
    />
  );
};

export default OtherWorksManagement;
