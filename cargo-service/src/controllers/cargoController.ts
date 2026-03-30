import { Request, Response } from 'express';
import { CargoService } from '../services/cargoService';
import { CreateCargoDTO, UpdateCargoDTO, ApiResponse, CargoResponse } from '../types';
import { CargoStatus } from '@prisma/client';

export class CargoController {
  private cargoService: CargoService;

  constructor() {
    this.cargoService = new CargoService();
  }

  /**
   * Create a new cargo shipment
   * POST /api/cargo
   */
  createCargo = async (req: Request, res: Response): Promise<void> => {
    try {
      const cargoData: CreateCargoDTO = req.body;
      const cargo = await this.cargoService.createCargo(cargoData);
      
      const response: ApiResponse<CargoResponse> = {
        success: true,
        message: 'Cargo created successfully',
        data: cargo,
      };
      res.status(201).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to create cargo';
      res.status(400).json({
        success: false,
        message: 'Failed to create cargo',
        error: errorMsg,
      });
    }
  };

  /**
   * Get all cargo
   * GET /api/cargo
   */
  getAllCargo = async (req: Request, res: Response): Promise<void> => {
    try {
      const cargo = await this.cargoService.getAllCargo();
      
      const response: ApiResponse<CargoResponse[]> = {
        success: true,
        message: 'Cargo retrieved successfully',
        data: cargo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to retrieve cargo';
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve cargo',
        error: errorMsg,
      });
    }
  };

  /**
   * Get cargo by ID
   * GET /api/cargo/:id
   */
  getCargoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const cargo = await this.cargoService.getCargoById(id);
      
      if (!cargo) {
        res.status(404).json({
          success: false,
          message: 'Cargo not found',
        });
        return;
      }

      const response: ApiResponse<CargoResponse> = {
        success: true,
        message: 'Cargo retrieved successfully',
        data: cargo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to retrieve cargo';
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve cargo',
        error: errorMsg,
      });
    }
  };

  /**
   * Get cargo by tracking number
   * GET /api/cargo/track/:trackingNumber
   */
  getCargoByTrackingNumber = async (req: Request, res: Response): Promise<void> => {
    try {
      const { trackingNumber } = req.params;
      const cargo = await this.cargoService.getCargoByTrackingNumber(trackingNumber);
      
      if (!cargo) {
        res.status(404).json({
          success: false,
          message: 'Cargo not found',
        });
        return;
      }

      const response: ApiResponse<CargoResponse> = {
        success: true,
        message: 'Cargo retrieved successfully',
        data: cargo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to retrieve cargo';
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve cargo',
        error: errorMsg,
      });
    }
  };

  /**
   * Update cargo details
   * PUT /api/cargo/:id
   */
  updateCargo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: UpdateCargoDTO = req.body;
      const cargo = await this.cargoService.updateCargo(id, updateData);
      
      const response: ApiResponse<CargoResponse> = {
        success: true,
        message: 'Cargo updated successfully',
        data: cargo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to update cargo';
      res.status(400).json({
        success: false,
        message: 'Failed to update cargo',
        error: errorMsg,
      });
    }
  };

  /**
   * Update cargo status
   * PATCH /api/cargo/:id/status
   */
  updateCargoStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status is valid CargoStatus enum
      const validStatuses = Object.values(CargoStatus);
      if (!validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        });
        return;
      }

      const cargo = await this.cargoService.updateCargoStatus(id, status as CargoStatus);
      
      const response: ApiResponse<CargoResponse> = {
        success: true,
        message: 'Cargo status updated successfully',
        data: cargo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to update cargo status';
      res.status(400).json({
        success: false,
        message: 'Failed to update cargo status',
        error: errorMsg,
      });
    }
  };

  /**
   * Get cargo by status
   * GET /api/cargo/status/:status
   */
  getCargoByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.params;

      // Validate status is valid CargoStatus enum
      const validStatuses = Object.values(CargoStatus);
      if (!validStatuses.includes(status as CargoStatus)) {
        res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        });
        return;
      }

      const cargo = await this.cargoService.getCargoByStatus(status as CargoStatus);
      
      const response: ApiResponse<CargoResponse[]> = {
        success: true,
        message: 'Cargo retrieved successfully',
        data: cargo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to retrieve cargo';
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve cargo',
        error: errorMsg,
      });
    }
  };

  /**
   * Delete cargo
   * DELETE /api/cargo/:id
   */
  deleteCargo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.cargoService.deleteCargo(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Cargo deleted successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete cargo';
      res.status(400).json({
        success: false,
        message: 'Failed to delete cargo',
        error: errorMsg,
      });
    }
  };
}
