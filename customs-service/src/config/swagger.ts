import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customs & Clearance Service API',
      version: '1.0.0',
      description: 'API documentation for the Customs & Clearance Service - Part of the Airport Cargo Risk-Delay Prediction System',
      contact: {
        name: 'API Support',
        email: 'support@customssystem.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5005',
        description: 'Development Server',
      },
      {
        url: 'https://api.customssystem.com',
        description: 'Production Server',
      },
    ],
    components: {
      schemas: {
        ClearanceRecord: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the clearance record',
            },
            cargoId: {
              type: 'string',
              description: 'Associated cargo ID',
            },
            clearanceStatus: {
              type: 'string',
              enum: ['PENDING', 'UNDER_INSPECTION', 'HOLD', 'CLEARED', 'REJECTED'],
              description: 'Current clearance status',
            },
            riskLevel: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH'],
              description: 'Assessed risk level',
            },
            inspectionDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Date of physical inspection',
            },
            notes: {
              type: 'string',
              nullable: true,
              description: 'Officer notes',
            },
            delayReason: {
              type: 'string',
              nullable: true,
              description: 'Reason for any delays',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
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
              nullable: true,
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
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
