/*
  Warnings:

  - Added the required column `price` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "price" INTEGER NOT NULL;
