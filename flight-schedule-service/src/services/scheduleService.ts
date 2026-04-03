import prisma from "../config/db";
import {
  CreateScheduleDTO,
  UpdateScheduleDTO,
  ScheduleResponse,
} from "../types";

export class ScheduleService {
  /**
   * Create a new schedule
   */
  async createSchedule(data: CreateScheduleDTO): Promise<ScheduleResponse> {
    const schedule = await prisma.schedule.create({
      data: {
        flightId: data.flightId,
        scheduledDeparture: new Date(data.scheduledDeparture),
        scheduledArrival: new Date(data.scheduledArrival),
        gate: data.gate,
        terminal: data.terminal,
        notes: data.notes,
      },
    });

    return this.mapToResponse(schedule);
  }

  /**
   * Get all schedules
   */
  async getAllSchedules(): Promise<ScheduleResponse[]> {
    const schedules = await prisma.schedule.findMany({
      orderBy: {
        scheduledDeparture: "asc",
      },
    });

    return schedules.map((schedule) => this.mapToResponse(schedule));
  }

  /**
   * Get schedule by ID
   */
  async getScheduleById(id: string): Promise<ScheduleResponse | null> {
    const schedule = await prisma.schedule.findUnique({
      where: { id },
    });

    if (!schedule) {
      return null;
    }

    return this.mapToResponse(schedule);
  }

  /**
   * Get schedule by flight ID
   */
  async getScheduleByFlightId(
    flightId: string,
  ): Promise<ScheduleResponse | null> {
    const schedule = await prisma.schedule.findFirst({
      where: { flightId },
    });

    if (!schedule) {
      return null;
    }

    return this.mapToResponse(schedule);
  }

  /**
   * Update schedule
   */
  async updateSchedule(
    id: string,
    data: UpdateScheduleDTO,
  ): Promise<ScheduleResponse> {
    const schedule = await prisma.schedule.update({
      where: { id },
      data: {
        ...(data.scheduledDeparture && {
          scheduledDeparture: new Date(data.scheduledDeparture),
        }),
        ...(data.scheduledArrival && {
          scheduledArrival: new Date(data.scheduledArrival),
        }),
        ...(data.estimatedDeparture && {
          estimatedDeparture: new Date(data.estimatedDeparture),
        }),
        ...(data.estimatedArrival && {
          estimatedArrival: new Date(data.estimatedArrival),
        }),
        ...(data.actualDeparture && {
          actualDeparture: new Date(data.actualDeparture),
        }),
        ...(data.actualArrival && {
          actualArrival: new Date(data.actualArrival),
        }),
        ...(data.gate !== undefined && { gate: data.gate }),
        ...(data.terminal !== undefined && { terminal: data.terminal }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
    });

    return this.mapToResponse(schedule);
  }

  /**
   * Delete schedule
   */
  async deleteSchedule(id: string): Promise<boolean> {
    try {
      await prisma.schedule.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Helper method to map schedule to response format
   */
  private mapToResponse(schedule: any): ScheduleResponse {
    return {
      id: schedule.id,
      flightId: schedule.flightId,
      scheduledDeparture: schedule.scheduledDeparture,
      scheduledArrival: schedule.scheduledArrival,
      estimatedDeparture: schedule.estimatedDeparture || undefined,
      estimatedArrival: schedule.estimatedArrival || undefined,
      actualDeparture: schedule.actualDeparture || undefined,
      actualArrival: schedule.actualArrival || undefined,
      gate: schedule.gate || undefined,
      terminal: schedule.terminal || undefined,
      notes: schedule.notes || undefined,
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
    };
  }
}
