/*
  Warnings:

  - The values [TARIFF_1,TARIFF_2,TARIFF_3] on the enum `TariffType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `pricePerProduct` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TariffType_new" AS ENUM ('TARIFF_10', 'TARIFF_100', 'TARIFF_500', 'TARIFF_1000', 'TARIFF_2500', 'TARIFF_5000', 'TARIFF_10000');
ALTER TABLE "Supplier" ALTER COLUMN "tariff" TYPE "TariffType_new" USING ("tariff"::text::"TariffType_new");
ALTER TABLE "Subscription" ALTER COLUMN "tariffType" TYPE "TariffType_new" USING ("tariffType"::text::"TariffType_new");
ALTER TYPE "TariffType" RENAME TO "TariffType_old";
ALTER TYPE "TariffType_new" RENAME TO "TariffType";
DROP TYPE "TariffType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "pricePerProduct" DOUBLE PRECISION NOT NULL;
