# Attendance Digital Management System
 
> A production-ready, full-stack digital attendance management platform built with Next.js 16, TypeScript, and PostgreSQL — featuring complete CRUD operations, bulk attendance marking, leave management workflows, session-based authentication, and a modern glassmorphism UI.
 
---
 
## Tech Stack
 
![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
 
---
 
## Features
 
### Core CRUD Operations
- **CREATE** — Register employees, mark attendance records, submit leave requests
- **READ** — View attendance logs, filter by status and priority, view employee profiles
- **UPDATE** — Edit attendance records, update leave status, modify employee details
- **DELETE** — Remove records with confirmation dialogs and cascade session cleanup
### Attendance & Employee Management
- **Bulk Attendance Marking** — Mark multiple employees as present, absent, or late simultaneously
- **Leave Management Workflow** — Submit and track leave requests (annual, sick, unpaid) with full approval lifecycle
- **Profile Settings** — Employees can update their full name and email address dynamically
- **Custom Date Picker** — Consistent `react-day-picker` component used across all forms
- **Statistics Dashboard** — Real-time attendance counts, summary cards, and status breakdowns
### Authentication & Security
- User registration and login with session management
- Cookie-based session handling with HTTP-only tokens
- Secure password hashing with `bcryptjs`
- Protected routes requiring authentication
- SQL injection prevention via parameterized queries
- CSRF protection via `SameSite` cookies
- Input validation on both frontend and backend
### Modern UI/UX
- Glassmorphism auth UI with animated mesh gradients
- Responsive design for mobile and desktop
- Dark mode for auth pages, light mode for dashboard
- Loading states, error handling, and confirmation dialogs for destructive actions
- Real-time UI updates
---
