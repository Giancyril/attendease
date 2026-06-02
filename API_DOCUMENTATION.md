# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 6 chars)",
  "full_name": "string (optional)"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-15T10:00:00Z"
  },
  "message": "Account created successfully"
}
```

### POST /auth/login
Authenticate user and create session.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "message": "Login successful"
}
```

### POST /auth/logout
Destroy user session.

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### GET /auth/me
Get current authenticated user.

**Response (200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe"
}
```

## Task Endpoints

### GET /tasks
Get all tasks (supports filtering).

**Query Parameters:**
- `status`: Filter by status (todo, in-progress, completed, on-hold)
- `priority`: Filter by priority (low, medium, high, urgent)

**Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Complete project",
    "description": "Finish the task manager",
    "priority": "high",
    "status": "in-progress",
    "due_date": "2024-01-20T00:00:00Z",
    "assignee": "John Doe",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
]
```

### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "low|medium|high|urgent (optional, default: medium)",
  "status": "todo|in-progress|completed|on-hold (optional, default: todo)",
  "due_date": "ISO 8601 date string (optional)",
  "assignee": "string (optional)"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "New task",
  "description": "Task description",
  "priority": "medium",
  "status": "todo",
  "created_at": "2024-01-15T10:00:00Z"
}
```

### GET /tasks/:id
Get a specific task by ID.

**Response (200):**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "priority": "high",
  "status": "in-progress"
}
```

### PUT /tasks/:id
Update a specific task.

**Request Body:**
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "priority": "string (optional)",
  "status": "string (optional)",
  "due_date": "string (optional)",
  "assignee": "string (optional)"
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Updated title",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

### DELETE /tasks/:id
Delete a specific task.

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```
