import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import { errorHandler } from "./middlewares/error.middleware";
import { setupSwagger } from "./config/swagger";
import trackingRoutes from "./routes/tracking.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

setupSwagger(app);

// Routes
app.use("/tracking", trackingRoutes);
app.use("/api/tracking", trackingRoutes); // Support both direct and gateway-prefixed paths

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", service: "tracking-service" });
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Tracking Service is running on port ${PORT}`);

    try {
        await prisma.$connect();
        console.log("Database connected successfully via Prisma");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
});
