/**
 * Microservices Configuration
 * Centralized service URLs for routing
 */

interface ServiceConfig {
  name: string;
  url: string;
  description: string;
}

export const services: Record<string, ServiceConfig> = {
  auth: {
    name: "Authentication Service",
    url: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    description: "Handles user authentication and authorization",
  },
  cargo: {
    name: "Cargo Management Service",
    url: process.env.CARGO_SERVICE_URL || "http://localhost:3002",
    description: "Manages cargo shipment data",
  },
  flight: {
    name: "Flight Schedule Service",
    url: process.env.FLIGHT_SERVICE_URL || "http://localhost:3003",
    description: "Handles flight information and scheduling",
  },
  tracking: {
    name: "Cargo Tracking & Location Service",
    url: process.env.TRACKING_SERVICE_URL || "http://localhost:3004",
    description: "Tracks real-time cargo movement",
  },
  customs: {
    name: "Customs & Clearance Service",
    url: process.env.CUSTOMS_SERVICE_URL || "http://localhost:3005",
    description: "Manages customs checks and clearance",
  },
};

/**
 * Get service URL by name
 */
export const getServiceUrl = (serviceName: string): string => {
  const service = services[serviceName];
  if (!service) {
    throw new Error(`Service "${serviceName}" not found`);
  }
  return service.url;
};

/**
 * Get all services info
 */
export const getServicesInfo = () => {
  return Object.entries(services).map(([key, service]) => ({
    id: key,
    ...service,
  }));
};
