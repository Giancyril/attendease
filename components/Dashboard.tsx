'use client';

import { useEffect, useState } from 'react';
import { Task, CreateTaskInput, Priority, Status } from '@/lib/types';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { TaskFilters } from '@/components/TaskFilters';
import { StatsOverview } from '@/components/StatsOverview';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (priorityFilter) params.append('priority', priorityFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/tasks?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('[Dashboard] Fetch error:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [priorityFilter, statusFilter]);

  // Create or update task
  const handleSubmit = async (data: CreateTaskInput) => {
    try {
      if (editingTask) {
        // Update task
        const response = await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to update task');
        const updated = await response.json();
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
      } else {
        // Create new task
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create task');
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
      }

      setShowForm(false);
      setEditingTask(undefined);
    } catch (err) {
      console.error('[Dashboard] Submit error:', err);
      alert('Error saving task. Please try again.');
    }
  };

  // Delete task
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('[Dashboard] Delete error:', err);
      alert('Error deleting task. Please try again.');
    }
  };

  // Change task status
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      const updated = await response.json();
      setTasks(tasks.map(t => t.id === updated.id ? updated : t));
    } catch (err) {
      console.error('[Dashboard] Status change error:', err);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const hasActiveFilters = priorityFilter !== null || statusFilter !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600 mt-1">Organize and track your tasks efficiently</p>
            </div>
            <Button
              onClick={() => {
                setEditingTask(undefined);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8">
          <StatsOverview tasks={tasks} />
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-2xl w-full">
              <TaskForm
                task={editingTask}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sticky top-4">
              <TaskFilters
                priorityFilter={priorityFilter}
                statusFilter={statusFilter}
                onPriorityChange={setPriorityFilter}
                onStatusChange={setStatusFilter}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>

          {/* Main Content - Task List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-400">Loading tasks...</div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600">{error}</div>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
