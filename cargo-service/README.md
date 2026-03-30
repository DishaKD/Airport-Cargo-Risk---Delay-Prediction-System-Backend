# Cargo Management Service

This is the **Cargo Management Service** for the Airport Cargo Risk-Delay Prediction System Backend.

## Overview

The Cargo Management Service is responsible for:
- Creating and managing cargo shipment data
- Tracking shipment status (PENDING → LOADED → IN_TRANSIT → DELIVERED)
- Linking cargo with flights
- Maintaining cargo location history
- Managing shipment lifecycle

## Architecture

```
src/
├── index.ts                 # Main application entry point
├── config/
│   └── db.ts               # Prisma database configuration
├── controllers/
│   └── cargoController.ts  # Request handlers for cargo operations
├── services/
│   └── cargoService.ts     # Business logic for cargo management
├── routes/
│   └── cargoRoutes.ts      # API route definitions
├── middlewares/
│   ├── errorMiddleware.ts  # Error handling middleware
│   ├── requestLogger.ts    # Request logging middleware
│   └── validationMiddleware.ts  # Input validation
├── types/
│   └── index.ts            # TypeScript interfaces and types
└── utils/
    └── helpers.ts          # Utility functions

prisma/
├── schema.prisma           # Database schema definitions
└── migrations/             # Database migration files
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd cargo-service
npm install
# or
pnpm install
```

### 2. Configure Environment

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Update the following variables:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Service port (default: 3001)
- `NODE_ENV` - Environment (development/production)

### 3. Database Setup

Generate Prisma client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npm run prisma:migrate
```

### 4. Start the Service

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm run start
```

## API Endpoints

### Cargo Operations

#### Create Cargo
```
POST /api/cargo

Request Body:
{
  "trackingNumber": "CARGO-ABC123",
  "description": "Electronics shipment",
  "weight": 50.5,
  "dimensions": "100x50x50",
  "cargoType": "GENERAL",
  "origin": "Bangkok",
  "destination": "Singapore",
  "flightId": "FL001"
}
```

#### Get All Cargo
```
GET /api/cargo
```

#### Get Cargo by ID
```
GET /api/cargo/:id
```

#### Get Cargo by Tracking Number
```
GET /api/cargo/track/:trackingNumber
```

#### Get Cargo by Status
```
GET /api/cargo/status/:status
```

Valid statuses: `PENDING`, `LOADED`, `IN_TRANSIT`, `DELIVERED`, `DELAYED`, `CANCELLED`

#### Update Cargo
```
PUT /api/cargo/:id

Request Body:
{
  "description": "Updated description",
  "flightId": "FL002"
}
```

#### Update Cargo Status
```
PATCH /api/cargo/:id/status

Request Body:
{
  "status": "LOADED"
}
```

#### Delete Cargo
```
DELETE /api/cargo/:id
```

## Database Models

### Cargo
Represents a cargo shipment with tracking and status information.

### Shipment
Tracks the journey of cargo through different stages.

### FlightAssignment
Links cargo to specific flights.

### CargoLocation
Maintains historical location data for cargo movement.

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## Error Handling

The service includes comprehensive error handling with:
- Input validation
- Error logging
- Consistent error responses
- HTTP status codes

## Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Database UI

View and manage database:

```bash
npm run prisma:studio
```

## Integration with Other Services

The Cargo Management Service is designed to work with:
- **Flight Schedule Service** - For flight assignment and scheduling
- **Cargo Tracking & Location Service** - For real-time location updates
- **Customs & Clearance Service** - For clearance status integration

## Future Enhancements

- [ ] Real-time notification system for cargo status changes
- [ ] Advanced filtering and search capabilities
- [ ] Batch operations for multiple cargo items
- [ ] Integration with IoT sensors for temperature monitoring
- [ ] Risk assessment algorithms for delay prediction
- [ ] API rate limiting and caching

---

**Author**: Team Planning<br>
**Service Port**: 3001<br>
**Database**: PostgreSQL
