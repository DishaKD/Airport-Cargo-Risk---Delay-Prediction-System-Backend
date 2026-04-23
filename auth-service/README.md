# Auth Service

Authentication and Authorization microservice for the Airport Cargo Risk - Delay Prediction System.

## Overview

The Auth Service manages user accounts, roles, and security tokens. it provides secure endpoints for registration and login, and handles JWT token generation for cross-service authentication.

## Key Features

- **User Registration**: Create new accounts with role assignments.
- **Secure Login**: Password hashing using Bcrypt.
- **JWT Provider**: Issues signed tokens for authenticated users.
- **RBAC**: Supports roles: `OPERATIONS`, `CARGO`, `CUSTOMS`, `ADMIN`.
- **Validation**: Schema validation using Joi for incoming requests.

## Setup Instructions

### 1. Install Dependencies
```bash
cd auth-service
pnpm install
```

### 2. Configure Environment
Create a `.env` file from the [`.env.example`](./.env.example):
```env
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="1h"
```

### 3. Database Setup
Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Start the Service
```bash
# Development
pnpm run dev

# Production
pnpm run build
pnpm start
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user | No |
| `GET`  | `/api/auth/me` | Get current user info | Yes (JWT) |

## Database Models

### User
```prisma
model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  password_hash String
  role          Role     @default(OPERATIONS)
  created_at    DateTime @default(now())
}
```

### Role Enum
- `OPERATIONS`
- `CARGO`
- `CUSTOMS`
- `ADMIN`

---
**Author**: MTIT Project Team  
**Port**: 3001
