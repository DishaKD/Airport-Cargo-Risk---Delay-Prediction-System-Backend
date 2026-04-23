import { Router, Request, Response } from "express";
import type { Router as ExpressRouter } from "express";
import proxy from "express-http-proxy";
import { getServiceUrl } from "../config/services";

const router: ExpressRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and Authorization Endpoints
 *   - name: Cargo
 *     description: Cargo Management Endpoints
 *   - name: Flight
 *     description: Flight Schedule Endpoints
 *   - name: Schedules
 *     description: Flight Schedule Management Endpoints
 *   - name: Delays
 *     description: Flight Delay Reporting Endpoints
 *   - name: Tracking
 *     description: Cargo Tracking Endpoints
 *   - name: Customs
 *     description: Customs Clearance Endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.use(
  "/auth",
  proxy(getServiceUrl("auth"), {
    proxyReqPathResolver: (req: Request) => {
      return "/auth" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Auth Service Error:", err.message);
      res.status(503).json({ success: false, message: "Auth Service unavailable", error: err.message });
    },
  }),
);

/**
 * @swagger
 * /api/cargo/:
 *   post:
 *     summary: Create new cargo
 *     tags: [Cargo]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get all cargo
 *     tags: [Cargo]
 *     responses:
 *       200:
 *         description: Success
 * /api/cargo/{id}:
 *   get:
 *     summary: Get cargo by ID
 *     tags: [Cargo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update cargo
 *     tags: [Cargo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete cargo
 *     tags: [Cargo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/cargo/status/{status}:
 *   get:
 *     summary: Get cargo by status
 *     tags: [Cargo]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/cargo/track/{trackingNumber}:
 *   get:
 *     summary: Get cargo by tracking number
 *     tags: [Cargo]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/cargo/{id}/status:
 *   patch:
 *     summary: Update cargo status
 *     tags: [Cargo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 */
router.use(
  "/cargo",
  proxy(getServiceUrl("cargo"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/cargo" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Cargo Service Error:", err.message);
      res.status(503).json({ success: false, message: "Cargo Service unavailable", error: err.message });
    },
  }),
);

/**
 * @swagger
 * /api/flight/:
 *   post:
 *     summary: Create new flight
 *     tags: [Flight]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get all flights
 *     tags: [Flight]
 *     responses:
 *       200:
 *         description: Success
 * /api/flight/{id}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update flight
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete flight
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/flight/status/{status}:
 *   get:
 *     summary: Get flights by status
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/flight/route/{departureAirport}/{arrivalAirport}:
 *   get:
 *     summary: Get flights by route
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: departureAirport
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: arrivalAirport
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.use(
  "/flight",
  proxy(getServiceUrl("flight"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/flights" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Flight Service Error:", err.message);
      res.status(503).json({ success: false, message: "Flight Service unavailable", error: err.message });
    },
  }),
);

/**
 * @swagger
 * /api/tracking/create:
 *   post:
 *     summary: Create tracking record
 *     tags: [Tracking]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 * /api/tracking/update:
 *   post:
 *     summary: Update tracking location
 *     tags: [Tracking]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/:
 *   get:
 *     summary: Get all trackings
 *     tags: [Tracking]
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/delays:
 *   get:
 *     summary: Get delayed trackings
 *     tags: [Tracking]
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/location/{location}:
 *   get:
 *     summary: Get trackings by location
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/track/{trackingNumber}:
 *   get:
 *     summary: Get tracking by tracking number
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/history/{cargoId}:
 *   get:
 *     summary: Get movement history
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/{cargoId}:
 *   get:
 *     summary: Get tracking info
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete tracking
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/{cargoId}/deliver:
 *   patch:
 *     summary: Mark tracking as delivered
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 * /api/tracking/{cargoId}/status:
 *   patch:
 *     summary: Manually update status
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success


/**
 * @swagger
 * /api/schedule/:
 *   post:
 *     summary: Create new schedule
 *     tags: [Schedules]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: Success
 * /api/schedule/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update schedule
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete schedule
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/schedule/flight/{flightId}:
 *   get:
 *     summary: Get schedules by flight ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.use(
  "/schedule",
  proxy(getServiceUrl("flight"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/schedules" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Schedule Proxy Error:", err.message);
      res.status(503).json({ success: false, message: "Flight Schedule Service unavailable", error: err.message });
    },
  }),
);

/**
 * @swagger
 * /api/delay/:
 *   post:
 *     summary: Report new delay
 *     tags: [Delays]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get all delays
 *     tags: [Delays]
 *     responses:
 *       200:
 *         description: Success
 * /api/delay/active:
 *   get:
 *     summary: Get active delays
 *     tags: [Delays]
 *     responses:
 *       200:
 *         description: Success
 * /api/delay/{id}:
 *   get:
 *     summary: Get delay by ID
 *     tags: [Delays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update delay info
 *     tags: [Delays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete delay info
 *     tags: [Delays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/delay/flight/{flightId}:
 *   get:
 *     summary: Get delays by flight ID
 *     tags: [Delays]
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.use(
  "/delay",
  proxy(getServiceUrl("flight"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/delays" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Delay Proxy Error:", err.message);
      res.status(503).json({ success: false, message: "Flight Schedule Service unavailable", error: err.message });
    },
  }),
);

router.use(
  "/tracking",
  proxy(getServiceUrl("tracking"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/tracking" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Tracking Service Error:", err.message);
      res.status(503).json({ success: false, message: "Tracking Service unavailable", error: err.message });
    },
  }),
);

/**
 * @swagger
 * /api/customs/:
 *   post:
 *     summary: Create customs clearance
 *     tags: [Customs]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get all clearances
 *     tags: [Customs]
 *     responses:
 *       200:
 *         description: Success
 * /api/customs/{id}:
 *   get:
 *     summary: Get clearance by ID
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update clearance
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete clearance
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /api/customs/{id}/inspect:
 *   put:
 *     summary: Simulate clearance inspection
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Success
 */
router.use(
  "/customs",
  proxy(getServiceUrl("customs"), {
    proxyReqPathResolver: (req: Request) => {
      return "/api/customs" + (req.url === "/" ? "" : req.url);
    },
    proxyErrorHandler: (err: Error, res: Response) => {
      console.error("Customs Service Error:", err.message);
      res.status(503).json({ success: false, message: "Customs Service unavailable", error: err.message });
    },
  }),
);

export default router;
