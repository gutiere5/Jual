-- CreateEnum
CREATE TYPE "MeatChoice" AS ENUM ('CARNE_ASADA', 'CHORIZO', 'TRIPA', 'LENGUA', 'PASTOR', 'CHICHARRONES', 'ASADA_DE_POLLO');

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "meat_choices" "MeatChoice"[];
