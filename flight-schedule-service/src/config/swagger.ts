import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flight Schedule Service API",
      version: "1.0.0",
      description:
        "Flight Schedule Service - Handles flight information and cargo transport scheduling. Manages flight schedules (departure/arrival times), assigns cargo to flights, and updates flight status (on-time, delayed). Provides critical transport layer data required for cargo movement and risk-delay prediction.",
      contact: {
        name: "Airport Cargo System",
        description: "Cargo Management Microservice",
      },
    },
    servers: [
      {
        url: "http://localhost:3003",
        description: "Development server",
      },
      {
        url: "https://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
        Flight: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            flightNumber: { type: "string", example: "AA123" },
            airlineCode: { type: "string", example: "AA" },
            aircraftType: { type: "string", example: "Boeing 747" },
            departureAirport: { type: "string", example: "JFK" },
            arrivalAirport: { type: "string", example: "LAX" },
            status: {
              type: "string",
              enum: [
                "SCHEDULED",
                "BOARDING",
                "DEPARTED",
                "IN_TRANSIT",
                "DELAYED",
                "LANDED",
                "CANCELLED",
              ],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateFlightRequest: {
          type: "object",
          required: [
            "flightNumber",
            "airlineCode",
            "aircraftType",
            "departureAirport",
            "arrivalAirport",
          ],
          properties: {
            flightNumber: { type: "string", example: "AA123" },
            airlineCode: { type: "string", example: "AA" },
            aircraftType: { type: "string", example: "Boeing 747" },
            departureAirport: { type: "string", example: "JFK" },
            arrivalAirport: { type: "string", example: "LAX" },
          },
        },
        Schedule: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            flightId: { type: "string", format: "uuid" },
            scheduledDeparture: { type: "string", format: "date-time" },
            scheduledArrival: { type: "string", format: "date-time" },
            estimatedDeparture: { type: "string", format: "date-time" },
            estimatedArrival: { type: "string", format: "date-time" },
            actualDeparture: { type: "string", format: "date-time" },
            actualArrival: { type: "string", format: "date-time" },
            gate: { type: "string" },
            terminal: { type: "string" },
            notes: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateScheduleRequest: {
          type: "object",
          required: ["flightId", "scheduledDeparture", "scheduledArrival"],
          properties: {
            flightId: { type: "string", format: "uuid" },
            scheduledDeparture: { type: "string", format: "date-time" },
            scheduledArrival: { type: "string", format: "date-time" },
            gate: { type: "string" },
            terminal: { type: "string" },
            notes: { type: "string" },
          },
        },
        Delay: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            flightId: { type: "string", format: "uuid" },
            reason: {
              type: "string",
              enum: [
                "MECHANICAL",
                "WEATHER",
                "CREW",
                "CARGO_DELAY",
                "CUSTOMS",
                "MAINTENANCE",
                "OTHER",
              ],
            },
            estimatedDelay: { type: "number", example: 30 },
            actualDelay: { type: "number" },
            description: { type: "string" },
            reportedAt: { type: "string", format: "date-time" },
            resolvedAt: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateDelayRequest: {
          type: "object",
          required: ["flightId", "reason", "estimatedDelay"],
          properties: {
            flightId: { type: "string", format: "uuid" },
            reason: {
              type: "string",
              enum: [
                "MECHANICAL",
                "WEATHER",
                "CREW",
                "CARGO_DELAY",
                "CUSTOMS",
                "MAINTENANCE",
                "OTHER",
              ],
            },
            estimatedDelay: { type: "number", example: 30 },
            description: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
