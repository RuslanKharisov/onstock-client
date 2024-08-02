-- CreateEnum
CREATE TYPE "TariffType" AS ENUM ('TARIFF_1', 'TARIFF_2', 'TARIFF_3');

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "tariff" "TariffType";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "tariffType" "TariffType" NOT NULL,
    "maxProducts" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
