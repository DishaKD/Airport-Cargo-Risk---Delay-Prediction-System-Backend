# Tracking Service

This is the **Cargo Tracking & Location Service** for the Airport Cargo Risk & Delay Management System.

It is responsible for tracking the real-time location and movement history of cargo across the system. It runs independently on its own port and uses Prisma with PostgreSQL.

## Features
- Track current cargo location
- Maintain movement history
- Detect delayed cargo (stuck for > 2 hours)
- Swagger API documentation

## Requirements
- Node.js (v20+ recommended)
- PostgreSQL Database

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables. Copy `.env.example` to `.env` and update the `DATABASE_URL` and `PORT`.
   ```bash
   cp .env.example .env
   ```
   *(Ensure you have a valid PostgreSQL URL)*

3. Run migrations and generate the Prisma Client:
   ```bash
   npx prisma db push
   # or
   npx prisma generate
   ```

## Running the Service

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Documentation
The API is fully documented using Swagger. Once the server is running, you can access the documentation at:
- `http://localhost:3003/api-docs`

## API Gateway Compatibility
All tracking routes are prefixed properly and Swagger UI supports both direct and `/api` prefixed URLs, ensuring full compatibility with the main API Gateway.

## Folder Structure
- `src/controllers`: Request/Response handling
- `src/services`: Core business logic
- `src/routes`: Express route definitions & Swagger annotations
- `src/config`: Swagger and Database config
- `src/middlewares`: Global error handling
- `prisma`: Database schema definition
