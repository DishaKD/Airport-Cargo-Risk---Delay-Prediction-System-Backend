import prisma from "../config/db";
import { CreateFlightDTO, UpdateFlightDTO, FlightResponse } from "../types";

/**
 * FlightService handles flight information management for cargo transport.
 * Responsible for:
 * - Managing flight schedules and routing
 * - Tracking flight status updates (on-time, delayed, cancelled)
 * - Coordinating cargo assignments to flights
 * - Providing flight information for cargo movement prediction
 */
export class FlightService {
  /**
   * Create a new flight
   */
  async createFlight(data: CreateFlightDTO): Promise<FlightResponse> {
    const flight = await prisma.flight.create({
      data: {
        flightNumber: data.flightNumber,
        airlineCode: data.airlineCode,
        aircraftType: data.aircraftType,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
      },
    });

    return {
      id: flight.id,
      flightNumber: flight.flightNumber,
      airlineCode: flight.airlineCode,
      aircraftType: flight.aircraftType,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      status: flight.status,
      createdAt: flight.createdAt,
      updatedAt: flight.updatedAt,
    };
  }

  /**
   * Get all flights
   */
  async getAllFlights(): Promise<FlightResponse[]> {
    const flights = await prisma.flight.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      airlineCode: flight.airlineCode,
      aircraftType: flight.aircraftType,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      status: flight.status,
      createdAt: flight.createdAt,
      updatedAt: flight.updatedAt,
    }));
  }

  /**
   * Get flight by ID
   */
  async getFlightById(id: string): Promise<FlightResponse | null> {
    const flight = await prisma.flight.findUnique({
      where: { id },
    });

    if (!flight) {
      return null;
    }

    return {
      id: flight.id,
      flightNumber: flight.flightNumber,
      airlineCode: flight.airlineCode,
      aircraftType: flight.aircraftType,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      status: flight.status,
      createdAt: flight.createdAt,
      updatedAt: flight.updatedAt,
    };
  }

  /**
   * Update flight
   */
  async updateFlight(
    id: string,
    data: UpdateFlightDTO,
  ): Promise<FlightResponse> {
    const flight = await prisma.flight.update({
      where: { id },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.aircraftType && { aircraftType: data.aircraftType }),
      },
    });

    return {
      id: flight.id,
      flightNumber: flight.flightNumber,
      airlineCode: flight.airlineCode,
      aircraftType: flight.aircraftType,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      status: flight.status,
      createdAt: flight.createdAt,
      updatedAt: flight.updatedAt,
    };
  }

  /**
   * Delete flight
   */
  async deleteFlight(id: string): Promise<boolean> {
    try {
      await prisma.flight.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get flights by status (e.g., active flights for cargo routing)
   * Used to find available flights for cargo assignment
   */
  async getFlightsByStatus(status: string): Promise<FlightResponse[]> {
    const flights = await prisma.flight.findMany({
      where: { status: status as any },
      orderBy: {
        createdAt: "desc",
      },
    });

    return flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      airlineCode: flight.airlineCode,
      aircraftType: flight.aircraftType,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      status: flight.status,
      createdAt: flight.createdAt,
      updatedAt: flight.updatedAt,
    }));
  }

  /**
   * Get flights by route (departure and arrival airports)
   * Useful for cargo movement planning between specific locations
   */
  async getFlightsByRoute(
    departureAirport: string,
    arrivalAirport: string,
  ): Promise<FlightResponse[]> {
    const flights = await prisma.flight.findMany({
      where: {
        departureAirport,
        arrivalAirport,
        status: { not: "CANCELLED" },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      airlineCode: flight.airlineCode,
      aircraftType: flight.aircraftType,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      status: flight.status,
      createdAt: flight.createdAt,
      updatedAt: flight.updatedAt,
    }));
  }
}
