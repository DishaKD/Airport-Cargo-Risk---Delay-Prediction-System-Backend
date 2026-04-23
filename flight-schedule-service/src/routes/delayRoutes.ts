import { Router } from "express";
import { DelayController } from "../controllers/delayController";

const router: Router = Router();
const delayController = new DelayController();

/**
 * @swagger
 * /api/delays:
 *   post:
 *     summary: Report a delay
 *     description: Creates a new delay report for a flight
 *     tags:
 *       - Delays
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDelayRequest'
 *     responses:
 *       201:
 *         description: Delay reported successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - missing or invalid fields
 */
router.post("/", delayController.createDelay);

/**
 * @swagger
 * /api/delays/active:
 *   get:
 *     summary: Get active delays
 *     description: Retrieves a list of all active (unresolved) delays
 *     tags:
 *       - Delays
 *     responses:
 *       200:
 *         description: List of active delays
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/active", delayController.getActiveDelays);

/**
 * @swagger
 * /api/delays:
 *   get:
 *     summary: Get all delays
 *     description: Retrieves a list of all delays
 *     tags:
 *       - Delays
 *     responses:
 *       200:
 *         description: List of all delays
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/", delayController.getAllDelays);

/**
 * @swagger
 * /api/delays/flight/{flightId}:
 *   get:
 *     summary: Get delays for a flight
 *     description: Retrieves all delays for a specific flight
 *     tags:
 *       - Delays
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: List of delays for the flight
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/flight/:flightId", delayController.getDelaysByFlightId);

/**
 * @swagger
 * /api/delays/{id}:
 *   get:
 *     summary: Get delay by ID
 *     description: Retrieves a delay by its ID
 *     tags:
 *       - Delays
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delay ID
 *     responses:
 *       200:
 *         description: Delay found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Delay not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", delayController.getDelayById);

/**
 * @swagger
 * /api/delays/{id}:
 *   put:
 *     summary: Update delay
 *     description: Updates a delay with the provided details
 *     tags:
 *       - Delays
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delay ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estimatedDelay:
 *                 type: number
 *               actualDelay:
 *                 type: number
 *               description:
 *                 type: string
 *               resolvedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Delay updated successfully
 *       400:
 *         description: Bad request - invalid fields
 *       500:
 *         description: Internal server error
 */
router.put("/:id", delayController.updateDelay);

/**
 * @swagger
 * /api/delays/{id}:
 *   delete:
 *     summary: Delete delay
 *     description: Deletes a delay by its ID
 *     tags:
 *       - Delays
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delay ID
 *     responses:
 *       200:
 *         description: Delay deleted successfully
 *       404:
 *         description: Delay not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", delayController.deleteDelay);

export default router;
