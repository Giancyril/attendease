# Quick Start Guide

Get TaskFlow running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env.local` file:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskflow
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Create Database
```bash
# Using psql
createdb taskflow

# Or using SQL
CREATE DATABASE taskflow;
```

### 4. Initialize Database Tables
```bash
npm run init-db
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Open Application
Navigate to: http://localhost:3000

## First Use

1. **Sign Up**: Create your account at `/signup`
2. **Create Task**: Click "New Task" button
3. **Explore**: Check out Analytics, Team, Settings pages

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production server

# Database
npm run init-db          # Initialize/reset database

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
```

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env.local`
- Ensure database exists

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev
```

## Next Steps

- Read the [Features](FEATURES.md) documentation
- Check [API Documentation](API_DOCUMENTATION.md)
- Review [Functionality Tests](FUNCTIONALITY_TEST.md)
- See [Deployment Guide](DEPLOYMENT_GUIDE.md)

## Need Help?

- Check the [Help & Support](/help) page
- Review [FAQ](FUNCTIONALITY_TEST.md#faq)
- Open an issue on GitHub
