-- CreateTable
CREATE TABLE "catalogo_medicamentos" (
    "id" SERIAL NOT NULL,
    "nome_comercial" TEXT NOT NULL,
    "principio_ativo" TEXT NOT NULL,
    "fabricante" TEXT,
    "registro_anvisa" TEXT,

    CONSTRAINT "catalogo_medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catalogo_medicamentos_registro_anvisa_key" ON "catalogo_medicamentos"("registro_anvisa");
