-- CreateTable
CREATE TABLE `periodStatus` (
    `periodStatusId` INTEGER NOT NULL AUTO_INCREMENT,
    `periodStatusName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`periodStatusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `period` ADD CONSTRAINT `period_periodStatusId_fkey` FOREIGN KEY (`periodStatusId`) REFERENCES `periodStatus`(`periodStatusId`) ON DELETE RESTRICT ON UPDATE CASCADE;
่