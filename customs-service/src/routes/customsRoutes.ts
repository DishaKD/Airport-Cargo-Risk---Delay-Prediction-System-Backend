import { Router } from 'express';
import { CustomsController } from '../controllers/customs.controller';

const router = Router();

/**
 * @openapi
 * /api/customs:
 *   get:
 *     summary: Get all clearance records
 *     tags: [Customs]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/', CustomsController.getAllClearances);

/**
 * @openapi
 * /api/customs/{id}:
 *   get:
 *     summary: Get a clearance record by ID
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The clearance record ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', CustomsController.getClearanceById);

/**
 * @openapi
 * /api/customs:
 *   post:
 *     summary: Create a new clearance record
 *     tags: [Customs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cargoId
 *             properties:
 *               cargoId:
 *                 type: string
 *               notes:
 *                 type: string
 *               delayReason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 */
router.post('/', CustomsController.createClearance);

/**
 * @openapi
 * /api/customs/{id}:
 *   put:
 *     summary: Update a clearance record
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clearanceStatus:
 *                 type: string
 *               riskLevel:
 *                 type: string
 *               notes:
 *                 type: string
 *               delayReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.put('/:id', CustomsController.updateClearance);

/**
 * @openapi
 * /api/customs/{id}/inspect:
 *   put:
 *     summary: Simulate an inspection
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clearanceStatus:
 *                 type: string
 *               riskLevel:
 *                 type: string
 *               notes:
 *                 type: string
 *               delayReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id/inspect', CustomsController.simulateInspection);

/**
 * @openapi
 * /api/customs/{id}:
 *   delete:
 *     summary: Delete a clearance record
 *     tags: [Customs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete('/:id', CustomsController.deleteClearance);

export default router;
