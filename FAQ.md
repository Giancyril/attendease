# Frequently Asked Questions

## General

**Q: What is TaskFlow?**
A: TaskFlow is a full-stack task management application with complete CRUD operations, built with Next.js and PostgreSQL.

**Q: Is it free to use?**
A: Yes, TaskFlow is open source under the MIT license.

## Installation

**Q: What do I need to run TaskFlow?**
A: Node.js 18+, PostgreSQL 12+, and npm or yarn.

**Q: How do I set up the database?**
A: Run `npm run init-db` after configuring your `.env.local` file.

## Features

**Q: Can I filter tasks?**
A: Yes, you can filter by status and priority.

**Q: Is there a mobile app?**
A: Not yet, but the web version is fully responsive and mobile-friendly.

## Troubleshooting

**Q: Database connection error?**
A: Check your DATABASE_URL in `.env.local` and ensure PostgreSQL is running.

**Q: Port 3000 already in use?**
A: Kill the process with `npx kill-port 3000` or use a different port.

## Contributing

**Q: How can I contribute?**
A: See our [CONTRIBUTING.md](CONTRIBUTING.md) guide.

**Q: How do I report a bug?**
A: Open an issue on GitHub using our bug report template.
