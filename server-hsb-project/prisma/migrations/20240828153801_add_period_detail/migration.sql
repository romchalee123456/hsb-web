/*
  Warnings:

  - You are about to drop the column `periodnameid` on the `period` table. All the data in the column will be lost.
  - Added the required column `periodDetailid` to the `housedetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `period` DROP FOREIGN KEY `period_periodnameid_fkey`;

-- AlterTable
ALTER TABLE `housedetail` ADD COLUMN `periodDetailid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `period` DROP COLUMN `periodnameid`;

-- CreateTable
CREATE TABLE `periodDetail` (
    `periodDetailid` INTEGER NOT NULL AUTO_INCREMENT,
    `periodid` INTEGER NOT NULL,
    `projectid` INTEGER NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `createOn` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `periodDetailStatusId` INTEGER NOT NULL,
    `periodnameid` INTEGER NOT NULL,

    PRIMARY KEY (`periodDetailid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodDetailStatus` (
    `periodDetailStatusId` INTEGER NOT NULL AUTO_INCREMENT,
    `periodDetailStatusName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`periodDetailStatusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `housedetail` ADD CONSTRAINT `housedetail_periodDetailid_fkey` FOREIGN KEY (`periodDetailid`) REFERENCES `periodDetail`(`periodDetailid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodDetail` ADD CONSTRAINT `periodDetail_periodnameid_fkey` FOREIGN KEY (`periodnameid`) REFERENCES `periodname`(`periodNameid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodDetail` ADD CONSTRAINT `periodDetail_periodid_fkey` FOREIGN KEY (`periodid`) REFERENCES `period`(`periodid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodDetail` ADD CONSTRAINT `periodDetail_periodDetailStatusId_fkey` FOREIGN KEY (`periodDetailStatusId`) REFERENCES `periodDetailStatus`(`periodDetailStatusId`) ON DELETE RESTRICT ON UPDATE CASCADE;
