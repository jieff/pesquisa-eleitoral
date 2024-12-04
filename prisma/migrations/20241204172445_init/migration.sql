-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "sigla" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pesquisa" (
    "id" SERIAL NOT NULL,
    "idPesquisa" TEXT NOT NULL,
    "dataPesquisa" TIMESTAMP(3) NOT NULL,
    "municipioId" INTEGER NOT NULL,
    "intencaoVoto" TEXT NOT NULL,

    CONSTRAINT "Pesquisa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estado_sigla_key" ON "Estado"("sigla");

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesquisa" ADD CONSTRAINT "Pesquisa_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
