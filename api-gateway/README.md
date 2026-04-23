# API Gateway

Central routing layer for the Airport Cargo Risk-Delay Prediction System backend.

## Overview

The API Gateway serves as the single entry point for all client requests to the microservices architecture. It handles:

- **Request Routing** - Directs requests to appropriate microservices
- **Service Discovery** - Manages service URLs and endpoints
- **Error Handling** - Centralized error responses
- **Health Monitoring** - Checks service availability
- **Logging** - Tracks all gateway activity
- **CORS & Security** - Cross-origin handling with Helmet.js

## Architecture

```
Clients
   ↓
API Gateway (Port 3000)
   ├→ /api/cargo → Cargo Service (3001)
   ├→ /api/flight → Flight Service (3002)
   ├→ /api/tracking → Tracking Service (3004)
   └→ /api/customs → Customs Service (3005)
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd api-gateway
npm install
# or
pnpm install
```

### 2. Configure Environment

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Update service URLs:
```env
PORT=3000
NODE_ENV=development

CARGO_SERVICE_URL=http://localhost:3001
FLIGHT_SERVICE_URL=http://localhost:3002
TRACKING_SERVICE_URL=http://localhost:3004
CUSTOMS_SERVICE_URL=http://localhost:3005
```

### 3. Start the Gateway

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

### Gateway Management

#### Gateway Info
```
GET /gateway/info
```
Returns information about the gateway and available services.

#### Health Check
```
GET /gateway/health
```
Returns gateway health status.

#### Service Status
```
GET /gateway/status
```
Returns detailed status of all connected microservices.

### Service Proxies

#### Cargo Service
```
GET/POST /api/cargo
GET /api/cargo/:id
PUT /api/cargo/:id
DELETE /api/cargo/:id
```

#### Flight Service (Coming Soon)
```
GET/POST /api/flight
```

#### Tracking Service (Coming Soon)
```
GET/POST /api/tracking
```

#### Customs Service (Coming Soon)
```
GET/POST /api/customs
```

## Example Usage

### Check Gateway Status
```bash
curl http://localhost:3000/gateway/info
```

### Create Cargo (via Gateway)
```bash
curl -X POST http://localhost:3000/api/cargo \
  -H "Content-Type: application/json" \
  -d '{
    "trackingNumber": "CARGO-001",
    "description": "Electronics",
    "weight": 50,
    "dimensions": "100x50x50",
    "cargoType": "GENERAL",
    "origin": "Bangkok",
    "destination": "Singapore"
  }'
```

### Check All Services Health
```bash
curl http://localhost:3000/gateway/status
```

## How It Works

1. **Client Request**: Client sends request to Gateway
2. **Routing**: Gateway identifies target microservice based on URL path
3. **Forwarding**: Request is forwarded to the microservice using `express-http-proxy`
4. **Response**: Microservice response is returned to client
5. **Error Handling**: If service is down, gateway returns 503 error

## Service Configuration

Services are configured in `src/config/services.ts`. Add new services:

```typescript
export const services = {
  newService: {
    name: 'New Service Name',
    url: process.env.NEW_SERVICE_URL || 'http://localhost:3005',
    description: 'Service description',
  },
};
```

Then create a route proxy:

```typescript
router.use(
  '/api/newservice',
  proxy(getServiceUrl('newService'), {
    proxyReqPathResolver: (req) => '/api/newservice' + (req.url === '/' ? '' : req.url),
  })
);
```

## Troubleshooting

### Service Unavailable (503)
- Ensure the microservice is running on the configured port
- Check `.env` file for correct service URLs
- Verify network connectivity: `curl http://localhost:3001/health`

### CORS Errors
- Check CORS middleware is enabled
- Verify client origin is allowed

### Request Timeouts
- Check service performance
- Increase timeout in proxy configuration if needed

## Performance Considerations

- Lightweight routing with minimal overhead
- Stateless design allows horizontal scaling
- Health checks identify failing services
- Error responses are JSON-formatted

## Future Enhancements

- [ ] Request rate limiting
- [ ] JWT authentication
- [ ] Request/response caching
- [ ] Service discovery (Consul/Eureka)
- [ ] Load balancing
- [ ] API versioning support
- [ ] Request tracing and monitoring
- [ ] Service circuit breaker pattern

---

**Port**: 3000  
**Framework**: Express.js  
**Proxy**: express-http-proxy
