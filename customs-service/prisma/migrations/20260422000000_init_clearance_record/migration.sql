-- CreateEnum
CREATE TYPE "ClearanceStatus" AS ENUM ('PENDING', 'UNDER_INSPECTION', 'HOLD', 'CLEARED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "ClearanceRecord" (
    "id" TEXT NOT NULL,
    "cargoId" TEXT NOT NULL,
    "clearanceStatus" "ClearanceStatus" NOT NULL DEFAULT 'PENDING',
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW',
    "inspectionDate" TIMESTAMP(3),
    "notes" TEXT,
    "delayReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClearanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClearanceRecord_cargoId_idx" ON "ClearanceRecord"("cargoId");
