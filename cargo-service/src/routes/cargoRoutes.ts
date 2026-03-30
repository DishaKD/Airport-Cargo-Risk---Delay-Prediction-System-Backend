import { Router } from 'express';
import { CargoController } from '../controllers/cargoController';

const router = Router();
const cargoController = new CargoController();

/**
 * Cargo Routes
 */

// Create cargo
router.post('/', cargoController.createCargo);

// Get all cargo
router.get('/', cargoController.getAllCargo);

// Get cargo by status
router.get('/status/:status', cargoController.getCargoByStatus);

// Get cargo by tracking number
router.get('/track/:trackingNumber', cargoController.getCargoByTrackingNumber);

// Get cargo by ID
router.get('/:id', cargoController.getCargoById);

// Update cargo details
router.put('/:id', cargoController.updateCargo);

// Update cargo status
router.patch('/:id/status', cargoController.updateCargoStatus);

// Delete cargo
router.delete('/:id', cargoController.deleteCargo);

export default router;
