# Architecture Overview

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Native pg driver
- **Authentication**: Cookie-based sessions
- **Password**: bcrypt hashing

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Auth pages
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...
├── lib/                   # Utility libraries
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Auth logic
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

## Data Flow

1. User interacts with UI component
2. Component calls API endpoint
3. API route validates request
4. Database query executed
5. Response sent back
6. Component updates UI

## Security

- Password hashing with bcrypt
- HTTP-only cookies
- SQL injection prevention
- XSS protection
- CSRF protection
- Input validation
