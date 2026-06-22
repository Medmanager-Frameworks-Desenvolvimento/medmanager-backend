/*
  Warnings:

  - You are about to drop the column `status` on the `admin` table. All the data in the column will be lost.
  - Added the required column `id_admin` to the `enfermeiros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_admin` to the `medicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_admin` to the `pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_admin` to the `prescricoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "enfermeiros" ADD COLUMN     "id_admin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "medicamentos" ADD COLUMN     "id_admin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "id_admin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "prescricoes" ADD COLUMN     "id_admin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enfermeiros" ADD CONSTRAINT "enfermeiros_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicamentos" ADD CONSTRAINT "medicamentos_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescricoes" ADD CONSTRAINT "prescricoes_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
