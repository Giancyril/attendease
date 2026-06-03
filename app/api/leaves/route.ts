import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { initializeDatabase } from '@/lib/db-init';
import { validateSession, AUTH_COOKIE_NAME } from '@/lib/auth';
import { CreateLeaveInput } from '@/lib/types';

async function getUser(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return validateSession(token);
}

export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    const user = await getUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const employee_id = searchParams.get('employee_id') || '';

    let sql = `
      SELECT l.*, e.full_name AS employee_name, e.department
      FROM leaves l
      JOIN employees e ON l.employee_id = e.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let i = 1;

    if (status) {
      sql += ` AND l.status = $${i}`;
      params.push(status);
      i++;
    }
    if (employee_id) {
      sql += ` AND l.employee_id = $${i}`;
      params.push(parseInt(employee_id));
      i++;
    }

    sql += ` ORDER BY l.created_at DESC`;

    const result = await query(sql, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('[API] GET /leaves error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const user = await getUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body: CreateLeaveInput = await req.json();
    const { employee_id, leave_type, start_date, end_date, reason } = body;

    if (!employee_id || !leave_type || !start_date || !end_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [employee_id, leave_type, start_date, end_date, reason || null]
    );

    const record = result.rows[0];
    const empResult = await query('SELECT full_name, department FROM employees WHERE id = $1', [employee_id]);
    if (empResult.rows.length > 0) {
      record.employee_name = empResult.rows[0].full_name;
      record.department = empResult.rows[0].department;
    }

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('[API] POST /leaves error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
