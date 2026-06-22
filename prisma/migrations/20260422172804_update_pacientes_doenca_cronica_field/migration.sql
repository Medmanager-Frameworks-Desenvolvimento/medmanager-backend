/*
  Warnings:

  - The `doenca_cronica` column on the `pacientes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "doenca_cronica",
ADD COLUMN     "doenca_cronica" TEXT[];
