import prisma from '../config/db';
import { CreateCargoDTO, UpdateCargoDTO, CargoResponse } from '../types';
import { CargoStatus } from '@prisma/client';

export class CargoService {
  /**
   * Create a new cargo shipment
   */
  async createCargo(data: CreateCargoDTO): Promise<CargoResponse> {
    const cargo = await prisma.cargo.create({
      data: {
        trackingNumber: data.trackingNumber,
        description: data.description,
        weight: data.weight,
        dimensions: data.dimensions,
        cargoType: data.cargoType,
        origin: data.origin,
        destination: data.destination,
        flightId: data.flightId,
      },
    });

    return {
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    };
  }

  /**
   * Get all cargo
   */
  async getAllCargo(): Promise<CargoResponse[]> {
    const cargoList = await prisma.cargo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return cargoList.map((cargo) => ({
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    }));
  }

  /**
   * Get cargo by ID
   */
  async getCargoById(id: string): Promise<CargoResponse | null> {
    const cargo = await prisma.cargo.findUnique({
      where: { id },
    });

    if (!cargo) return null;

    return {
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    };
  }

  /**
   * Get cargo by tracking number
   */
  async getCargoByTrackingNumber(trackingNumber: string): Promise<CargoResponse | null> {
    const cargo = await prisma.cargo.findUnique({
      where: { trackingNumber },
    });

    if (!cargo) return null;

    return {
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    };
  }

  /**
   * Update cargo details
   */
  async updateCargo(id: string, data: UpdateCargoDTO): Promise<CargoResponse> {
    const cargo = await prisma.cargo.update({
      where: { id },
      data: {
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.flightId !== undefined && { flightId: data.flightId }),
      },
    });

    return {
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    };
  }

  /**
   * Update cargo status
   */
  async updateCargoStatus(id: string, status: CargoStatus): Promise<CargoResponse> {
    const cargo = await prisma.cargo.update({
      where: { id },
      data: { status },
    });

    return {
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    };
  }

  /**
   * Get cargo by status
   */
  async getCargoByStatus(status: CargoStatus): Promise<CargoResponse[]> {
    const cargoList = await prisma.cargo.findMany({
      where: { status },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return cargoList.map((cargo) => ({
      id: cargo.id,
      trackingNumber: cargo.trackingNumber,
      description: cargo.description,
      weight: cargo.weight,
      dimensions: cargo.dimensions,
      cargoType: cargo.cargoType,
      status: cargo.status,
      origin: cargo.origin,
      destination: cargo.destination,
      flightId: cargo.flightId || undefined,
      createdAt: cargo.createdAt,
      updatedAt: cargo.updatedAt,
    }));
  }

  /**
   * Delete cargo
   */
  async deleteCargo(id: string): Promise<void> {
    await prisma.cargo.delete({
      where: { id },
    });
  }
}
