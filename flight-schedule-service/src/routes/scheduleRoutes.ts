import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";

const router: Router = Router();
const scheduleController = new ScheduleController();

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     description: Creates a new flight schedule with the provided details
 *     tags:
 *       - Schedules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateScheduleRequest'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - missing or invalid fields
 */
router.post("/", scheduleController.createSchedule);

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Get all schedules
 *     description: Retrieves a list of all flight schedules
 *     tags:
 *       - Schedules
 *     responses:
 *       200:
 *         description: List of all schedules
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/", scheduleController.getAllSchedules);

/**
 * @swagger
 * /api/schedules/flight/{flightId}:
 *   get:
 *     summary: Get schedule by flight ID
 *     description: Retrieves a schedule for a specific flight
 *     tags:
 *       - Schedules
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Schedule found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 */
router.get("/flight/:flightId", scheduleController.getScheduleByFlightId);

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     description: Retrieves a schedule by its ID
 *     tags:
 *       - Schedules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", scheduleController.getScheduleById);

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: Update schedule
 *     description: Updates a schedule with the provided details
 *     tags:
 *       - Schedules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduledDeparture:
 *                 type: string
 *                 format: date-time
 *               scheduledArrival:
 *                 type: string
 *                 format: date-time
 *               estimatedDeparture:
 *                 type: string
 *                 format: date-time
 *               estimatedArrival:
 *                 type: string
 *                 format: date-time
 *               actualDeparture:
 *                 type: string
 *                 format: date-time
 *               actualArrival:
 *                 type: string
 *                 format: date-time
 *               gate:
 *                 type: string
 *               terminal:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       400:
 *         description: Bad request - invalid fields
 *       500:
 *         description: Internal server error
 */
router.put("/:id", scheduleController.updateSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: Delete schedule
 *     description: Deletes a schedule by its ID
 *     tags:
 *       - Schedules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", scheduleController.deleteSchedule);

export default router;
