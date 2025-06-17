import React from 'react';
import { useQuery } from 'react-query';
import { taskService } from '../../services/taskService';
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';

function TaskStats() {
  const { data: stats, isLoading, error } = useQuery(
    'taskStats',
    () => taskService.getTaskStats()
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center text-red-600">
        Failed to load statistics
      </div>
    );
  }

  const { status_stats, priority_stats, total_tasks } = stats || {};

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'todo': return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default: return <BarChart3 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{total_tasks || 0}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {Object.entries(status_stats || {}).map(([status, count]) => (
          <div key={status} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 capitalize">
                  {status.replace('_', ' ')}
                </p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
              {getStatusIcon(status)}
            </div>
          </div>
        ))}
      </div>

      {/* Priority Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Priority Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(priority_stats || {}).map(([priority, count]) => (
            <div key={priority} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${getPriorityColor(priority)}`}>
                <span className="text-lg font-semibold">{count}</span>
              </div>
              <p className="text-sm font-medium capitalize">{priority}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Status Progress</h3>
        <div className="space-y-4">
          {Object.entries(status_stats || {}).map(([status, count]) => {
            const percentage = total_tasks > 0 ? (count / total_tasks) * 100 : 0;
            return (
              <div key={status}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium capitalize">
                    {status.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskStats; 