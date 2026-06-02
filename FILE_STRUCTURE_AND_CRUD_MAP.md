# 📂 File Structure and CRUD Operations Map

## 🎯 CRUD Operations Implementation Map

### CREATE Operations

#### 1. Create User (Signup)
- **Frontend:** `app/signup/page.tsx`
- **API Route:** `app/api/auth/signup/route.ts`
- **Database:** `INSERT INTO users`
- **Helper:** `lib/auth.ts` (createUser function)
- **Endpoint:** `POST /api/auth/signup`

#### 2. Create Task
- **Frontend:** `components/TaskForm.tsx` (form component)
- **Frontend:** `components/Dashboard.tsx` (handleSubmit function)
- **API Route:** `app/api/tasks/route.ts` (POST handler)
- **Database:** `INSERT INTO tasks`
- **Endpoint:** `POST /api/tasks`

#### 3. Create Session (Login)
- **Frontend:** `app/login/page.tsx`
- **API Route:** `app/api/auth/login/route.ts`
- **Database:** `INSERT INTO sessions`
- **Helper:** `lib/auth.ts` (createSession function)
- **Endpoint:** `POST /api/auth/login`

---

### READ Operations

#### 1. Read All Tasks
- **Frontend:** `components/Dashboard.tsx` (fetchTasks function)
- **Display:** `components/TaskList.tsx`
- **Card:** `components/TaskCard.tsx`
- **API Route:** `app/api/tasks/route.ts` (GET handler)
- **Database:** `SELECT * FROM tasks`
- **Endpoint:** `GET /api/tasks`
- **Filters:** Supports `?status=value&priority=value`

#### 2. Read Single Task
- **Frontend:** `components/Dashboard.tsx` (handleEdit -> loads task data)
- **API Route:** `app/api/tasks/[id]/route.ts` (GET handler)
- **Database:** `SELECT * FROM tasks WHERE id = $1`
- **Endpoint:** `GET /api/tasks/[id]`

#### 3. Read Current User
- **Frontend:** `components/ProtectedLayout.tsx`
- **API Route:** `app/api/auth/me/route.ts`
- **Database:** `SELECT * FROM users WHERE id = $1`
- **Endpoint:** `GET /api/auth/me`

---

### UPDATE Operations

#### 1. Update Task
- **Frontend:** `components/TaskForm.tsx` (edit mode)
- **Frontend:** `components/Dashboard.tsx` (handleSubmit with editingTask)
- **API Route:** `app/api/tasks/[id]/route.ts` (PUT handler)
- **Database:** `UPDATE tasks SET ... WHERE id = $1`
- **Endpoint:** `PUT /api/tasks/[id]`
- **Features:** Dynamic field updates, auto-updates `updated_at`

#### 2. Quick Status Update
- **Frontend:** `components/Dashboard.tsx` (handleStatusChange)
- **Trigger:** `components/TaskCard.tsx` (status dropdown)
- **API Route:** `app/api/tasks/[id]/route.ts` (PUT handler)
- **Database:** `UPDATE tasks SET status = $1 WHERE id = $2`
- **Endpoint:** `PUT /api/tasks/[id]`

---

### DELETE Operations

#### 1. Delete Task
- **Frontend:** `components/Dashboard.tsx` (handleDelete)
- **Trigger:** `components/TaskCard.tsx` (delete button)
- **API Route:** `app/api/tasks/[id]/route.ts` (DELETE handler)
- **Database:** `DELETE FROM tasks WHERE id = $1`
- **Endpoint:** `DELETE /api/tasks/[id]`
- **Features:** Confirmation dialog before deletion

#### 2. Delete Session (Logout)
- **Frontend:** `components/Sidebar.tsx` (logout button)
- **API Route:** `app/api/auth/logout/route.ts`
- **Database:** `DELETE FROM sessions WHERE token = $1`
- **Endpoint:** `POST /api/auth/logout`

---

## 📁 Complete File Structure with Descriptions

### `/app` - Next.js App Router

#### Application Pages
```
app/
├── page.tsx                    # Home page (redirects to /dashboard)
├── layout.tsx                  # Root layout with theme provider
├── globals.css                 # Global styles and Tailwind
│
├── login/
│   └── page.tsx               # Login page - CREATE session
│
├── signup/
│   └── page.tsx               # Signup page - CREATE user
│
└── dashboard/
    └── page.tsx               # Main dashboard - All CRUD operations
```

#### API Routes
```
app/api/
├── auth/
│   ├── signup/
│   │   └── route.ts           # POST - CREATE user account
│   │
│   ├── login/
│   │   └── route.ts           # POST - CREATE session (login)
│   │
│   ├── logout/
│   │   └── route.ts           # POST - DELETE session (logout)
│   │
│   └── me/
│       └── route.ts           # GET - READ current user
│
└── tasks/
    ├── route.ts               # GET - READ all tasks
    │                          # POST - CREATE new task
    │
    └── [id]/
        └── route.ts           # GET - READ single task
                               # PUT - UPDATE task
                               # DELETE - DELETE task
```

### `/components` - React Components

#### Main Components
```
components/
├── Dashboard.tsx              # Main dashboard logic
│   ├── State management (tasks, filters, forms)
│   ├── CRUD handlers (create, update, delete)
│   ├── Fetch tasks (READ)
│   └── Layout orchestration
│
├── TaskForm.tsx               # Create/Edit task form
│   ├── Form inputs (title, description, priority, etc.)
│   ├── Validation
│   └── Submit handler
│
├── TaskList.tsx               # Display list of tasks
│   └── Maps tasks to TaskCard components
│
├── TaskCard.tsx               # Individual task display
│   ├── Task information display
│   ├── Edit button
│   ├── Delete button
│   └── Status dropdown (quick update)
│
├── TaskFilters.tsx            # Filter controls
│   ├── Status filter dropdown
│   ├── Priority filter dropdown
│   └── Clear filters button
│
├── StatsOverview.tsx          # Statistics dashboard
│   ├── Total tasks count
│   ├── Tasks by status
│   └── Visual cards
│
├── ProtectedLayout.tsx        # Authentication wrapper
│   ├── Session verification
│   ├── Redirect to login if not authenticated
│   └── Sidebar integration
│
├── Sidebar.tsx                # Navigation sidebar
│   ├── User info display
│   ├── Navigation links
│   └── Logout button
│
└── theme-provider.tsx         # Dark/Light mode provider
```

#### UI Components (Reusable)
```
components/ui/
├── button.tsx                 # Button component
├── input.tsx                  # Input field
├── card.tsx                   # Card container
├── dialog.tsx                 # Modal dialog
├── select.tsx                 # Dropdown select
├── label.tsx                  # Form label
├── badge.tsx                  # Status/Priority badges
├── form.tsx                   # Form wrapper
├── dropdown-menu.tsx          # Dropdown menu
├── avatar.tsx                 # User avatar
├── separator.tsx              # Divider line
└── [50+ other UI components] # shadcn/ui components
```

### `/lib` - Utility Libraries

```
lib/
├── db.ts                      # PostgreSQL connection
│   ├── Pool configuration
│   ├── Query function with logging
│   └── Database client export
│
├── db-init.ts                 # Database schema initialization
│   ├── CREATE TABLE users
│   ├── CREATE TABLE sessions
│   └── CREATE TABLE tasks
│
├── auth.ts                    # Authentication utilities
│   ├── createUser() - Hash password, INSERT user
│   ├── loginUser() - Verify password, return user
│   ├── createSession() - Generate token, INSERT session
│   ├── verifySession() - Check token validity
│   └── Cookie management
│
├── types.ts                   # TypeScript type definitions
│   ├── User interface
│   ├── Task interface
│   ├── CreateTaskInput interface
│   ├── UpdateTaskInput interface
│   ├── LoginInput interface
│   ├── SignupInput interface
│   ├── Priority type
│   └── Status type
│
└── utils.ts                   # General utilities
    └── cn() - Tailwind class merger
```

### `/hooks` - Custom React Hooks

```
hooks/
├── use-mobile.ts              # Mobile detection hook
└── use-toast.ts               # Toast notification hook
```

### Root Configuration Files

```
Root Directory/
├── .env.local                 # Environment variables
│   ├── DATABASE_URL
│   ├── NODE_ENV
│   └── NEXT_PUBLIC_APP_URL
│
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS config
├── postcss.config.js          # PostCSS configuration
├── components.json            # shadcn/ui configuration
│
├── init-database.js           # Database initialization script
│
└── Documentation/
    ├── PROJECT_SETUP_COMPLETE.md
    ├── CRUD_VERIFICATION_CHECKLIST.md
    ├── FILE_STRUCTURE_AND_CRUD_MAP.md (this file)
    ├── BUILD_COMPLETE.md
    ├── COMPLETION_SUMMARY.md
    ├── DEPLOYMENT_GUIDE.md
    └── FINAL_SUMMARY.md
```

---

## 🔄 CRUD Flow Diagrams

### CREATE Task Flow
```
User clicks "New Task" button
    ↓
components/Dashboard.tsx (opens form)
    ↓
components/TaskForm.tsx (user fills form)
    ↓
User clicks "Save"
    ↓
components/Dashboard.tsx (handleSubmit)
    ↓
Fetch POST /api/tasks
    ↓
app/api/tasks/route.ts (POST handler)
    ↓
Database: INSERT INTO tasks (...)
    ↓
Return new task with ID
    ↓
Update frontend state (setTasks)
    ↓
Task appears in list immediately
```

### READ Tasks Flow
```
User opens dashboard
    ↓
components/Dashboard.tsx (useEffect)
    ↓
fetchTasks() function
    ↓
Fetch GET /api/tasks?status=&priority=
    ↓
app/api/tasks/route.ts (GET handler)
    ↓
Database: SELECT * FROM tasks WHERE ... ORDER BY created_at DESC
    ↓
Return array of tasks
    ↓
setTasks(data)
    ↓
components/TaskList.tsx receives tasks
    ↓
Maps to components/TaskCard.tsx
    ↓
Display all tasks
```

### UPDATE Task Flow
```
User clicks "Edit" button on task
    ↓
components/TaskCard.tsx (onEdit callback)
    ↓
components/Dashboard.tsx (handleEdit)
    ↓
setEditingTask(task), setShowForm(true)
    ↓
components/TaskForm.tsx (opens with task data pre-filled)
    ↓
User modifies fields and clicks "Save"
    ↓
components/Dashboard.tsx (handleSubmit with editingTask)
    ↓
Fetch PUT /api/tasks/[id]
    ↓
app/api/tasks/[id]/route.ts (PUT handler)
    ↓
Database: UPDATE tasks SET field=$1, ... WHERE id=$N
    ↓
Return updated task
    ↓
Update frontend state (map and replace)
    ↓
Task reflects new values immediately
```

### DELETE Task Flow
```
User clicks "Delete" button
    ↓
components/TaskCard.tsx (onDelete callback)
    ↓
components/Dashboard.tsx (handleDelete)
    ↓
Confirmation dialog (if confirmed)
    ↓
Fetch DELETE /api/tasks/[id]
    ↓
app/api/tasks/[id]/route.ts (DELETE handler)
    ↓
Database: DELETE FROM tasks WHERE id=$1
    ↓
Return success message
    ↓
Update frontend state (filter out deleted task)
    ↓
Task removed from list immediately
```

---

## 🗃️ Database Schema

### Users Table
```sql
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
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INT DEFAULT 1,
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

---

## 🎯 Key Files for Each CRUD Operation

### For CREATE Operations, Check:
1. `app/api/tasks/route.ts` - POST handler
2. `app/api/auth/signup/route.ts` - User creation
3. `components/TaskForm.tsx` - Form UI
4. `lib/auth.ts` - User/session creation logic

### For READ Operations, Check:
1. `app/api/tasks/route.ts` - GET handler (all tasks)
2. `app/api/tasks/[id]/route.ts` - GET handler (single task)
3. `components/Dashboard.tsx` - Fetch logic
4. `components/TaskList.tsx` - Display logic

### For UPDATE Operations, Check:
1. `app/api/tasks/[id]/route.ts` - PUT handler
2. `components/Dashboard.tsx` - Update logic
3. `components/TaskForm.tsx` - Edit form
4. `components/TaskCard.tsx` - Status update

### For DELETE Operations, Check:
1. `app/api/tasks/[id]/route.ts` - DELETE handler
2. `components/Dashboard.tsx` - Delete logic
3. `components/TaskCard.tsx` - Delete button

---

## 📊 Technology Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Radix UI)
- **State Management:** React hooks (useState, useEffect)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** PostgreSQL
- **Database Client:** node-postgres (pg)
- **Authentication:** Cookie-based sessions
- **Password Hashing:** bcryptjs

### Development
- **Language:** TypeScript 5.7
- **Package Manager:** npm
- **Dev Server:** Next.js Turbopack
- **Environment:** .env.local

---

## ✅ All CRUD Operations Summary

| Operation | Entity | Frontend File | API Route | Database Query |
|-----------|--------|---------------|-----------|----------------|
| **CREATE** | User | `app/signup/page.tsx` | `app/api/auth/signup/route.ts` | `INSERT INTO users` |
| **CREATE** | Task | `components/Dashboard.tsx` | `app/api/tasks/route.ts` | `INSERT INTO tasks` |
| **CREATE** | Session | `app/login/page.tsx` | `app/api/auth/login/route.ts` | `INSERT INTO sessions` |
| **READ** | Tasks (all) | `components/Dashboard.tsx` | `app/api/tasks/route.ts` | `SELECT * FROM tasks` |
| **READ** | Task (one) | `components/Dashboard.tsx` | `app/api/tasks/[id]/route.ts` | `SELECT * FROM tasks WHERE id` |
| **READ** | User (me) | `components/ProtectedLayout.tsx` | `app/api/auth/me/route.ts` | `SELECT * FROM users` |
| **UPDATE** | Task | `components/Dashboard.tsx` | `app/api/tasks/[id]/route.ts` | `UPDATE tasks SET ... WHERE id` |
| **DELETE** | Task | `components/Dashboard.tsx` | `app/api/tasks/[id]/route.ts` | `DELETE FROM tasks WHERE id` |
| **DELETE** | Session | `components/Sidebar.tsx` | `app/api/auth/logout/route.ts` | `DELETE FROM sessions` |

---

## 🚀 Quick Reference

**Start Server:** `npm run dev`
**Init Database:** `node init-database.js`
**Access App:** http://localhost:3000
**Database:** taskflow (PostgreSQL)

**All files are configured and working! Your CRUD application is complete! ✅**
