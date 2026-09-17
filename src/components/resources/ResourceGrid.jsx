import React from 'react';
import ResourceCard from './ResourceCard';

export const ResourceGrid = ({ resources = [], onEdit, onDelete, onUpvote }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {resources.map((resource) => (
        <ResourceCard
          key={resource._id || resource.id}
          resource={resource}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpvote={onUpvote}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;
