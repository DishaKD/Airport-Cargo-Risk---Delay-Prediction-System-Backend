import { Router } from 'express';
import { CargoController } from '../controllers/cargoController';

const router = Router();
const cargoController = new CargoController();

/**
 * @swagger
 * /api/cargo:
 *   post:
 *     summary: Create a new cargo shipment
 *     description: Creates a new cargo shipment with the provided details
 *     tags:
 *       - Cargo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCargoRequest'
 *     responses:
 *       201:
 *         description: Cargo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - missing or invalid fields
 */
router.post('/', cargoController.createCargo);

/**
 * @swagger
 * /api/cargo:
 *   get:
 *     summary: Get all cargo shipments
 *     description: Retrieves a list of all cargo shipments ordered by creation date
 *     tags:
 *       - Cargo
 *     responses:
 *       200:
 *         description: List of all cargo shipments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/', cargoController.getAllCargo);

/**
 * @swagger
 * /api/cargo/status/{status}:
 *   get:
 *     summary: Get cargo by status
 *     description: Retrieves all cargo shipments with a specific status
 *     tags:
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [PENDING, LOADED, IN_TRANSIT, DELIVERED, DELAYED, CANCELLED]
 *         description: The status to filter by
 *     responses:
 *       200:
 *         description: List of cargo with the specified status
 *       400:
 *         description: Invalid status provided
 *       500:
 *         description: Internal server error
 */
router.get('/status/:status', cargoController.getCargoByStatus);

/**
 * @swagger
 * /api/cargo/track/{trackingNumber}:
 *   get:
 *     summary: Get cargo by tracking number
 *     description: Retrieves cargo shipment using its unique tracking number
 *     tags:
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The tracking number of the cargo
 *         example: CARGO-001
 *     responses:
 *       200:
 *         description: Cargo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Cargo not found
 *       500:
 *         description: Internal server error
 */
router.get('/track/:trackingNumber', cargoController.getCargoByTrackingNumber);

/**
 * @swagger
 * /api/cargo/{id}:
 *   get:
 *     summary: Get cargo by ID
 *     description: Retrieves a specific cargo shipment by its unique identifier
 *     tags:
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the cargo
 *     responses:
 *       200:
 *         description: Cargo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Cargo not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', cargoController.getCargoById);

/**
 * @swagger
 * /api/cargo/{id}:
 *   put:
 *     summary: Update cargo details
 *     description: Updates specific details of a cargo shipment
 *     tags:
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the cargo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCargoRequest'
 *     responses:
 *       200:
 *         description: Cargo updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Cargo not found
 */
router.put('/:id', cargoController.updateCargo);

/**
 * @swagger
 * /api/cargo/{id}/status:
 *   patch:
 *     summary: Update cargo status
 *     description: Updates the status of a cargo shipment
 *     tags:
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the cargo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCargoStatusRequest'
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid status provided
 *       404:
 *         description: Cargo not found
 */
router.patch('/:id/status', cargoController.updateCargoStatus);

/**
 * @swagger
 * /api/cargo/{id}:
 *   delete:
 *     summary: Delete cargo
 *     description: Deletes a cargo shipment from the system
 *     tags:
 *       - Cargo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the cargo to delete
 *     responses:
 *       200:
 *         description: Cargo deleted successfully
 *       400:
 *         description: Failed to delete cargo
 *       404:
 *         description: Cargo not found
 */
router.delete('/:id', cargoController.deleteCargo);

export default router;
