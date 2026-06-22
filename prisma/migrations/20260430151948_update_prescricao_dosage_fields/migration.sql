/*
  Warnings:

  - Added the required column `quantidade` to the `prescricoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade_medida` to the `prescricoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prescricoes" ADD COLUMN     "quantidade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unidade_medida" TEXT NOT NULL,
ALTER COLUMN "dosagem" SET DATA TYPE TEXT;
