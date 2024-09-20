-- AlterTable
ALTER TABLE `customer` ADD COLUMN `house_Detail_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `notifications` (
    `notificationsId` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NULL,
    `notificationsTypeId` INTEGER NOT NULL,
    `createBy` INTEGER NULL,
    `actionNotificationsId` INTEGER NOT NULL,
    `houseDetailId` INTEGER NULL,

    PRIMARY KEY (`notificationsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificationsHistory` (
    `notificationsHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NULL,
    `notificationsTypeId` INTEGER NOT NULL,
    `createBy` INTEGER NULL,
    `actionNotificationsId` INTEGER NOT NULL,
    `houseDetailId` INTEGER NULL,

    PRIMARY KEY (`notificationsHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actionNotifications` (
    `actionNotificationsId` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actionNotificationsName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`actionNotificationsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificationsType` (
    `notificationsTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notificationsTypeName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`notificationsTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_actionNotificationsId_fkey` FOREIGN KEY (`actionNotificationsId`) REFERENCES `actionNotifications`(`actionNotificationsId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_notificationsTypeId_fkey` FOREIGN KEY (`notificationsTypeId`) REFERENCES `notificationsType`(`notificationsTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificationsHistory` ADD CONSTRAINT `notificationsHistory_actionNotificationsId_fkey` FOREIGN KEY (`actionNotificationsId`) REFERENCES `actionNotifications`(`actionNotificationsId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificationsHistory` ADD CONSTRAINT `notificationsHistory_notificationsTypeId_fkey` FOREIGN KEY (`notificationsTypeId`) REFERENCES `notificationsType`(`notificationsTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
