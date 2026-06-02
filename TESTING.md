# Testing Guide

## Manual Testing

### Authentication Flow

#### Sign Up
1. Navigate to `/signup`
2. Fill in form with valid data
3. Click "Sign Up"
4. Verify redirect to dashboard
5. Check user created in database

#### Login
1. Navigate to `/login`
2. Enter credentials
3. Click "Sign In"
4. Verify redirect to dashboard
5. Check session created

#### Logout
1. Click logout button in sidebar
2. Verify redirect to login page
3. Check session deleted from database

### Task CRUD Operations

#### Create Task
1. Click "New Task" button
2. Fill required fields (title)
3. Fill optional fields
4. Click "Save"
5. Verify task appears in list
6. Check database for new record

#### Read Tasks
1. View task list on dashboard
2. Apply filters (status, priority)
3. Verify filtering works correctly
4. Check API response

#### Update Task
1. Click "Edit" on a task
2. Modify fields
3. Click "Save"
4. Verify changes reflected
5. Check updated_at timestamp

#### Delete Task
1. Click "Delete" on a task
2. Confirm deletion
3. Verify task removed from list
4. Check database record deleted

### Page Navigation

Test all pages load correctly:
- `/dashboard` - Main dashboard
- `/analytics` - Analytics page
- `/team` - Team management
- `/settings` - Settings page
- `/help` - Help & support

### Responsive Design

Test on different screen sizes:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

### Browser Testing

Test on multiple browsers:
- Chrome
- Firefox
- Safari
- Edge

## API Testing

### Using cURL

#### Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","priority":"high"}'
```

#### Get Tasks
```bash
curl http://localhost:3000/api/tasks
```

#### Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

#### Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### Using Browser Console

```javascript
// Create task
await fetch('/api/tasks', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    title: 'Console Test',
    priority: 'high'
  })
}).then(r => r.json()).then(console.log);

// Get tasks
await fetch('/api/tasks')
  .then(r => r.json())
  .then(console.log);
```

## Database Testing

### Verify Tables
```sql
-- List all tables
\dt

-- Check table structure
\d tasks
\d users
\d sessions
```

### Verify Data
```sql
-- Count records
SELECT COUNT(*) FROM tasks;
SELECT COUNT(*) FROM users;

-- View recent tasks
SELECT * FROM tasks ORDER BY created_at DESC LIMIT 5;

-- Check task distribution
SELECT status, COUNT(*) FROM tasks GROUP BY status;
```

## Performance Testing

### Page Load Times
- Dashboard: < 2 seconds
- Analytics: < 2 seconds
- Other pages: < 1 second

### API Response Times
- GET requests: < 500ms
- POST requests: < 1000ms
- PUT requests: < 1000ms
- DELETE requests: < 500ms

## Security Testing

### Authentication
- [ ] Unauthenticated users redirected to login
- [ ] Protected routes require valid session
- [ ] Session expires after timeout
- [ ] Logout clears session properly

### Input Validation
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] Invalid data rejected
- [ ] Required fields enforced

### Password Security
- [ ] Passwords hashed with bcrypt
- [ ] Minimum password length enforced
- [ ] Passwords not exposed in responses

## Checklist

### Before Deployment
- [ ] All CRUD operations work
- [ ] Authentication flow complete
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Database migrations successful
- [ ] Environment variables set
- [ ] API endpoints responding
- [ ] Error handling working
- [ ] Security measures in place

### After Deployment
- [ ] Verify production database
- [ ] Test all endpoints
- [ ] Check HTTPS working
- [ ] Monitor error logs
- [ ] Test user registration
- [ ] Verify email notifications (if applicable)
