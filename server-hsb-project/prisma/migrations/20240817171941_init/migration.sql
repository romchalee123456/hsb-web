-- CreateTable
CREATE TABLE `File` (
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
CREATE TABLE `Housedetail` (
    `houseDetailid` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `houseDetailNameId` INTEGER NOT NULL,

    PRIMARY KEY (`houseDetailid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Housedetailname` (
    `houseDetailNameid` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `houseDetailName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`houseDetailNameid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Period` (
    `periodid` INTEGER NOT NULL AUTO_INCREMENT,
    `projectid` INTEGER NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `createOn` DATETIME(3) NOT NULL,
    `periodStatusId` INTEGER NOT NULL,
    `periodnameid` INTEGER NOT NULL,

    PRIMARY KEY (`periodid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodname` (
    `periodNameid` INTEGER NOT NULL AUTO_INCREMENT,
    `createOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `periodName` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`periodNameid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `projectid` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(500) NULL,
    `projectCode` VARCHAR(500) NULL,
    `description` VARCHAR(500) NULL,
    `createOn` DATETIME(3) NULL,
    `amount` DECIMAL(10, 0) NULL,
    `userid` INTEGER NULL,
    `projectStatusid` INTEGER NULL,

    PRIMARY KEY (`projectid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NULL,
    `lastname` VARCHAR(50) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_on` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `role` INTEGER NULL,
    `TameName` VARCHAR(100) NULL,
    `PhoneNumber` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_houseDetailId_fkey` FOREIGN KEY (`houseDetailId`) REFERENCES `Housedetail`(`houseDetailid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Housedetail` ADD CONSTRAINT `Housedetail_houseDetailNameId_fkey` FOREIGN KEY (`houseDetailNameId`) REFERENCES `Housedetailname`(`houseDetailNameid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Period` ADD CONSTRAINT `Period_periodnameid_fkey` FOREIGN KEY (`periodnameid`) REFERENCES `Periodname`(`periodNameid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Period` ADD CONSTRAINT `Period_projectid_fkey` FOREIGN KEY (`projectid`) REFERENCES `Project`(`projectid`) ON DELETE RESTRICT ON UPDATE CASCADE;
