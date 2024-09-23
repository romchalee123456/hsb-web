-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `approver` INTEGER NULL;

-- AlterTable
ALTER TABLE `notificationshistory` ADD COLUMN `approver` INTEGER NULL;
