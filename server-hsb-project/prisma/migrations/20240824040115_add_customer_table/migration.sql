-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_houseDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `housedetail` DROP FOREIGN KEY `Housedetail_houseDetailNameId_fkey`;

-- DropForeignKey
ALTER TABLE `period` DROP FOREIGN KEY `Period_periodnameid_fkey`;

-- DropForeignKey
ALTER TABLE `period` DROP FOREIGN KEY `Period_projectid_fkey`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `sponseid` INTEGER NULL;

-- CreateTable
CREATE TABLE `customer` (
    `customerid` INTEGER NOT NULL AUTO_INCREMENT,
    `customerFirstname` VARCHAR(255) NULL,
    `customerLasttname` VARCHAR(255) NULL,
    `customerLine` VARCHAR(255) NULL,
    `customerPhone` INTEGER NULL,
    `customerAddress` VARCHAR(500) NULL,

    PRIMARY KEY (`customerid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_houseDetailId_fkey` FOREIGN KEY (`houseDetailId`) REFERENCES `housedetail`(`houseDetailid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `housedetail` ADD CONSTRAINT `housedetail_houseDetailNameId_fkey` FOREIGN KEY (`houseDetailNameId`) REFERENCES `housedetailname`(`houseDetailNameid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `period` ADD CONSTRAINT `period_periodnameid_fkey` FOREIGN KEY (`periodnameid`) REFERENCES `periodname`(`periodNameid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `period` ADD CONSTRAINT `period_projectid_fkey` FOREIGN KEY (`projectid`) REFERENCES `project`(`projectid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
DROP INDEX `User_email_key` ON `user`;
