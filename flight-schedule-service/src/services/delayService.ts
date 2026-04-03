import prisma from "../config/db";
import { CreateDelayDTO, UpdateDelayDTO, DelayResponse } from "../types";

export class DelayService {
  /**
   * Create a new delay report
   */
  async createDelay(data: CreateDelayDTO): Promise<DelayResponse> {
    const delay = await prisma.delay.create({
      data: {
        flightId: data.flightId,
        reason: data.reason,
        estimatedDelay: data.estimatedDelay,
        description: data.description,
      },
    });

    return this.mapToResponse(delay);
  }

  /**
   * Get all delays
   */
  async getAllDelays(): Promise<DelayResponse[]> {
    const delays = await prisma.delay.findMany({
      orderBy: {
        reportedAt: "desc",
      },
    });

    return delays.map((delay) => this.mapToResponse(delay));
  }

  /**
   * Get delay by ID
   */
  async getDelayById(id: string): Promise<DelayResponse | null> {
    const delay = await prisma.delay.findUnique({
      where: { id },
    });

    if (!delay) {
      return null;
    }

    return this.mapToResponse(delay);
  }

  /**
   * Get delays by flight ID
   */
  async getDelaysByFlightId(flightId: string): Promise<DelayResponse[]> {
    const delays = await prisma.delay.findMany({
      where: { flightId },
      orderBy: {
        reportedAt: "desc",
      },
    });

    return delays.map((delay) => this.mapToResponse(delay));
  }

  /**
   * Get active delays (not resolved)
   */
  async getActiveDelays(): Promise<DelayResponse[]> {
    const delays = await prisma.delay.findMany({
      where: {
        resolvedAt: null,
      },
      orderBy: {
        reportedAt: "desc",
      },
    });

    return delays.map((delay) => this.mapToResponse(delay));
  }

  /**
   * Update delay
   */
  async updateDelay(id: string, data: UpdateDelayDTO): Promise<DelayResponse> {
    const delay = await prisma.delay.update({
      where: { id },
      data: {
        ...(data.estimatedDelay !== undefined && {
          estimatedDelay: data.estimatedDelay,
        }),
        ...(data.actualDelay !== undefined && {
          actualDelay: data.actualDelay,
        }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.resolvedAt !== undefined && { resolvedAt: data.resolvedAt }),
      },
    });

    return this.mapToResponse(delay);
  }

  /**
   * Delete delay
   */
  async deleteDelay(id: string): Promise<boolean> {
    try {
      await prisma.delay.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Helper method to map delay to response format
   */
  private mapToResponse(delay: any): DelayResponse {
    return {
      id: delay.id,
      flightId: delay.flightId,
      reason: delay.reason,
      estimatedDelay: delay.estimatedDelay,
      actualDelay: delay.actualDelay || undefined,
      description: delay.description || undefined,
      reportedAt: delay.reportedAt,
      resolvedAt: delay.resolvedAt || undefined,
      createdAt: delay.createdAt,
      updatedAt: delay.updatedAt,
    };
  }
}
