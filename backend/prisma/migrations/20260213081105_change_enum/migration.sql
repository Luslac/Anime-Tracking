/*
  Warnings:

  - The values [WATHCING,COMLPETED] on the enum `anime_list_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `anime_list` ADD COLUMN `isFavorite` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `notes` TEXT NULL,
    MODIFY `status` ENUM('WATCHING', 'COMPLETED', 'PLAN_TO_WATCH') NOT NULL DEFAULT 'PLAN_TO_WATCH';
