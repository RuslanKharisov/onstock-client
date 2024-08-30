/*
  Warnings:

  - You are about to drop the column `pricePerProduct` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `tariffType` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `tariff` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `tariffId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "pricePerProduct",
DROP COLUMN "tariffType",
ADD COLUMN     "tariffId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "tariff",
ADD COLUMN     "tariffId" INTEGER;

-- DropEnum
DROP TYPE "TariffType";

-- CreateTable
CREATE TABLE "Tariff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tariff_name_key" ON "Tariff"("name");

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
