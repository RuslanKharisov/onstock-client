/*
  Warnings:

  - You are about to drop the column `maxProducts` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `maxProducts` to the `Tariff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "maxProducts";

-- AlterTable
ALTER TABLE "Tariff" ADD COLUMN     "maxProducts" INTEGER NOT NULL;
