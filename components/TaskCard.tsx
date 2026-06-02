'use client';

import { Task, Priority } from '@/lib/types';
import { Trash2, Edit2, CheckCircle2, Circle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusColors: Record<string, string> = {
  'todo': 'text-gray-500',
  'in-progress': 'text-blue-500',
  'completed': 'text-green-500',
  'on-hold': 'text-yellow-500',
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const dueDate = task.due_date ? new Date(task.due_date).toLocaleDateString() : null;
  const isCompleted = task.status === 'completed';

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        {/* Header with title and status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={() => onStatusChange(task.id, isCompleted ? 'todo' : 'completed')}
              className="mt-1 flex-shrink-0"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tags and metadata */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Priority Badge */}
          <div className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${priorityColors[task.priority as Priority]}`}>
            <Flag className="w-3 h-3" />
            {task.priority}
          </div>

          {/* Status Badge */}
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColors[task.status]}`}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>

          {/* Assignee */}
          {task.assignee && (
            <div className="text-xs bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">
              👤 {task.assignee}
            </div>
          )}
        </div>

        {/* Due date */}
        {dueDate && (
          <div className="text-xs text-gray-500">
            📅 Due: {dueDate}
          </div>
        )}
      </div>
    </Card>
  );
}
