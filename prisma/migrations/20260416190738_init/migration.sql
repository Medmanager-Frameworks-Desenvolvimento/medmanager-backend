-- CreateTable
CREATE TABLE "administrador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "doenca_cronica" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enfermeiros" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "enfermeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicamentos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "validade" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescricoes" (
    "id" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_enfermeiro" INTEGER NOT NULL,
    "id_medicamento" INTEGER NOT NULL,
    "dosagem" DOUBLE PRECISION NOT NULL,
    "turno" TEXT NOT NULL,
    "data_hora" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "prescricoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- AddForeignKey
ALTER TABLE "prescricoes" ADD CONSTRAINT "prescricoes_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescricoes" ADD CONSTRAINT "prescricoes_id_enfermeiro_fkey" FOREIGN KEY ("id_enfermeiro") REFERENCES "enfermeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescricoes" ADD CONSTRAINT "prescricoes_id_medicamento_fkey" FOREIGN KEY ("id_medicamento") REFERENCES "medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
