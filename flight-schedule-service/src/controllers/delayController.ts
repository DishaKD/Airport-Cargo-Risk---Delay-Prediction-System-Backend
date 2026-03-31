import { Request, Response } from "express";
import { DelayService } from "../services/delayService";
import {
  CreateDelayDTO,
  UpdateDelayDTO,
  ApiResponse,
  DelayResponse,
} from "../types";

export class DelayController {
  private delayService: DelayService;

  constructor() {
    this.delayService = new DelayService();
  }

  /**
   * Create a new delay report
   * POST /api/delays
   */
  createDelay = async (req: Request, res: Response): Promise<void> => {
    try {
      const delayData: CreateDelayDTO = req.body;
      const delay = await this.delayService.createDelay(delayData);

      const response: ApiResponse<DelayResponse> = {
        success: true,
        message: "Delay reported successfully",
        data: delay,
      };
      res.status(201).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to report delay";
      res.status(400).json({
        success: false,
        message: "Failed to report delay",
        error: errorMsg,
      });
    }
  };

  /**
   * Get all delays
   * GET /api/delays
   */
  getAllDelays = async (req: Request, res: Response): Promise<void> => {
    try {
      const delays = await this.delayService.getAllDelays();

      const response: ApiResponse<DelayResponse[]> = {
        success: true,
        message: "Delays retrieved successfully",
        data: delays,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve delays";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve delays",
        error: errorMsg,
      });
    }
  };

  /**
   * Get delays by flight ID
   * GET /api/delays/flight/:flightId
   */
  getDelaysByFlightId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { flightId } = req.params;
      const delays = await this.delayService.getDelaysByFlightId(flightId);

      const response: ApiResponse<DelayResponse[]> = {
        success: true,
        message: "Flight delays retrieved successfully",
        data: delays,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve delays";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve delays",
        error: errorMsg,
      });
    }
  };

  /**
   * Get active delays
   * GET /api/delays/active
   */
  getActiveDelays = async (req: Request, res: Response): Promise<void> => {
    try {
      const delays = await this.delayService.getActiveDelays();

      const response: ApiResponse<DelayResponse[]> = {
        success: true,
        message: "Active delays retrieved successfully",
        data: delays,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Failed to retrieve active delays";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve active delays",
        error: errorMsg,
      });
    }
  };

  /**
   * Get delay by ID
   * GET /api/delays/:id
   */
  getDelayById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const delay = await this.delayService.getDelayById(id);

      if (!delay) {
        res.status(404).json({
          success: false,
          message: "Delay not found",
        });
        return;
      }

      const response: ApiResponse<DelayResponse> = {
        success: true,
        message: "Delay retrieved successfully",
        data: delay,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve delay";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve delay",
        error: errorMsg,
      });
    }
  };

  /**
   * Update delay
   * PUT /api/delays/:id
   */
  updateDelay = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const delayData: UpdateDelayDTO = req.body;
      const delay = await this.delayService.updateDelay(id, delayData);

      const response: ApiResponse<DelayResponse> = {
        success: true,
        message: "Delay updated successfully",
        data: delay,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to update delay";
      res.status(400).json({
        success: false,
        message: "Failed to update delay",
        error: errorMsg,
      });
    }
  };

  /**
   * Delete delay
   * DELETE /api/delays/:id
   */
  deleteDelay = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.delayService.deleteDelay(id);

      if (!success) {
        res.status(404).json({
          success: false,
          message: "Delay not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Delay deleted successfully",
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to delete delay";
      res.status(500).json({
        success: false,
        message: "Failed to delete delay",
        error: errorMsg,
      });
    }
  };
}
