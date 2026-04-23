# Customs Service - Database Integration Guide

## Overview
The Customs Service has been successfully integrated with PostgreSQL using Prisma ORM. This replaces the previous in-memory storage system with a persistent database.

## Architecture Changes

### Previous Implementation
- **Storage**: In-memory arrays
- **Data Persistence**: No (lost on restart)
- **Scalability**: Limited to single instance

### Current Implementation
- **Storage**: PostgreSQL Database via Prisma ORM
- **Data Persistence**: Persistent across restarts
- **Scalability**: Database-backed, multi-instance ready

## Setup Instructions

### 1. Environment Configuration
Create a `.env` file in the `customs-service` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your PostgreSQL connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/customs_service"
PORT=5005
NODE_ENV=development
```

### 2. Database Prerequisites
Ensure you have PostgreSQL running:

```bash
# For local PostgreSQL
psql -U postgres

# Create database (if not exists)
CREATE DATABASE customs_service;
```

### 3. Install Dependencies
```bash
npm install
# or with pnpm
pnpm install
```

### 4. Run Migrations
Initialize the database schema:

```bash
npm run prisma:migrate
# or with pnpm
pnpm prisma:migrate
```

This will:
- Create the `ClearanceRecord` table
- Create necessary enums (`ClearanceStatus`, `RiskLevel`)
- Create indexes on `cargoId` field

### 5. Generate Prisma Client
```bash
npm run prisma:generate
```

### 6. Start the Service
```bash
npm run dev
```

The service will start on port 5005 (or the port specified in `.env`).

## Database Schema

### ClearanceRecord Table

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| id | UUID | Generated | Primary Key |
| cargoId | String | Required | FK to Cargo Service |
| clearanceStatus | Enum | PENDING | PENDING, UNDER_INSPECTION, HOLD, CLEARED, REJECTED |
| riskLevel | Enum | LOW | LOW, MEDIUM, HIGH |
| inspectionDate | DateTime | NULL | Set when inspection occurs |
| notes | String | NULL | Inspection notes |
| delayReason | String | NULL | Reason for delay if any |
| createdAt | DateTime | Current | Auto-set |
| updatedAt | DateTime | Current | Auto-updated |

## API Endpoints

All existing endpoints remain unchanged:

```
GET    /api/customs              - Get all clearance records
GET    /api/customs/{id}         - Get clearance record by ID
POST   /api/customs              - Create new clearance record
PUT    /api/customs/{id}         - Update clearance record
POST   /api/customs/{id}/inspect - Simulate inspection
DELETE /api/customs/{id}         - Delete clearance record
```

## Key Changes in Service Layer

### Old Implementation (In-Memory)
```typescript
static async getAll() {
  return [...clearanceRecords].sort(...);
}
```

### New Implementation (Database)
```typescript
static async getAll() {
  return await prisma.clearanceRecord.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
```

## Error Handling

The service now returns Prisma-specific error codes:

| Error Code | Meaning | HTTP Status |
|-----------|---------|------------|
| P2025 | Record not found | 404 |
| P2002 | Unique constraint violation | 400 |
| Database Error | Connection/Query error | 500 |

Example error response:
```json
{
  "success": false,
  "message": "Clearance record not found"
}
```

## Prisma Studio

View and manage data visually:

```bash
npm run prisma:studio
```

This opens Prisma Studio at `http://localhost:5555`

## Development Tips

### Type Safety
The service now has full TypeScript support for all database operations. Prisma generates types automatically.

### Database Queries
All database calls are async/await based and include proper error handling.

### Migrations
When modifying the schema:

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:migrate -- --name your_change_name`
3. Commit migration files to version control

## Troubleshooting

### Connection Failed
- Verify PostgreSQL is running: `psql -U postgres`
- Check `DATABASE_URL` in `.env`
- Verify database exists

### Migration Failed
```bash
# Reset database (development only!)
npm run prisma:reset
```

### Type Errors
```bash
# Regenerate Prisma types
npm run prisma:generate
```

## Performance Considerations

- **Indexes**: The `cargoId` field is indexed for fast lookups
- **UUID**: Uses PostgreSQL native UUID for optimal storage
- **Timestamps**: Automatic audit fields (createdAt, updatedAt)

## Production Deployment

For production:
1. Use a managed PostgreSQL service (RDS, Heroku, etc.)
2. Set `NODE_ENV=production`
3. Use connection pooling for high concurrency
4. Run migrations as part of deployment pipeline
5. Enable SSL for database connections

```env
DATABASE_URL="postgresql://user:pass@prod-db.example.com:5432/customs_service?schema=public&sslmode=require"
NODE_ENV=production
```

## Support & Maintenance

- Prisma Docs: https://www.prisma.io/docs/
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Service Health Check: `GET /health`
