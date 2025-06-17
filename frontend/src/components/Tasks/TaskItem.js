import React from 'react';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { taskService } from '../../services/taskService';

function TaskItem({ task, onEdit }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(() => taskService.deleteTask(task.id), {
    onSuccess: () => queryClient.invalidateQueries('tasks'),
  });

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: 'bg-gray-100 text-gray-800 border-gray-200',
      in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
      done: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done': return '✓';
      case 'in_progress': return '⟳';
      case 'todo': return '○';
      default: return '○';
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date();

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 relative group">
      {/* Priority indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-lg ${
        task.priority === 'critical' ? 'bg-red-500' :
        task.priority === 'high' ? 'bg-orange-500' :
        task.priority === 'medium' ? 'bg-yellow-500' :
        'bg-green-500'
      }`} />
      
      <div className="pl-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg truncate flex-1 mr-2" title={task.title}>
            {task.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
              onClick={() => onEdit(task)}
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
              onClick={() => deleteMutation.mutate()}
              title="Delete"
              disabled={deleteMutation.isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 text-sm text-gray-700 min-h-[2.5rem]">
          {task.description ? (
            <p className="line-clamp-2">{task.description}</p>
          ) : (
            <span className="italic text-gray-400">No description</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
            {getStatusIcon(task.status)} {task.status.replace('_', ' ')}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {/* Due Date */}
        {task.due_date && (
          <div className={`flex items-center gap-1 text-xs ${
            isOverdue ? 'text-red-600' : 'text-gray-600'
          }`}>
            <Calendar className="h-3 w-3" />
            <span>
              Due: {new Date(task.due_date).toLocaleDateString()}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
          <Clock className="h-3 w-3" />
          <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskItem; 