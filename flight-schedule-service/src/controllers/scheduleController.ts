import { Request, Response } from "express";
import { ScheduleService } from "../services/scheduleService";
import {
  CreateScheduleDTO,
  UpdateScheduleDTO,
  ApiResponse,
  ScheduleResponse,
} from "../types";

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
  }

  /**
   * Create a new schedule
   * POST /api/schedules
   */
  createSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      const scheduleData: CreateScheduleDTO = req.body;
      const schedule = await this.scheduleService.createSchedule(scheduleData);

      const response: ApiResponse<ScheduleResponse> = {
        success: true,
        message: "Schedule created successfully",
        data: schedule,
      };
      res.status(201).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to create schedule";
      res.status(400).json({
        success: false,
        message: "Failed to create schedule",
        error: errorMsg,
      });
    }
  };

  /**
   * Get all schedules
   * GET /api/schedules
   */
  getAllSchedules = async (req: Request, res: Response): Promise<void> => {
    try {
      const schedules = await this.scheduleService.getAllSchedules();

      const response: ApiResponse<ScheduleResponse[]> = {
        success: true,
        message: "Schedules retrieved successfully",
        data: schedules,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve schedules";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve schedules",
        error: errorMsg,
      });
    }
  };

  /**
   * Get schedule by ID
   * GET /api/schedules/:id
   */
  getScheduleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const schedule = await this.scheduleService.getScheduleById(id);

      if (!schedule) {
        res.status(404).json({
          success: false,
          message: "Schedule not found",
        });
        return;
      }

      const response: ApiResponse<ScheduleResponse> = {
        success: true,
        message: "Schedule retrieved successfully",
        data: schedule,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve schedule";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve schedule",
        error: errorMsg,
      });
    }
  };

  /**
   * Get schedule by flight ID
   * GET /api/schedules/flight/:flightId
   */
  getScheduleByFlightId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { flightId } = req.params;
      const schedule =
        await this.scheduleService.getScheduleByFlightId(flightId);

      if (!schedule) {
        res.status(404).json({
          success: false,
          message: "Schedule not found for this flight",
        });
        return;
      }

      const response: ApiResponse<ScheduleResponse> = {
        success: true,
        message: "Schedule retrieved successfully",
        data: schedule,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve schedule";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve schedule",
        error: errorMsg,
      });
    }
  };

  /**
   * Update schedule
   * PUT /api/schedules/:id
   */
  updateSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const scheduleData: UpdateScheduleDTO = req.body;
      const schedule = await this.scheduleService.updateSchedule(
        id,
        scheduleData,
      );

      const response: ApiResponse<ScheduleResponse> = {
        success: true,
        message: "Schedule updated successfully",
        data: schedule,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to update schedule";
      res.status(400).json({
        success: false,
        message: "Failed to update schedule",
        error: errorMsg,
      });
    }
  };

  /**
   * Delete schedule
   * DELETE /api/schedules/:id
   */
  deleteSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.scheduleService.deleteSchedule(id);

      if (!success) {
        res.status(404).json({
          success: false,
          message: "Schedule not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Schedule deleted successfully",
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to delete schedule";
      res.status(500).json({
        success: false,
        message: "Failed to delete schedule",
        error: errorMsg,
      });
    }
  };
}
