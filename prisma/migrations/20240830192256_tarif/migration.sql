/*
  Warnings:

  - Made the column `tariffId` on table `Supplier` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_tariffId_fkey";

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "tariffId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
