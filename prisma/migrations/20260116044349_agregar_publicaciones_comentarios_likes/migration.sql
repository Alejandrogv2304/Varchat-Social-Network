/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('publico', 'privado');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" TEXT NOT NULL,
    "correo" VARCHAR(254) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(80) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" VARCHAR(280),
    "deleted_at" TIMESTAMP(3),
    "tipo" "TipoUsuario" NOT NULL DEFAULT 'publico',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "publicaciones" (
    "id_publicacion" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publicaciones_pkey" PRIMARY KEY ("id_publicacion")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id_comentario" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_publicacion" TEXT NOT NULL,
    "id_comentario_padre" TEXT,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id_comentario")
);

-- CreateTable
CREATE TABLE "likes_publicacion" (
    "id_usuario" TEXT NOT NULL,
    "id_publicacion" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_publicacion_pkey" PRIMARY KEY ("id_usuario","id_publicacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE INDEX "publicaciones_id_usuario_idx" ON "publicaciones"("id_usuario");

-- CreateIndex
CREATE INDEX "comentarios_id_publicacion_idx" ON "comentarios"("id_publicacion");

-- CreateIndex
CREATE INDEX "comentarios_id_usuario_idx" ON "comentarios"("id_usuario");

-- CreateIndex
CREATE INDEX "comentarios_id_comentario_padre_idx" ON "comentarios"("id_comentario_padre");

-- CreateIndex
CREATE INDEX "likes_publicacion_id_publicacion_idx" ON "likes_publicacion"("id_publicacion");

-- AddForeignKey
ALTER TABLE "publicaciones" ADD CONSTRAINT "publicaciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_publicacion_fkey" FOREIGN KEY ("id_publicacion") REFERENCES "publicaciones"("id_publicacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_comentario_padre_fkey" FOREIGN KEY ("id_comentario_padre") REFERENCES "comentarios"("id_comentario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_publicacion" ADD CONSTRAINT "likes_publicacion_id_publicacion_fkey" FOREIGN KEY ("id_publicacion") REFERENCES "publicaciones"("id_publicacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_publicacion" ADD CONSTRAINT "likes_publicacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
