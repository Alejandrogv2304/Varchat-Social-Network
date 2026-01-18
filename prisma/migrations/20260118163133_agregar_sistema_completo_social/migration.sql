-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('pendiente', 'aceptado', 'rechazado');

-- CreateTable
CREATE TABLE "likes_comentario" (
    "id_usuario" TEXT NOT NULL,
    "id_comentario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_comentario_pkey" PRIMARY KEY ("id_usuario","id_comentario")
);

-- CreateTable
CREATE TABLE "amigos" (
    "id_usuario_1" TEXT NOT NULL,
    "id_usuario_2" TEXT NOT NULL,
    "solicitado_por" TEXT NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'pendiente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondido_at" TIMESTAMP(3),

    CONSTRAINT "amigos_pkey" PRIMARY KEY ("id_usuario_1","id_usuario_2")
);

-- CreateTable
CREATE TABLE "chats" (
    "id_chat" TEXT NOT NULL,
    "id_usuario_1" TEXT NOT NULL,
    "id_usuario_2" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id_chat")
);

-- CreateTable
CREATE TABLE "mensajes" (
    "id_mensaje" TEXT NOT NULL,
    "id_chat" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensajes_pkey" PRIMARY KEY ("id_mensaje")
);

-- CreateIndex
CREATE INDEX "likes_comentario_id_comentario_idx" ON "likes_comentario"("id_comentario");

-- CreateIndex
CREATE INDEX "amigos_id_usuario_1_idx" ON "amigos"("id_usuario_1");

-- CreateIndex
CREATE INDEX "amigos_id_usuario_2_idx" ON "amigos"("id_usuario_2");

-- CreateIndex
CREATE INDEX "amigos_estado_idx" ON "amigos"("estado");

-- CreateIndex
CREATE INDEX "chats_id_usuario_1_idx" ON "chats"("id_usuario_1");

-- CreateIndex
CREATE INDEX "chats_id_usuario_2_idx" ON "chats"("id_usuario_2");

-- CreateIndex
CREATE UNIQUE INDEX "chats_id_usuario_1_id_usuario_2_key" ON "chats"("id_usuario_1", "id_usuario_2");

-- CreateIndex
CREATE INDEX "mensajes_id_chat_idx" ON "mensajes"("id_chat");

-- CreateIndex
CREATE INDEX "mensajes_id_usuario_idx" ON "mensajes"("id_usuario");

-- CreateIndex
CREATE INDEX "mensajes_created_at_idx" ON "mensajes"("created_at");

-- AddForeignKey
ALTER TABLE "likes_comentario" ADD CONSTRAINT "likes_comentario_id_comentario_fkey" FOREIGN KEY ("id_comentario") REFERENCES "comentarios"("id_comentario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_comentario" ADD CONSTRAINT "likes_comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amigos" ADD CONSTRAINT "amigos_id_usuario_1_fkey" FOREIGN KEY ("id_usuario_1") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amigos" ADD CONSTRAINT "amigos_id_usuario_2_fkey" FOREIGN KEY ("id_usuario_2") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amigos" ADD CONSTRAINT "amigos_solicitado_por_fkey" FOREIGN KEY ("solicitado_por") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_id_usuario_1_fkey" FOREIGN KEY ("id_usuario_1") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_id_usuario_2_fkey" FOREIGN KEY ("id_usuario_2") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_id_chat_fkey" FOREIGN KEY ("id_chat") REFERENCES "chats"("id_chat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
