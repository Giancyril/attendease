# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@taskflow.com.

**Please do not create public GitHub issues for security vulnerabilities.**

### What to include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline:
- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix deployment: Depends on severity

## Security Best Practices

### For Users:
- Use strong passwords (min 6 characters, recommended 12+)
- Never share your credentials
- Log out from shared devices
- Report suspicious activity

### For Developers:
- Always use parameterized queries
- Validate input on client and server
- Keep dependencies updated
- Use environment variables for secrets
- Follow secure coding guidelines

## Known Security Features

- Password hashing with bcrypt
- HTTP-only cookies
- SQL injection prevention
- XSS protection
- CSRF protection
- Session expiration
- Input validation
