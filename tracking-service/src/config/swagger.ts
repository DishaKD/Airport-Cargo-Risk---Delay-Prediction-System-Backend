import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tracking Service API",
            version: "1.0.0",
            description: "API for the Tracking Service in Airport Cargo Management System",
        },
        servers: [
            {
                url: "/api", // for gateway prefix
                description: "API Gateway Support",
            },
            {
                url: "/",
                description: "Direct Service Access",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
