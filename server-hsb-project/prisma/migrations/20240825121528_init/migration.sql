-- CreateTable
CREATE TABLE `file` (
    `fileid` INTEGER NOT NULL AUTO_INCREMENT,
    `fileName` VARCHAR(500) NOT NULL,
    `filePath` VARCHAR(500) NOT NULL,
    `statusId` INTEGER NOT NULL,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `houseDetailId` INTEGER NOT NULL,
    `backUpStatus` INTEGER NOT NULL,
    `fileBackupPath` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`fileid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `housedetail` (
    `houseDetailid` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `houseDetailNameId` INTEGER NOT NULL,

    PRIMARY KEY (`houseDetailid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `housedetailname` (
    `houseDetailNameid` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `houseDetailName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`houseDetailNameid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `period` (
    `periodid` INTEGER NOT NULL AUTO_INCREMENT,
    `projectid` INTEGER NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `createOn` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `periodStatusId` INTEGER NOT NULL,
    `periodnameid` INTEGER NOT NULL,

    PRIMARY KEY (`periodid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodStatus` (
    `periodStatusId` INTEGER NOT NULL AUTO_INCREMENT,
    `periodStatusName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`periodStatusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodname` (
    `periodNameid` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `periodName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`periodNameid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `projectid` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(500) NULL,
    `projectCode` VARCHAR(500) NULL,
    `description` VARCHAR(500) NULL,
    `createOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `amount` DECIMAL(10, 0) NULL,
    `userid` INTEGER NULL,
    `projectStatusid` INTEGER NULL,
    `responseid` INTEGER NULL,

    PRIMARY KEY (`projectid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NULL,
    `lastname` VARCHAR(50) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_on` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `role` INTEGER NULL,
    `teamName` VARCHAR(100) NULL,
    `phoneNumber` VARCHAR(50) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customerid` INTEGER NOT NULL AUTO_INCREMENT,
    `customerFirstname` VARCHAR(255) NULL,
    `customerLastname` VARCHAR(255) NULL,
    `customerLine` VARCHAR(255) NULL,
    `customerPhone` VARCHAR(50) NULL,
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

-- AddForeignKey
ALTER TABLE `period` ADD CONSTRAINT `period_periodStatusId_fkey` FOREIGN KEY (`periodStatusId`) REFERENCES `periodStatus`(`periodStatusId`) ON DELETE RESTRICT ON UPDATE CASCADE;
