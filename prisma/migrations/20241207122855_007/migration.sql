/*
  Warnings:

  - You are about to alter the column `duration` on the `item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `duration` DOUBLE NULL;
