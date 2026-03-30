import { Router, Request, Response } from "express";
import type { Router as ExpressRouter } from "express";
import proxy from "express-http-proxy";
import { getServiceUrl } from "../config/services";

const router: ExpressRouter = Router();

/**
 * Auth Service Routes
 * Routes all /api/auth requests to Auth Service
 */
router.use(
  "/auth",
  proxy(getServiceUrl("auth"), {
    proxyReqPathResolver: (req: Request) => {
      return "/auth" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Auth Service Error:", err.message);
      res.status(503).json({
        success: false,
        message: "Auth Service unavailable",
        error: err.message,
      });
    },
  }),
);

/**
 * Cargo Service Routes
 * Routes all /api/cargo requests to Cargo Service
 */
router.use(
  "/cargo",
  proxy(getServiceUrl("cargo"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/cargo" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Cargo Service Error:", err.message);
      res.status(503).json({
        success: false,
        message: "Cargo Service unavailable",
        error: err.message,
      });
    },
  }),
);

/**
 * Flight Service Routes
 * Routes all /api/flight requests to Flight Service
 * (To be implemented)
 */
router.use(
  "/flight",
  proxy(getServiceUrl("flight"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/flight" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Flight Service Error:", err.message);
      res.status(503).json({
        success: false,
        message: "Flight Service unavailable",
        error: err.message,
      });
    },
  }),
);

/**
 * Tracking Service Routes
 * Routes all /api/tracking requests to Tracking Service
 * (To be implemented)
 */
router.use(
  "/tracking",
  proxy(getServiceUrl("tracking"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/tracking" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Tracking Service Error:", err.message);
      res.status(503).json({
        success: false,
        message: "Tracking Service unavailable",
        error: err.message,
      });
    },
  }),
);

/**
 * Customs Service Routes
 * Routes all /api/customs requests to Customs Service
 * (To be implemented)
 */
router.use(
  "/customs",
  proxy(getServiceUrl("customs"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/customs" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Customs Service Error:", err.message);
      res.status(503).json({
        success: false,
        message: "Customs Service unavailable",
        error: err.message,
      });
    },
  }),
);

export default router;
