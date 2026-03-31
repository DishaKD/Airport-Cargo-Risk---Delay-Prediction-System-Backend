import { Request, Response } from "express";
import { FlightService } from "../services/flightService";
import {
  CreateFlightDTO,
  UpdateFlightDTO,
  ApiResponse,
  FlightResponse,
} from "../types";

export class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  /**
   * Create a new flight
   * POST /api/flights
   */
  createFlight = async (req: Request, res: Response): Promise<void> => {
    try {
      const flightData: CreateFlightDTO = req.body;
      const flight = await this.flightService.createFlight(flightData);

      const response: ApiResponse<FlightResponse> = {
        success: true,
        message: "Flight created successfully",
        data: flight,
      };
      res.status(201).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to create flight";
      res.status(400).json({
        success: false,
        message: "Failed to create flight",
        error: errorMsg,
      });
    }
  };

  /**
   * Get all flights
   * GET /api/flights
   */
  getAllFlights = async (req: Request, res: Response): Promise<void> => {
    try {
      const flights = await this.flightService.getAllFlights();

      const response: ApiResponse<FlightResponse[]> = {
        success: true,
        message: "Flights retrieved successfully",
        data: flights,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve flights";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve flights",
        error: errorMsg,
      });
    }
  };

  /**
   * Get flight by ID
   * GET /api/flights/:id
   */
  getFlightById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const flight = await this.flightService.getFlightById(id);

      if (!flight) {
        res.status(404).json({
          success: false,
          message: "Flight not found",
        });
        return;
      }

      const response: ApiResponse<FlightResponse> = {
        success: true,
        message: "Flight retrieved successfully",
        data: flight,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve flight";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve flight",
        error: errorMsg,
      });
    }
  };

  /**
   * Update flight
   * PUT /api/flights/:id
   */
  updateFlight = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const flightData: UpdateFlightDTO = req.body;
      const flight = await this.flightService.updateFlight(id, flightData);

      const response: ApiResponse<FlightResponse> = {
        success: true,
        message: "Flight updated successfully",
        data: flight,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to update flight";
      res.status(400).json({
        success: false,
        message: "Failed to update flight",
        error: errorMsg,
      });
    }
  };

  /**
   * Delete flight
   * DELETE /api/flights/:id
   */
  deleteFlight = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.flightService.deleteFlight(id);

      if (!success) {
        res.status(404).json({
          success: false,
          message: "Flight not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Flight deleted successfully",
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to delete flight";
      res.status(500).json({
        success: false,
        message: "Failed to delete flight",
        error: errorMsg,
      });
    }
  };

  /**
   * Get flights by status
   * GET /api/flights/status/:status
   * Used to find available flights for cargo assignment
   */
  getFlightsByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.params;
      const flights = await this.flightService.getFlightsByStatus(status);

      const response: ApiResponse<FlightResponse[]> = {
        success: true,
        message: `Flights with status '${status}' retrieved successfully`,
        data: flights,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve flights";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve flights",
        error: errorMsg,
      });
    }
  };

  /**
   * Get flights by route
   * GET /api/flights/route/:departureAirport/:arrivalAirport
   * Useful for cargo movement planning between specific locations
   */
  getFlightsByRoute = async (req: Request, res: Response): Promise<void> => {
    try {
      const { departureAirport, arrivalAirport } = req.params;
      const flights = await this.flightService.getFlightsByRoute(
        departureAirport,
        arrivalAirport,
      );

      const response: ApiResponse<FlightResponse[]> = {
        success: true,
        message: `Available flights from ${departureAirport} to ${arrivalAirport}`,
        data: flights,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to retrieve flights";
      res.status(500).json({
        success: false,
        message: "Failed to retrieve flights",
        error: errorMsg,
      });
    }
  };
}
