# CRUD Operations Verification Checklist

## ✅ Database Setup Status
- **Database Name:** taskflow
- **Database Password:** aech123
- **Connection:** postgresql://postgres:aech123@localhost:5432/taskflow
- **Status:** ✅ Tables initialized successfully

## 📊 Database Schema

### Users Table
- **CREATE**: Signup functionality (`/api/auth/signup`)
- **READ**: Get current user (`/api/auth/me`)
- Stores: id, username, email, password_hash, full_name, avatar_url, created_at, updated_at

### Sessions Table
- **CREATE**: Login functionality (`/api/auth/login`)
- **DELETE**: Logout functionality (`/api/auth/logout`)
- Stores: id, user_id, token, created_at, expires_at

### Tasks Table
- **CREATE**: Add new task (`POST /api/tasks`)
- **READ**: Get all tasks (`GET /api/tasks`)
- **READ**: Get single task (`GET /api/tasks/[id]`)
- **UPDATE**: Update task (`PUT /api/tasks/[id]`)
- **DELETE**: Delete task (`DELETE /api/tasks/[id]`)
- Stores: id, user_id, title, description, priority, status, due_date, assignee, created_at, updated_at

## 🧪 Testing Instructions

### 1. Application Access
- **URL:** http://localhost:3000
- **Server Status:** ✅ Running on port 3000

### 2. Authentication Tests (User CRUD)

#### CREATE User (Signup)
1. Navigate to: http://localhost:3000/signup
2. Fill in the form:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
   - Full Name: Test User
3. Click "Sign Up"
4. Expected: Account created, redirected to dashboard

#### READ User (Get Current User)
1. After login, the app automatically fetches current user data
2. API Endpoint: `GET /api/auth/me`
3. Expected: User profile displayed

#### Login (CREATE Session)
1. Navigate to: http://localhost:3000/login
2. Enter credentials:
   - Username: testuser
   - Password: test123
3. Click "Login"
4. Expected: Logged in, redirected to dashboard

#### Logout (DELETE Session)
1. Click logout button in sidebar
2. API Endpoint: `POST /api/auth/logout`
3. Expected: Session cleared, redirected to login page

### 3. Task CRUD Operations

#### CREATE Task
1. Navigate to dashboard: http://localhost:3000/dashboard
2. Click "Add Task" or "+" button
3. Fill in the form:
   - **Title:** "Test Task" (Required)
   - **Description:** "This is a test task"
   - **Priority:** Select from dropdown (low, medium, high, urgent)
   - **Status:** Select from dropdown (todo, in-progress, completed, on-hold)
   - **Due Date:** Select a date
   - **Assignee:** Enter a name
4. Click "Create Task" or "Save"
5. Expected Result:
   - Task appears in the task list
   - Success notification displayed
   - Database receives: `INSERT INTO tasks (...) VALUES (...)`

#### READ Tasks (List All)
1. On dashboard, view the task list
2. API Call: `GET /api/tasks`
3. Expected Result:
   - All tasks displayed
   - Shows: title, description, priority, status, due date, assignee
   - Tasks sorted by creation date (newest first)

#### READ Tasks (With Filters)
1. Use filter dropdowns to filter by:
   - **Status:** todo, in-progress, completed, on-hold
   - **Priority:** low, medium, high, urgent
2. API Call: `GET /api/tasks?status=todo&priority=high`
3. Expected Result:
   - Only matching tasks displayed
   - Filter parameters sent in query string

#### READ Single Task
1. Click on a task card to view details
2. API Call: `GET /api/tasks/[id]`
3. Expected Result:
   - Full task details displayed
   - All fields populated correctly

#### UPDATE Task
1. Click "Edit" button on a task
2. Modify any fields:
   - Change title
   - Update description
   - Change priority level
   - Update status
   - Modify due date
   - Change assignee
3. Click "Save" or "Update"
4. Expected Result:
   - Task updated in the list
   - Changes reflected immediately
   - Database receives: `UPDATE tasks SET ... WHERE id = ...`
   - updated_at timestamp refreshed

#### DELETE Task
1. Click "Delete" button on a task
2. Confirm deletion if prompted
3. Expected Result:
   - Task removed from list
   - Database receives: `DELETE FROM tasks WHERE id = ...`
   - Success notification displayed

## 🎯 CRUD Operations Summary

### ✅ Tasks CRUD (Complete)
- ✅ **CREATE**: `POST /api/tasks` - Add new task
- ✅ **READ**: `GET /api/tasks` - Get all tasks
- ✅ **READ**: `GET /api/tasks/[id]` - Get specific task
- ✅ **UPDATE**: `PUT /api/tasks/[id]` - Update task
- ✅ **DELETE**: `DELETE /api/tasks/[id]` - Delete task

### ✅ Users CRUD (Authentication)
- ✅ **CREATE**: `POST /api/auth/signup` - Create user account
- ✅ **READ**: `GET /api/auth/me` - Get current user info
- ⚠️ **UPDATE**: Not implemented (optional feature)
- ⚠️ **DELETE**: Not implemented (optional feature)

### ✅ Sessions CRUD
- ✅ **CREATE**: `POST /api/auth/login` - Create session
- ✅ **DELETE**: `POST /api/auth/logout` - Delete session

## 📝 API Endpoints Reference

### Authentication Endpoints
```
POST   /api/auth/signup   - Create new user account
POST   /api/auth/login    - Login user (create session)
POST   /api/auth/logout   - Logout user (delete session)
GET    /api/auth/me       - Get current user info
```

### Task Management Endpoints
```
GET    /api/tasks         - Get all tasks (supports ?status= and ?priority= filters)
POST   /api/tasks         - Create new task
GET    /api/tasks/[id]    - Get specific task by ID
PUT    /api/tasks/[id]    - Update specific task
DELETE /api/tasks/[id]    - Delete specific task
```

## 🔍 Testing with Browser DevTools

1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform CRUD operations
4. Verify:
   - Request method (GET, POST, PUT, DELETE)
   - Request payload (body data)
   - Response status (200, 201, 404, etc.)
   - Response data

## 🐛 Troubleshooting

### Database Connection Issues
If you see database errors:
1. Verify PostgreSQL is running
2. Check database credentials in `.env.local`
3. Verify database 'taskflow' exists
4. Run: `node init-database.js` to reinitialize tables

### Server Not Starting
1. Check if port 3000 is available
2. Run: `npm install` to ensure all dependencies
3. Check `.env.local` file exists

## 📋 Pages to Check

1. **Home Page** - http://localhost:3000
   - Landing page
   - Navigation to login/signup

2. **Signup Page** - http://localhost:3000/signup
   - User registration form
   - CREATE user operation

3. **Login Page** - http://localhost:3000/login
   - User login form
   - CREATE session operation

4. **Dashboard Page** - http://localhost:3000/dashboard
   - Protected route (requires authentication)
   - Task list display (READ operation)
   - Add task button (CREATE operation)
   - Edit task functionality (UPDATE operation)
   - Delete task functionality (DELETE operation)
   - Task filters (READ with query parameters)
   - Statistics overview

## ✨ Additional Features

- **Authentication**: Cookie-based session management
- **Protected Routes**: Dashboard requires login
- **Real-time Updates**: Changes reflect immediately
- **Filters**: Filter tasks by status and priority
- **Statistics**: Dashboard shows task counts by status
- **Responsive Design**: Works on mobile and desktop
- **Dark Mode**: Theme toggle support

## 🎉 Project Status

✅ **Database**: Connected and initialized
✅ **CRUD Operations**: Fully implemented
✅ **Authentication**: Working
✅ **Frontend Pages**: All pages functional
✅ **API Endpoints**: All endpoints operational
✅ **Development Server**: Running on http://localhost:3000

**Your application is ready to use! Open http://localhost:3000 in your browser to start testing.**
