'use client';

import { Priority, Status } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface TaskFiltersProps {
  priorityFilter: Priority | null;
  statusFilter: Status | null;
  onPriorityChange: (priority: Priority | null) => void;
  onStatusChange: (status: Status | null) => void;
  hasActiveFilters: boolean;
}

const priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];
const statuses: Status[] = ['todo', 'in-progress', 'completed', 'on-hold'];

export function TaskFilters({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
  hasActiveFilters,
}: TaskFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-900">Filters</span>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onPriorityChange(null);
              onStatusChange(null);
            }}
            className="text-xs text-blue-600 hover:text-blue-700 ml-auto flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => onPriorityChange(priorityFilter === p ? null : p)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                priorityFilter === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(statusFilter === s ? null : s)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {s
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
