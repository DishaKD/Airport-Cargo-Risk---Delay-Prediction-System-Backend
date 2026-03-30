-- CreateEnum
CREATE TYPE "CargoStatus" AS ENUM ('PENDING', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CargoType" AS ENUM ('FRAGILE', 'HAZARDOUS', 'PERISHABLE', 'GENERAL', 'OVERSIZED');

-- CreateTable
CREATE TABLE "Cargo" (
    "id" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "dimensions" TEXT NOT NULL,
    "cargoType" "CargoType" NOT NULL,
    "status" "CargoStatus" NOT NULL DEFAULT 'PENDING',
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "flightId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "cargoId" TEXT NOT NULL,
    "status" "CargoStatus" NOT NULL DEFAULT 'PENDING',
    "loadedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightAssignment" (
    "id" TEXT NOT NULL,
    "cargoId" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unloadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoLocation" (
    "id" TEXT NOT NULL,
    "cargoId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CargoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_trackingNumber_key" ON "Cargo"("trackingNumber");

-- CreateIndex
CREATE INDEX "Shipment_cargoId_idx" ON "Shipment"("cargoId");

-- CreateIndex
CREATE UNIQUE INDEX "FlightAssignment_cargoId_key" ON "FlightAssignment"("cargoId");

-- CreateIndex
CREATE INDEX "CargoLocation_cargoId_idx" ON "CargoLocation"("cargoId");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
