import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { CreateTaskInput } from '@/lib/types';

// Mock data for demo purposes when database is unavailable
let MOCK_TASKS = [
  {
    id: 1,
    title: 'Design dashboard mockups',
    description: 'Create wireframes and visual mockups for the task manager dashboard',
    priority: 'high',
    status: 'in-progress',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: 'Sarah Johnson',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Setup PostgreSQL database',
    description: 'Install and configure PostgreSQL for the project',
    priority: 'urgent',
    status: 'todo',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: 'Mike Chen',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'API development and testing',
    description: 'Build and test all CRUD endpoints',
    priority: 'high',
    status: 'in-progress',
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: 'Alex Rodriguez',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Write documentation',
    description: 'Complete README and setup guides',
    priority: 'medium',
    status: 'completed',
    due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: 'Emma Thompson',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Deploy to production',
    description: 'Deploy the application to production environment',
    priority: 'urgent',
    status: 'on-hold',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: 'James Wilson',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let nextMockId = 6;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
    const params: any[] = [];

    if (status || priority) {
      const conditions = [];
      if (status) {
        conditions.push('status = $1');
        params.push(status);
      }
      if (priority) {
        conditions.push(`priority = $${params.length + 1}`);
        params.push(priority);
      }
      sql = `SELECT * FROM tasks WHERE ${conditions.join(' AND ')} ORDER BY created_at DESC`;
    }

    const result = await query(sql, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('[API] GET /api/tasks error:', error);
    console.log('[API] Using mock data for demonstration');
    
    // Use mock data when database is unavailable
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let filtered = MOCK_TASKS;
    
    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }
    if (priority) {
      filtered = filtered.filter(t => t.priority === priority);
    }
    
    return NextResponse.json(filtered);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskInput = await request.json();
    const { title, description, priority = 'medium', status = 'todo', due_date, assignee } = body;

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO tasks (title, description, priority, status, due_date, assignee)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description || null, priority, status, due_date || null, assignee || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('[API] POST /api/tasks error:', error);
    console.log('[API] Using mock mode - task saved in memory only (not persistent)');
    
    // Demo mode fallback
    const body: CreateTaskInput = await request.json();
    const { title, description, priority = 'medium', status = 'todo', due_date, assignee } = body;

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const newTask = {
      id: nextMockId++,
      title,
      description: description || undefined,
      priority,
      status,
      due_date: due_date || undefined,
      assignee: assignee || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    MOCK_TASKS.unshift(newTask);
    return NextResponse.json(newTask, { status: 201 });
  }
}
