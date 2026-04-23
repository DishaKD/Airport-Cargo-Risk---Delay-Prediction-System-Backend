import prisma from '../config/db';

export class CustomsService {
  static async getAll() {
    return await prisma.clearanceRecord.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getById(id: string) {
    return await prisma.clearanceRecord.findUnique({
      where: { id },
    });
  }

  static async create(data: { cargoId: string; notes?: string; delayReason?: string }) {
    return await prisma.clearanceRecord.create({
      data: {
        cargoId: data.cargoId,
        notes: data.notes || null,
        delayReason: data.delayReason || null,
        clearanceStatus: 'PENDING',
        riskLevel: 'LOW',
      },
    });
  }

  static async update(id: string, updates: any) {
    // Filter out undefined values to allow partial updates
    const cleanUpdates = Object.keys(updates).reduce((acc: any, key) => {
      if (updates[key] !== undefined) {
        acc[key] = updates[key];
      }
      return acc;
    }, {});

    return await prisma.clearanceRecord.update({
      where: { id },
      data: cleanUpdates,
    });
  }

  static async simulateInspection(id: string, data: any) {
    const cleanUpdates = Object.keys(data).reduce((acc: any, key) => {
      if (data[key] !== undefined) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    return await prisma.clearanceRecord.update({
      where: { id },
      data: {
        ...cleanUpdates,
        inspectionDate: new Date(),
      },
    });
  }

  static async delete(id: string) {
    return await prisma.clearanceRecord.delete({
      where: { id },
    });
  }
}