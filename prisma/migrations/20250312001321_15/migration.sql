-- CreateTable
CREATE TABLE `foodItemsInventoryNeed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foodItemId` INTEGER NOT NULL,
    `inventoryItemId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `foodItemsInventoryNeed` ADD CONSTRAINT `foodItemsInventoryNeed_foodItemId_fkey` FOREIGN KEY (`foodItemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `foodItemsInventoryNeed` ADD CONSTRAINT `foodItemsInventoryNeed_inventoryItemId_fkey` FOREIGN KEY (`inventoryItemId`) REFERENCES `InventoryItems`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
