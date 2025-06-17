import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { taskService } from '../services/taskService';
import TaskList from '../components/Tasks/TaskList';
import TaskModal from '../components/Tasks/TaskModal';
import KanbanBoard from '../components/Tasks/KanbanBoard';
import TaskStats from '../components/Dashboard/TaskStats';
import AdminPanel from '../components/Dashboard/AdminPanel';
import { List, Kanban, BarChart3, Plus } from 'lucide-react';

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];
const priorityOptions = [
  { label: 'All', value: '' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

function Dashboard() {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [showStats, setShowStats] = useState(false);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, isError } = useQuery(
    ['tasks', { status, priority }],
    () => taskService.getTasks({ status, priority })
  );

  const handleOpenModal = (task = null) => {
    setEditTask(task);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setEditTask(null);
    setShowModal(false);
  };
  const handleTaskSaved = () => {
    queryClient.invalidateQueries('tasks');
    queryClient.invalidateQueries('taskStats');
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      {/* Admin Panel */}
      <AdminPanel />

      {/* Task Statistics */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Task Overview</h2>
          <button
            onClick={() => setShowStats(!showStats)}
            className="btn-secondary flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
        {showStats && <TaskStats />}
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="input w-36"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              className="input w-36"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              {priorityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4 inline mr-1" />
                List
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Kanban className="h-4 w-4 inline mr-1" />
                Kanban
              </button>
            </div>
            
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={() => handleOpenModal()}
            >
              <Plus className="h-4 w-4" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Task View */}
      {viewMode === 'list' ? (
        <TaskList
          tasks={tasks}
          loading={isLoading}
          error={isError}
          onEdit={handleOpenModal}
        />
      ) : (
        <KanbanBoard
          tasks={tasks}
          onEdit={handleOpenModal}
        />
      )}

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          open={showModal}
          onClose={handleCloseModal}
          onSaved={handleTaskSaved}
          task={editTask}
        />
      )}
    </div>
  );
}

export default Dashboard; 