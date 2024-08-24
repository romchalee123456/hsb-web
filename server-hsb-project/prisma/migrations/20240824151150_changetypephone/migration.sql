/*
  Warnings:

  - You are about to drop the column `customerLasttname` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customerLasttname`,
    ADD COLUMN `customerLastname` VARCHAR(255) NULL,
    MODIFY `customerPhone` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `phoneNumber` VARCHAR(50) NULL;
