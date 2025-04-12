
import React from 'react';
import BasePlaceholder from './BasePlaceholder';

const MessagesManagement: React.FC = () => {
  const handleViewMessages = () => {
    // This would normally navigate or open a dialog to view messages
    console.log("Viewing messages");
  };

  return (
    <BasePlaceholder
      title="Messages Management"
      description="View and respond to contact form submissions"
      addButtonText="View All Messages"
      onAddClick={handleViewMessages}
    />
  );
};

export default MessagesManagement;
