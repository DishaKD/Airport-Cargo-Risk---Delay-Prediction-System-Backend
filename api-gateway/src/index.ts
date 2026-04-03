import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import gatewayRoutes from './routes/gateway';
import apiRoutes from './routes/api';
import { requestLogger, errorHandler, notFoundHandler } from './middlewares/gateway';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Airport Cargo Risk-Delay Prediction System API Gateway',
      version: '1.0.0',
      description: 'API Gateway documenting the connected microservices.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local API Gateway Server',
      },
    ],
  },
  // Reads JSDoc comments from route files
  apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging
app.use(requestLogger);

// Swagger Documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Airport Cargo Risk-Delay Prediction System API Gateway',
    version: '1.0.0',
    documentation: '/gateway/info',
    health: '/gateway/health',
    status: '/gateway/status',
    swagger: '/api-docs',
  });
});

// Gateway management routes
app.use('/gateway', gatewayRoutes);

// API proxy routes
app.use('/api', apiRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚪 API Gateway running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📖 Documentation: http://localhost:${PORT}/gateway/info`);
  console.log(`❤️ Health check: http://localhost:${PORT}/gateway/health`);
});

export default app;
