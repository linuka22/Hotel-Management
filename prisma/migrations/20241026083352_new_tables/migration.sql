/*
  Warnings:

  - Added the required column `checkOutDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "checkOutDate" TIMESTAMP(3) NOT NULL;
