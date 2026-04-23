import { Router } from "express";
import { FlightController } from "../controllers/flightController";

const router: Router = Router();
const flightController = new FlightController();

/**
 * @swagger
 * /api/flights:
 *   post:
 *     summary: Create a new flight
 *     description: Creates a new flight with the provided details
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFlightRequest'
 *     responses:
 *       201:
 *         description: Flight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - missing or invalid fields
 */
router.post("/", flightController.createFlight);

/**
 * @swagger
 * /api/flights:
 *   get:
 *     summary: Get all flights
 *     description: Retrieves a list of all flights
 *     tags:
 *       - Flights
 *     responses:
 *       200:
 *         description: List of all flights
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/", flightController.getAllFlights);

/**
 * @swagger
 * /api/flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     description: Retrieves a flight by its ID
 *     tags:
 *       - Flights
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", flightController.getFlightById);

/**
 * @swagger
 * /api/flights/{id}:
 *   put:
 *     summary: Update flight
 *     description: Updates a flight with the provided details
 *     tags:
 *       - Flights
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               aircraftType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Flight updated successfully
 *       400:
 *         description: Bad request - invalid fields
 *       500:
 *         description: Internal server error
 */
router.put("/:id", flightController.updateFlight);

/**
 * @swagger
 * /api/flights/{id}:
 *   delete:
 *     summary: Delete flight
 *     description: Deletes a flight by its ID
 *     tags:
 *       - Flights
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight deleted successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", flightController.deleteFlight);

/**
 * @swagger
 * /api/flights/status/{status}:
 *   get:
 *     summary: Get flights by status
 *     description: Retrieves all flights with a specific status. Useful for finding available flights for cargo assignment
 *     tags:
 *       - Flights
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [SCHEDULED, BOARDING, DEPARTED, IN_TRANSIT, DELAYED, LANDED, CANCELLED]
 *         description: Flight status to filter by
 *     responses:
 *       200:
 *         description: Flights with specified status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/status/:status", flightController.getFlightsByStatus);

/**
 * @swagger
 * /api/flights/route/{departureAirport}/{arrivalAirport}:
 *   get:
 *     summary: Get flights by route
 *     description: Retrieves available flights between two airports. Essential for cargo routing and movement planning
 *     tags:
 *       - Flights
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: departureAirport
 *         required: true
 *         schema:
 *           type: string
 *           example: "JFK"
 *         description: Departure airport IATA code
 *       - in: path
 *         name: arrivalAirport
 *         required: true
 *         schema:
 *           type: string
 *           example: "LAX"
 *         description: Arrival airport IATA code
 *     responses:
 *       200:
 *         description: Available flights for the specified route
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get(
  "/route/:departureAirport/:arrivalAirport",
  flightController.getFlightsByRoute,
);

export default router;
