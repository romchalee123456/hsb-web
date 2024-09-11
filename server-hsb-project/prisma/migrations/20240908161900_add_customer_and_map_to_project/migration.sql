-- AlterTable
ALTER TABLE `project` ADD COLUMN `customerid` INTEGER NULL,
    ADD COLUMN `lat` DECIMAL(9, 6) NULL,
    ADD COLUMN `locationCode` VARCHAR(255) NULL,
    ADD COLUMN `locationName` VARCHAR(255) NULL,
    ADD COLUMN `lon` DECIMAL(9, 6) NULL;
