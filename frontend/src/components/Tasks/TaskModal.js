import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';

const statusOptions = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];
const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

function TaskModal({ open, onClose, onSaved, task }) {
  const isEdit = Boolean(task);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        due_date: task.due_date ? task.due_date.slice(0, 10) : '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        due_date: '',
      });
    }
  }, [isEdit, task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Prepare the data for the backend
      const taskData = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        status: form.status,
        priority: form.priority,
        due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
      };
      
      if (isEdit) {
        await taskService.updateTask(task.id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      onSaved();
    } catch (err) {
      // Handle Pydantic validation errors
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Multiple validation errors
          setError(err.response.data.detail.map(e => e.msg).join(', '));
        } else {
          // Single error message
          setError(err.response.data.detail);
        }
      } else {
        setError('Failed to save task.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Task' : 'New Task'}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">{error}</div>}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              className="input"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="input"
              value={form.description}
              onChange={handleChange}
              rows={3}
              maxLength={500}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="input"
                value={form.status}
                onChange={handleChange}
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                name="priority"
                className="input"
                value={form.priority}
                onChange={handleChange}
              >
                {priorityOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              name="due_date"
              type="date"
              className="input"
              value={form.due_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal; 