# Deployment & Setup Guide

## Local Development (What You Have Now)

### Quick Start
```bash
cd /vercel/share/v0-project
pnpm dev
# Open http://localhost:3000
# Login with: demo / demo123
```

**What Works:**
- Full login/signup flow
- Demo user authentication
- Sidebar navigation
- Task CRUD operations
- Filtering and statistics
- Mobile responsive design

---

## Production Setup with PostgreSQL

### Step 1: Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL if not already installed
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Start PostgreSQL service
sudo service postgresql start

# Create database
createdb task_manager

# Create user
createuser -P task_manager_user
# Enter password when prompted
```

**Option B: Cloud PostgreSQL (Recommended for deployment)**
- Neon (https://neon.tech)
- Supabase (https://supabase.com)
- AWS RDS (https://aws.amazon.com/rds)
- Railway (https://railway.app)

### Step 2: Update Environment Variables

Create/update `.env.local`:
```env
# Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/task_manager

# Or for Neon:
# DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/task_manager

# Optional: Node Environment
NODE_ENV=development
```

### Step 3: Initialize Database Schema

```bash
# Run the initialization script
node -e "require('./lib/db-init.ts').initializeDatabase()"
```

Or manually in psql:
```sql
-- Connect to database
psql -U postgres -d task_manager

-- Create tables (see lib/db-init.ts for full schema)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'todo',
  due_date TIMESTAMP,
  assignee VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 4: Seed Demo User

Run the seed script:
```bash
chmod +x seed-db.sh
./seed-db.sh
```

Or manually create a demo user via the signup page.

### Step 5: Test Locally

```bash
pnpm dev
# Test login/signup with real database
# Create new tasks
# Verify persistence
```

---

## Deployment to Vercel

### Option 1: Deploy from GitHub

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Task Manager app"
git remote add origin https://github.com/yourname/task-manager.git
git push -u origin main
```

2. **Connect to Vercel:**
- Visit https://vercel.com/new
- Select your GitHub repository
- Click Import

3. **Configure Environment Variables:**
- Click "Environment Variables"
- Add `DATABASE_URL` with your PostgreSQL connection string
- Click Deploy

4. **Post-Deployment:**
```bash
# Initialize database on production
# You may need to do this manually or via a setup route

# Run seed script if you set up psql access
./seed-db.sh (pointing to production database)
```

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to configure
# Add environment variables when prompted

# Deploy to production
vercel --prod
```

---

## Deployment to Other Platforms

### Railway

1. Create account at https://railway.app
2. Create new PostgreSQL database
3. Create new service > Deploy from GitHub
4. Link database
5. Add `DATABASE_URL` environment variable
6. Deploy

### AWS

1. Create RDS PostgreSQL instance
2. Create EC2 instance or use AWS App Runner
3. Configure security groups
4. Deploy Next.js app
5. Add database credentials as environment variables

---

## Production Checklist

- [ ] Database is set up and accessible
- [ ] DATABASE_URL environment variable is configured
- [ ] Database schema is initialized
- [ ] At least one user exists (demo or real)
- [ ] HTTPS is enabled
- [ ] Cookies are set to secure mode (automatic in production)
- [ ] Error logging is configured (optional)
- [ ] Backups are scheduled
- [ ] Monitor database performance
- [ ] Set up application monitoring (Sentry, DataDog, etc.)

---

## SSL/TLS Certificate

Most platforms (Vercel, Railway, AWS) provide free SSL certificates automatically.

For custom domains:
- Use Let's Encrypt (free)
- Configure in your server/CDN
- Renew certificates automatically

---

## Database Backups

### PostgreSQL Backups

```bash
# Full backup
pg_dump task_manager > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql task_manager < backup.sql
```

### Cloud Database Backups

Most cloud providers (Neon, Supabase, RDS) handle backups automatically.

---

## Performance Optimization

### Database Indexes
```sql
-- Add indexes for common queries
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
```

### Caching (Optional)
- Add Redis for session caching
- Implement task list caching
- Use Next.js Image Optimization

### CDN
- Enable Vercel Edge Caching
- Serve static assets from CDN

---

## Monitoring & Logging

### Application Logging
```typescript
// Logs go to stdout/stderr
console.log('[APP] Important event')
console.error('[ERROR] Something went wrong')
```

### Error Tracking (Optional)
- Sentry: https://sentry.io
- LogRocket: https://logrocket.com
- Datadog: https://datadog.com

---

## Troubleshooting

### "Database connection refused"
- Check DATABASE_URL format
- Verify database is running
- Check firewall/security groups
- Verify username/password

### "Sessions table doesn't exist"
- Run database initialization script
- Check migration logs

### "Demo login doesn't work"
- Check if database connection is working
- Login should fall back to demo mode automatically
- Check browser console for errors

### Slow performance
- Check database query performance
- Add indexes if needed
- Monitor database connection pool
- Check for N+1 queries

---

## Rollback Procedure

If something goes wrong:

1. **Vercel:**
   - Go to Deployments tab
   - Click "Redeploy" on previous version
   - Or use `vercel --prod --name=previous`

2. **Database Issues:**
   - Restore from backup
   - `psql task_manager < backup.sql`

3. **Code Issues:**
   - Check error logs
   - Debug locally first
   - Fix and redeploy

---

## Support & Help

- Documentation: See other .md files in project
- GitHub Issues: Create issue in repository
- Community: Stack Overflow, Reddit
- Professional Help: Contact Vercel support

---

## Next Steps After Deployment

1. Create real user accounts
2. Set up custom domain
3. Configure email notifications (optional)
4. Set up monitoring and alerting
5. Plan feature roadmap
6. Gather user feedback
7. Implement analytics

Enjoy your production Task Manager! 🎉
