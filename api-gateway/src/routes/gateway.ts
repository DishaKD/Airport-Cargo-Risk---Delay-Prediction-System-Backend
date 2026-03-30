import { Router, Request, Response } from 'express';
import { getServiceUrl, getServicesInfo } from '../config/services';

const router = Router();

/**
 * Gateway Info Endpoint
 * GET /gateway/info
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    message: 'API Gateway Information',
    gateway: {
      name: process.env.GATEWAY_NAME || 'Airport-Cargo-System-Gateway',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
    },
    services: getServicesInfo(),
  });
});

/**
 * Health Check Endpoint
 * GET /gateway/health
 */
router.get('/health', async (req, res) => {
  res.json({
    success: true,
    message: 'API Gateway is healthy',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Service Health Status
 * GET /gateway/status
 */
router.get('/status', async (req, res) => {
  try {
    const axios = require('axios');
    const services = getServicesInfo();
    const status: any = {
      gateway: 'healthy',
      services: {},
      timestamp: new Date().toISOString(),
    };

    for (const service of services) {
      try {
        await axios.get(`${service.url}/health`, { timeout: 3000 });
        status.services[service.id] = {
          name: service.name,
          status: 'healthy',
          url: service.url,
        };
      } catch (error) {
        status.services[service.id] = {
          name: service.name,
          status: 'unhealthy',
          url: service.url,
          error: (error as Error).message,
        };
      }
    }

    res.json(status);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check service status',
      error: (error as Error).message,
    });
  }
});

export default router;
