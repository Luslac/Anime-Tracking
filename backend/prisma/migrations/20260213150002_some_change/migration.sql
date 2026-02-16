/*
  Warnings:

  - Added the required column `image_url` to the `anime_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `anime_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `anime_list` ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `score` DOUBLE NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
