/*
  Warnings:

  - Added the required column `gender` to the `pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
