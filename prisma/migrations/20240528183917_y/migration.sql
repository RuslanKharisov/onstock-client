/*
  Warnings:

  - You are about to drop the column `userId` on the `Stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_userId_fkey";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "userId";
