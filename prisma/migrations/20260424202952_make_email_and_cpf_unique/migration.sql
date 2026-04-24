/*
  Warnings:

  - A unique constraint covering the columns `[cpf,id_admin]` on the table `enfermeiros` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,id_admin]` on the table `enfermeiros` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf,id_admin]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "enfermeiros_cpf_id_admin_key" ON "enfermeiros"("cpf", "id_admin");

-- CreateIndex
CREATE UNIQUE INDEX "enfermeiros_email_id_admin_key" ON "enfermeiros"("email", "id_admin");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_id_admin_key" ON "pacientes"("cpf", "id_admin");
