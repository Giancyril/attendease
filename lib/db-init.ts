import { query } from './db';

export async function initializeDatabase() {
  try {
    // ── Users table ──────────────────────────────────────────────────────────
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('[DB] Users table initialized');

    // ── Sessions table ───────────────────────────────────────────────────────
    await query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL
      )
    `);
    console.log('[DB] Sessions table initialized');

    // ── Employees table ──────────────────────────────────────────────────────
    await query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        employee_code VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        department VARCHAR(100) NOT NULL,
        position VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        avatar_initials VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('[DB] Employees table initialized');

    // ── Attendance records table ─────────────────────────────────────────────
    await query(`
      CREATE TABLE IF NOT EXISTS attendance_records (
        id SERIAL PRIMARY KEY,
        employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        clock_in TIME,
        clock_out TIME,
        status VARCHAR(50) DEFAULT 'present',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (employee_id, date)
      )
    `);
    console.log('[DB] Attendance records table initialized');

    // ── Leaves table ─────────────────────────────────────────────────────────
    await query(`
      CREATE TABLE IF NOT EXISTS leaves (
        id SERIAL PRIMARY KEY,
        employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        leave_type VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        reason TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        reviewed_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('[DB] Leaves table initialized');

    // ── Seed sample employees if table is empty ──────────────────────────────
    const empCheck = await query('SELECT COUNT(*) FROM employees');
    if (parseInt(empCheck.rows[0].count) === 0) {
      await query(`
        INSERT INTO employees (employee_code, full_name, email, phone, department, position, status, avatar_initials)
        VALUES
          ('EMP001', 'Sarah Johnson', 'sarah.johnson@company.com', '+1-555-0101', 'Engineering', 'Senior Developer', 'active', 'SJ'),
          ('EMP002', 'Michael Chen', 'michael.chen@company.com', '+1-555-0102', 'Engineering', 'Frontend Developer', 'active', 'MC'),
          ('EMP003', 'Alex Rodriguez', 'alex.rodriguez@company.com', '+1-555-0103', 'Design', 'UI/UX Designer', 'active', 'AR'),
          ('EMP004', 'Emma Thompson', 'emma.thompson@company.com', '+1-555-0104', 'QA', 'QA Engineer', 'active', 'ET'),
          ('EMP005', 'James Wilson', 'james.wilson@company.com', '+1-555-0105', 'DevOps', 'DevOps Engineer', 'active', 'JW'),
          ('EMP006', 'Priya Patel', 'priya.patel@company.com', '+1-555-0106', 'HR', 'HR Manager', 'active', 'PP'),
          ('EMP007', 'David Kim', 'david.kim@company.com', '+1-555-0107', 'Engineering', 'Backend Developer', 'active', 'DK'),
          ('EMP008', 'Lisa Martinez', 'lisa.martinez@company.com', '+1-555-0108', 'Marketing', 'Marketing Lead', 'active', 'LM')
      `);
      console.log('[DB] Sample employees seeded');
    }

    return true;
  } catch (error) {
    console.error('[DB] Failed to initialize database:', error);
    throw error;
  }
}
