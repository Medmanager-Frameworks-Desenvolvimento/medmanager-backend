-- CreateTable
CREATE TABLE "notificacoes" (
    "id" SERIAL NOT NULL,
    "id_admin" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
