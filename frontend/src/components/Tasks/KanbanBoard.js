import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from 'react-query';
import { taskService } from '../../services/taskService';
import { Edit, Trash2 } from 'lucide-react';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' },
];

function KanbanBoard({ tasks, onEdit }) {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation(
    ({ taskId, updates }) => taskService.updateTask(taskId, updates),
    {
      onSuccess: () => queryClient.invalidateQueries('tasks'),
    }
  );

  const deleteMutation = useMutation(
    (taskId) => taskService.deleteTask(taskId),
    {
      onSuccess: () => queryClient.invalidateQueries('tasks'),
    }
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    const task = tasks.find(t => t.id.toString() === draggableId);
    if (!task) return;

    updateTaskMutation.mutate({
      taskId: task.id,
      updates: { status: destination.droppableId }
    });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-200 text-green-800',
      medium: 'bg-yellow-200 text-yellow-800',
      high: 'bg-orange-200 text-orange-800',
      critical: 'bg-red-200 text-red-800',
    };
    return colors[priority] || 'bg-gray-200 text-gray-800';
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className={`${column.color} p-4 rounded-lg`}>
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <p className="text-sm text-gray-600">
                {getTasksByStatus(column.id).length} tasks
              </p>
            </div>
            
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[400px] p-2 rounded-lg ${
                    snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-4 rounded-lg shadow-sm border mb-3 ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm truncate flex-1 mr-2">
                              {task.title}
                            </h4>
                            <div className="flex gap-1">
                              <button
                                onClick={() => onEdit(task)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => deleteMutation.mutate(task.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                                disabled={deleteMutation.isLoading}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          
                          {task.description && (
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap gap-1">
                            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            {task.due_date && (
                              <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">
                                {new Date(task.due_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard; 