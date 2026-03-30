import { Request, Response, NextFunction } from 'express';

export const validateCargo = (req: Request, res: Response, next: NextFunction) => {
  const { trackingNumber, description, weight, dimensions, cargoType, origin, destination } = req.body;

  if (!trackingNumber || !description || !weight || !dimensions || !cargoType || !origin || !destination) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  if (typeof weight !== 'number' || weight <= 0) {
    res.status(400).json({
      success: false,
      message: 'Weight must be a positive number',
    });
    return;
  }

  next();
};

export const validateCargoUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;

  const validStatuses = ['PENDING', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED'];

  if (status && !validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
    return;
  }

  next();
};
