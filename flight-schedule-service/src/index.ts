import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import flightRoutes from "./routes/flightRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import delayRoutes from "./routes/delayRoutes";
import { swaggerSpec } from "./config/swagger";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Flight Schedule Service is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/flights", flightRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/delays", delayRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Flight Schedule Service running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(
    `✈️  Purpose: Manages flight schedules, cargo assignments, and flight status updates`,
  );
  console.log(
    `📦 Key Features: Flight scheduling, cargo routing, delay tracking for cargo transport`,
  );
});

export default app;
