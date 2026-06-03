import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { initializeDatabase } from '@/lib/db-init';
import { validateSession, AUTH_COOKIE_NAME } from '@/lib/auth';

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

    // Fetch the last 30 attendance records for each employee to calculate streaks
    // Assuming streaks rarely go above 30 without a weekend break, but weekends don't count?
    // Actually, simple consecutive 'present' entries regardless of date gaps (ignoring weekends)
    // To keep it simple, we just count consecutive 'present' in their most recent records.
    
    const result = await query(`
      SELECT employee_id, status, date 
      FROM attendance_records 
      ORDER BY employee_id, date DESC
    `);
    
    const recordsByEmployee: Record<number, any[]> = {};
    for (const row of result.rows) {
      if (!recordsByEmployee[row.employee_id]) {
        recordsByEmployee[row.employee_id] = [];
      }
      recordsByEmployee[row.employee_id].push(row);
    }
    
    const streaks: Record<number, number> = {};
    for (const [empIdStr, records] of Object.entries(recordsByEmployee)) {
      const empId = parseInt(empIdStr);
      let streak = 0;
      for (const rec of records) {
        if (rec.status === 'present') {
          streak++;
        } else if (rec.status === 'holiday') {
          // skip holidays, they don't break the streak
          continue;
        } else {
          // any other status breaks the streak
          break;
        }
      }
      streaks[empId] = streak;
    }

    return NextResponse.json(streaks);
  } catch (error) {
    console.error('[API] GET /employees/streaks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
