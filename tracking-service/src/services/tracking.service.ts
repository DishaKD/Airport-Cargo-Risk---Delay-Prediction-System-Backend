import { prisma } from "../config/db";
import { generateTrackingNumber } from "../utils/trackingGenerator";
import { CargoStatus } from "@prisma/client";

export class TrackingService {

    // ─── Smart Status Mapping ───────────────────────────────────────────────────

    private determineStatusFromLocation(location: string): CargoStatus {
        const loc = location.toLowerCase();
        if (loc.includes("warehouse")) return CargoStatus.PENDING;
        if (loc.includes("loading") || loc.includes("processing")) return CargoStatus.PROCESSING;
        if (loc.includes("aircraft") || loc.includes("flight")) return CargoStatus.IN_TRANSIT;
        if (loc.includes("destination") || loc.includes("arrived")) return CargoStatus.ARRIVED;
        if (loc.includes("deliver")) return CargoStatus.DELIVERED;
        return CargoStatus.IN_TRANSIT; // default
    }

    // ─── 1. Create Tracking Record ──────────────────────────────────────────────

    async createTracking(cargoId: string, initialLocation: string) {
        const trackingNumber = await generateTrackingNumber();
        const status = this.determineStatusFromLocation(initialLocation);

        return await prisma.$transaction(async (tx) => {
            const tracking = await tx.cargoTracking.create({
                data: {
                    cargoId,
                    trackingNumber,
                    currentLocation: initialLocation,
                    status,
                },
            });

            await tx.trackingHistory.create({
                data: { cargoId, location: initialLocation, status },
            });

            return tracking;
        });
    }

    // ─── 2. Update Cargo Location ───────────────────────────────────────────────

    async updateLocation(cargoId: string, location: string) {
        return await prisma.$transaction(async (tx) => {
            const existing = await tx.cargoTracking.findUnique({ where: { cargoId } });
            if (!existing) {
                throw new Error(`Cargo tracking record not found for cargoId: ${cargoId}`);
            }

            const status = this.determineStatusFromLocation(location);

            const updated = await tx.cargoTracking.update({
                where: { cargoId },
                data: { currentLocation: location, status },
            });

            await tx.trackingHistory.create({
                data: { cargoId, location, status },
            });

            return updated;
        });
    }

    // ─── 3. Get All Tracking Records ────────────────────────────────────────────

    async getAllTrackings() {
        return await prisma.cargoTracking.findMany({
            orderBy: { lastUpdated: "desc" },
            include: { history: { orderBy: { timestamp: "desc" }, take: 1 } },
        });
    }

    // ─── 4. Get Tracking Info by Cargo ID ───────────────────────────────────────

    async getTrackingInfo(cargoId: string) {
        const tracking = await prisma.cargoTracking.findUnique({
            where: { cargoId },
            include: { history: { orderBy: { timestamp: "desc" } } },
        });
        if (!tracking) {
            throw new Error(`Cargo tracking record not found for cargoId: ${cargoId}`);
        }
        return tracking;
    }

    // ─── 5. Get Tracking by Tracking Number ─────────────────────────────────────

    async getByTrackingNumber(trackingNumber: string) {
        const tracking = await prisma.cargoTracking.findUnique({
            where: { trackingNumber },
            include: { history: { orderBy: { timestamp: "desc" } } },
        });
        if (!tracking) {
            throw new Error(`Tracking number not found: ${trackingNumber}`);
        }
        return tracking;
    }

    // ─── 6. Get Cargos by Location ──────────────────────────────────────────────

    async getByLocation(location: string) {
        return await prisma.cargoTracking.findMany({
            where: { currentLocation: { contains: location } },
            orderBy: { lastUpdated: "desc" },
        });
    }

    // ─── 7. Get Movement History ─────────────────────────────────────────────────

    async getMovementHistory(cargoId: string) {
        return await prisma.trackingHistory.findMany({
            where: { cargoId },
            orderBy: { timestamp: "desc" },
        });
    }

    // ─── 8. Mark as Delivered ───────────────────────────────────────────────────

    async markAsDelivered(cargoId: string) {
        return await prisma.$transaction(async (tx) => {
            const updated = await tx.cargoTracking.update({
                where: { cargoId },
                data: {
                    currentLocation: "Delivered",
                    status: CargoStatus.DELIVERED,
                },
            });

            await tx.trackingHistory.create({
                data: {
                    cargoId,
                    location: "Delivered",
                    status: CargoStatus.DELIVERED,
                },
            });

            return updated;
        });
    }

    // ─── 9. Update Status Manually ──────────────────────────────────────────────

    async updateStatusManually(cargoId: string, status: CargoStatus) {
        return await prisma.$transaction(async (tx) => {
            const tracking = await tx.cargoTracking.update({
                where: { cargoId },
                data: { status },
            });

            await tx.trackingHistory.create({
                data: {
                    cargoId,
                    location: tracking.currentLocation,
                    status,
                },
            });

            return tracking;
        });
    }

    // ─── 10. Delete Tracking Record ──────────────────────────────────────────────

    async deleteTracking(cargoId: string) {
        await prisma.cargoTracking.delete({ where: { cargoId } });
        return true;
    }

    // ─── 11. Detect & Mark Delayed Cargo ────────────────────────────────────────

    async detectDelays() {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

        const stuckCargos = await prisma.cargoTracking.findMany({
            where: {
                lastUpdated: { lt: twoHoursAgo },
                status: {
                    notIn: [
                        CargoStatus.DELAYED,
                        CargoStatus.DELIVERED,
                        CargoStatus.ARRIVED,
                    ],
                },
            },
        });

        if (stuckCargos.length === 0) return [];

        const cargoIds = stuckCargos.map((c) => c.cargoId);

        await prisma.cargoTracking.updateMany({
            where: { cargoId: { in: cargoIds } },
            data: { status: CargoStatus.DELAYED },
        });

        await prisma.trackingHistory.createMany({
            data: stuckCargos.map((c) => ({
                cargoId: c.cargoId,
                location: c.currentLocation,
                status: CargoStatus.DELAYED,
            })),
        });

        return await prisma.cargoTracking.findMany({
            where: { cargoId: { in: cargoIds } },
        });
    }
}

export const trackingService = new TrackingService();
