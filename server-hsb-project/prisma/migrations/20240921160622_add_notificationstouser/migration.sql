/*
  Warnings:

  - You are about to drop the column `UserLineNotificationsid` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `UserLineNotificationsid`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userLineNotificationsid` VARCHAR(500) NULL;
