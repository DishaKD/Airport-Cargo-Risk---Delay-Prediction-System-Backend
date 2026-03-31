import { prisma } from "../config/db";

/**
 * Generates a unique tracking number in the format TRK-YYYYMMDD-XXXX
 * Example: TRK-20260330-0001
 */
export async function generateTrackingNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    // Find the highest sequence number for today
    const existingToday = await prisma.cargoTracking.findMany({
        where: {
            trackingNumber: {
                startsWith: `TRK-${dateStr}-`,
            },
        },
        orderBy: {
            trackingNumber: "desc",
        },
        take: 1,
    });

    let sequence = 1;

    if (existingToday.length > 0) {
        const lastNumberInfo = existingToday[0].trackingNumber.split("-");
        const lastSequenceStr = lastNumberInfo[lastNumberInfo.length - 1];
        sequence = parseInt(lastSequenceStr, 10) + 1;
    }

    const sequenceStr = String(sequence).padStart(4, "0");
    return `TRK-${dateStr}-${sequenceStr}`;
}
