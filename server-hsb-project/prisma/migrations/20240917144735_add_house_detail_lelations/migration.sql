/*
  Warnings:

  - Made the column `houseDetailId` on table `notifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `houseDetailId` on table `notificationshistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `notifications` MODIFY `houseDetailId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `notificationshistory` MODIFY `houseDetailId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_houseDetailId_fkey` FOREIGN KEY (`houseDetailId`) REFERENCES `housedetail`(`houseDetailid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificationsHistory` ADD CONSTRAINT `notificationsHistory_houseDetailId_fkey` FOREIGN KEY (`houseDetailId`) REFERENCES `housedetail`(`houseDetailid`) ON DELETE RESTRICT ON UPDATE CASCADE;
