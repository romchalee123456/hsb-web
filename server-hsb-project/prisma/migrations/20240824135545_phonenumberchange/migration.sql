/*
  Warnings:

  - You are about to drop the column `PhoneNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `teamname` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `PhoneNumber`,
    DROP COLUMN `teamname`,
    ADD COLUMN `phoneNumber` INTEGER NULL,
    ADD COLUMN `teamName` VARCHAR(100) NULL;
