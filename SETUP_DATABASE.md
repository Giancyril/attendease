# Local PostgreSQL Setup Guide for Task Manager

## Quick Start - Database Setup

### Step 1: Install PostgreSQL

Choose your operating system:

#### **macOS**
```bash
# Using Homebrew
brew install postgresql@15
brew services start postgresql@15

# Verify installation
psql --version
```

#### **Windows**
1. Download installer from: https://www.postgresql.org/download/windows/
2. Run the installer and follow the prompts
3. Remember the password you set for the `postgres` user
4. PostgreSQL should start automatically

#### **Linux (Ubuntu/Debian)**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start the service
sudo service postgresql start

# Verify installation
psql --version
```

### Step 2: Create Database and User

Run this command:

```bash
psql -U postgres -c "CREATE DATABASE task_manager;"
```

Or connect to PostgreSQL and run:

```bash
psql -U postgres

# Then in the psql prompt, run:
CREATE DATABASE task_manager;
\q  # exit
```

### Step 3: Initialize Database Schema

Connect to the database and create the tables:

```bash
psql -U postgres -d task_manager
```

Then paste this SQL:

```sql
-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'todo',
    due_date TIMESTAMP,
    assignee VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Exit
\q
```

### Step 4: Configure Your Application

Edit `.env.local` file in your project root:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_manager
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

**For macOS (default Homebrew installation):**
```env
DATABASE_URL=postgresql://postgres@localhost:5432/task_manager
```

### Step 5: Run the Application

```bash
# Install dependencies (if not already done)
pnpm install

# Start the development server
pnpm dev
```

Visit http://localhost:3000 in your browser

## Troubleshooting

### Issue: "connect ECONNREFUSED 127.0.0.1:5432"

**Solution:** PostgreSQL is not running or not accessible.

```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# If that fails, start PostgreSQL:

# macOS
brew services start postgresql@15

# Windows (use pgAdmin or Services app to start PostgreSQL)

# Linux
sudo service postgresql start
```

### Issue: "FATAL: password authentication failed"

**Solution:** Your password in DATABASE_URL is incorrect.

```bash
# Reset the postgres password
psql -U postgres -c "ALTER USER postgres PASSWORD 'newpassword';"

# Update .env.local with the new password
DATABASE_URL=postgresql://postgres:newpassword@localhost:5432/task_manager
```

### Issue: "database 'task_manager' does not exist"

**Solution:** Create the database.

```bash
psql -U postgres -c "CREATE DATABASE task_manager;"
```

### Issue: "role 'postgres' does not exist"

**Solution:** This is rare but might happen on Linux. Create the role:

```bash
sudo -u postgres psql -c "CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'postgres';"
```

## Testing the Connection

Run this command to test your database connection:

```bash
# Linux/macOS
psql postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_manager -c "SELECT NOW();"

# If this works, your connection is correctly configured!
```

## Alternative: Using Docker for PostgreSQL

If you prefer not to install PostgreSQL locally, use Docker:

### Step 1: Install Docker
Download from: https://www.docker.com/products/docker-desktop

### Step 2: Create Docker Container

```bash
docker run --name task-manager-db \
  -e POSTGRES_DB=task_manager \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

### Step 3: Initialize Database

```bash
docker exec -it task-manager-db psql -U postgres -d task_manager << EOF
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'todo',
    due_date TIMESTAMP,
    assignee VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);
EOF
```

### Step 4: Update .env.local

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager
```

### Step 5: Run Application

```bash
pnpm dev
```

### Useful Docker Commands

```bash
# Check if container is running
docker ps

# Stop the container
docker stop task-manager-db

# Start the container again
docker start task-manager-db

# View logs
docker logs task-manager-db

# Remove the container
docker rm task-manager-db
```

## Database Management Tools

### pgAdmin (Web UI)

If you install pgAdmin, you can manage your database visually:

```bash
# macOS
brew install pgadmin4

# Then visit http://localhost:5050 in your browser
```

### DBeaver (Desktop App)

1. Download from: https://dbeaver.io/
2. Open DBeaver
3. Create new database connection
4. Select PostgreSQL
5. Fill in:
   - Host: localhost
   - Port: 5432
   - Database: task_manager
   - Username: postgres
   - Password: YOUR_PASSWORD

## Next Steps

Once your database is set up and the application is running:

1. Click the **"New Task"** button to create your first task
2. Fill in the task details (Title is required)
3. Click **"Create Task"**
4. Use the filters to organize your tasks by priority and status
5. Edit, delete, or mark tasks as complete as needed

## Support

If you encounter any issues:

1. Check the error message in the browser console (F12)
2. Check the server logs in your terminal
3. Verify PostgreSQL is running: `psql -U postgres -c "SELECT 1;"`
4. Verify the database exists: `psql -U postgres -l | grep task_manager`
5. Check your `.env.local` file for correct DATABASE_URL format

Happy task managing! 🚀
