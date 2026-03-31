-- CreateTable
CREATE TABLE `CargoTracking` (
    `id` VARCHAR(191) NOT NULL,
    `cargoId` VARCHAR(191) NOT NULL,
    `trackingNumber` VARCHAR(191) NOT NULL,
    `currentLocation` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'IN_TRANSIT', 'ARRIVED', 'DELAYED', 'DELIVERED') NOT NULL DEFAULT 'PENDING',
    `lastUpdated` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CargoTracking_cargoId_key`(`cargoId`),
    UNIQUE INDEX `CargoTracking_trackingNumber_key`(`trackingNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrackingHistory` (
    `id` VARCHAR(191) NOT NULL,
    `cargoId` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'IN_TRANSIT', 'ARRIVED', 'DELAYED', 'DELIVERED') NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TrackingHistory` ADD CONSTRAINT `TrackingHistory_cargoId_fkey` FOREIGN KEY (`cargoId`) REFERENCES `CargoTracking`(`cargoId`) ON DELETE CASCADE ON UPDATE CASCADE;
