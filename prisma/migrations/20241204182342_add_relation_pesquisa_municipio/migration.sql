/*
  Warnings:

  - You are about to drop the column `populacao` on the `Municipio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome,estadoId]` on the table `Municipio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Municipio" DROP COLUMN "populacao";

-- CreateIndex
CREATE UNIQUE INDEX "Municipio_nome_estadoId_key" ON "Municipio"("nome", "estadoId");
