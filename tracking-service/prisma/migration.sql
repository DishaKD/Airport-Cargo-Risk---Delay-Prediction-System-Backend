-- Run this in the Supabase SQL Editor to create the tracking tables.
-- Go to: https://supabase.com/dashboard/project/luvahlhdpdoztwbrlkah/sql

-- CreateEnum
CREATE TYPE "CargoStatus" AS ENUM ('PENDING', 'PROCESSING', 'IN_TRANSIT', 'ARRIVED', 'DELAYED', 'DELIVERED');

-- CreateTable: CargoTracking
CREATE TABLE "CargoTracking" (
    "id"              TEXT NOT NULL,
    "cargoId"         TEXT NOT NULL,
    "trackingNumber"  TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "status"          "CargoStatus" NOT NULL DEFAULT 'PENDING',
    "lastUpdated"     TIMESTAMP(3) NOT NULL,
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"       TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CargoTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TrackingHistory
CREATE TABLE "TrackingHistory" (
    "id"       TEXT NOT NULL,
    "cargoId"  TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status"   "CargoStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Unique constraints
CREATE UNIQUE INDEX "CargoTracking_cargoId_key" ON "CargoTracking"("cargoId");
CREATE UNIQUE INDEX "CargoTracking_trackingNumber_key" ON "CargoTracking"("trackingNumber");

-- AddForeignKey: TrackingHistory -> CargoTracking
ALTER TABLE "TrackingHistory" ADD CONSTRAINT "TrackingHistory_cargoId_fkey"
    FOREIGN KEY ("cargoId") REFERENCES "CargoTracking"("cargoId") ON DELETE CASCADE ON UPDATE CASCADE;
