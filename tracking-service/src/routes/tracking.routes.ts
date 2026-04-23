import { Router } from "express";
import {
    createTracking,
    updateLocation,
    getAllTrackings,
    deleteTracking,
    markAsDelivered,
    updateStatusManually,
    getByLocation,
    getByTrackingNumber,
    getTrackingInfo,
    getMovementHistory,
    detectDelays,
    getTodos,
} from "../controllers/tracking.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tracking
 *   description: Cargo Location Tracking Logic
 */

/**
 * @swagger
 * /tracking/create:
 *   post:
 *     summary: Create Tracking Record
 *     tags: [Tracking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cargoId
 *               - initialLocation
 *             properties:
 *               cargoId:
 *                 type: string
 *               initialLocation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tracking record created
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Record already exists
 */
router.post("/create", createTracking);

/**
 * @swagger
 * /tracking/update:
 *   post:
 *     summary: Update Cargo Location
 *     tags: [Tracking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cargoId
 *               - location
 *             properties:
 *               cargoId:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Cargo not found
 */
router.post("/update", updateLocation);

/**
 * @swagger
 * /tracking:
 *   get:
 *     summary: Get All Tracking Records
 *     tags: [Tracking]
 *     responses:
 *       200:
 *         description: Full list of tracking records
 */
router.get("/", getAllTrackings);

/**
 * @swagger
 * /tracking/delays:
 *   get:
 *     summary: Detect Delays
 *     tags: [Tracking]
 *     description: Detects and marks delayed cargo (stuck for > 2 hours).
 *     responses:
 *       200:
 *         description: Delays detected and updated
 */
router.get("/delays", detectDelays);

/**
 * @swagger
 * /tracking/location/{location}:
 *   get:
 *     summary: Get Cargos by Location
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cargo at location
 */
router.get("/location/:location", getByLocation);

/**
 * @swagger
 * /tracking/track/{trackingNumber}:
 *   get:
 *     summary: Get Tracking by Tracking Number
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "TRK-20260330-0001"
 *     responses:
 *       200:
 *         description: Tracking details with history
 *       404:
 *         description: Tracking number not found
 */
router.get("/track/:trackingNumber", getByTrackingNumber);

/**
 * @swagger
 * /tracking/history/{cargoId}:
 *   get:
 *     summary: Get Movement History
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved movement history
 *       400:
 *         description: Missing cargoId
 */
router.get("/history/:cargoId", getMovementHistory);

/**
 * @swagger
 * /tracking/{cargoId}:
 *   get:
 *     summary: Get Current Tracking Info
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Current tracking information
 *       404:
 *         description: Cargo not found
 */
router.get("/:cargoId", getTrackingInfo);

/**
 * @swagger
 * /tracking/{cargoId}:
 *   delete:
 *     summary: Delete Tracking Record
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Record not found
 */
router.delete("/:cargoId", deleteTracking);

/**
 * @swagger
 * /tracking/{cargoId}/deliver:
 *   patch:
 *     summary: Mark as Delivered
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully marked delivered
 *       404:
 *         description: Record not found
 */
router.patch("/:cargoId/deliver", markAsDelivered);

/**
 * @swagger
 * /tracking/{cargoId}/status:
 *   patch:
 *     summary: Update Status Manually
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: cargoId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PROCESSING, IN_TRANSIT, ARRIVED, DELAYED, DELIVERED]
 *     responses:
 *       200:
 *         description: Successfully updated status
 *       404:
 *         description: Record not found
 */
router.patch("/:cargoId/status", updateStatusManually);

/**
 * @swagger
 * /tracking/todos:
 *   get:
 *     summary: Get Sample Todos from Supabase
 *     tags: [Tracking]
 *     responses:
 *       200:
 *         description: List of todos from Supabase
 */
router.get("/todos/sample", getTodos);

export default router;
