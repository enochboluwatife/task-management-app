import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, loading, error, onEdit }) {
  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }
  if (error) {
    return <div className="text-center text-red-600 py-8">Failed to load tasks.</div>;
  }
  if (!tasks.length) {
    return <div className="text-center text-gray-500 py-8">No tasks found.</div>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default TaskList; 