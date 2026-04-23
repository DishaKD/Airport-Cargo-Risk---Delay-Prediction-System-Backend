# Flight Schedule Service

Flight Schedule Management Service for the Airport Cargo Risk - Delay Prediction System.

## Overview

The Flight Schedule Service is responsible for managing flight data, scheduling departures/arrivals, and tracking real-time delays. It plays a critical role in the risk prediction system by providing the temporal context for cargo movements.

## Key Features

- **Flight Management**: Register and track commercial and cargo flights.
- **Dynamic Scheduling**: Manage scheduled, estimated, and actual times for flights.
- **Delay Reporting**: Track delays with specific reasons (Weather, Cargo, Customs, etc.).
- **Swagger Documentation**: Interactive API testing and documentation.
- **JWT Protection**: Secure endpoints requiring a valid token from the Auth Service.

## Setup Instructions

### 1. Install Dependencies
```bash
cd flight-schedule-service
pnpm install
```

### 2. Configure Environment
Create a `.env` file from the [`.env.example`](./.env.example):
```env
PORT=3003
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=flight_schedule"
JWT_SECRET="your_secret_key"
```

### 3. Database Setup
This service uses a dedicated schema `flight_schedule`.
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

### Flights
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/flights` | Get all flights |
| `POST` | `/api/flights` | Create a new flight |
| `GET`  | `/api/flights/:id` | Get flight by ID |

### Schedules
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/schedules` | Get all schedules |
| `POST` | `/api/schedules` | Create a new schedule |

### Delays
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/delays` | Report a new delay |
| `GET`  | `/api/delays/active` | Get all active delays |

## Database Models

### Flight
Represents a flight entity with its static information.

### Schedule
Tracks the specific time windows for a flight instance.

### Delay
Records delay events, their causes, and resolutions.

---
**Author**: MTIT Project Team  
**Port**: 3003
