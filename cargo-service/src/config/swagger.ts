import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cargo Management Service API',
      version: '1.0.0',
      description: 'API documentation for the Cargo Management Service - Part of the Airport Cargo Risk-Delay Prediction System',
      contact: {
        name: 'API Support',
        email: 'support@cargosystem.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development Server',
      },
      {
        url: 'https://api.cargosystem.com',
        description: 'Production Server',
      },
    ],
    components: {
      schemas: {
        Cargo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the cargo',
            },
            trackingNumber: {
              type: 'string',
              description: 'Unique tracking number for cargo tracking',
            },
            description: {
              type: 'string',
              description: 'Description of the cargo',
            },
            weight: {
              type: 'number',
              description: 'Weight of cargo in kilograms',
            },
            dimensions: {
              type: 'string',
              description: 'Dimensions of cargo (e.g., 100x50x50)',
            },
            cargoType: {
              type: 'string',
              enum: ['FRAGILE', 'HAZARDOUS', 'PERISHABLE', 'GENERAL', 'OVERSIZED'],
              description: 'Type of cargo',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED'],
              description: 'Current status of the cargo',
            },
            origin: {
              type: 'string',
              description: 'Origin location',
            },
            destination: {
              type: 'string',
              description: 'Destination location',
            },
            flightId: {
              type: 'string',
              nullable: true,
              description: 'Associated flight ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when cargo was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when cargo was last updated',
            },
          },
        },
        CreateCargoRequest: {
          type: 'object',
          required: ['trackingNumber', 'description', 'weight', 'dimensions', 'cargoType', 'origin', 'destination'],
          properties: {
            trackingNumber: {
              type: 'string',
              example: 'CARGO-001',
            },
            description: {
              type: 'string',
              example: 'Electronics shipment',
            },
            weight: {
              type: 'number',
              example: 50,
            },
            dimensions: {
              type: 'string',
              example: '100x50x50',
            },
            cargoType: {
              type: 'string',
              enum: ['FRAGILE', 'HAZARDOUS', 'PERISHABLE', 'GENERAL', 'OVERSIZED'],
              example: 'GENERAL',
            },
            origin: {
              type: 'string',
              example: 'Bangkok',
            },
            destination: {
              type: 'string',
              example: 'Singapore',
            },
            flightId: {
              type: 'string',
              example: 'FL001',
              nullable: true,
            },
          },
        },
        UpdateCargoRequest: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              example: 'Updated description',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED'],
            },
            flightId: {
              type: 'string',
              nullable: true,
            },
          },
        },
        UpdateCargoStatusRequest: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              enum: ['PENDING', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED'],
              example: 'LOADED',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            data: {
              type: 'object',
              nullable: true,
            },
            error: {
              type: 'string',
              nullable: true,
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
