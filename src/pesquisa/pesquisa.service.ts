import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as iconv from 'iconv-lite';
import { File } from 'multer';

// Definindo a interface fora do método
interface FiltroPesquisa {
  estado: string;    // Sigla do estado
  municipio: string; // Nome do município
}

@Injectable()
export class PesquisaService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para processar o arquivo CSV e salvar pesquisas
  async processarArquivo(file: File) {
    const results = [];

    if (!file.path) {
      throw new Error('Caminho do arquivo não definido');
    }

    // Cria um stream de leitura para o arquivo CSV
    fs.createReadStream(file.path)
      .pipe(iconv.decodeStream('latin1')) // Decodifica o arquivo com encoding ISO-8859-1
      .pipe(csvParser({ separator: ';' })) // Define o delimitador
      .on('data', (row) => {
        console.log('Linha CSV:', row); // Exibe os dados processados
        results.push(row);
      })
      .on('end', async () => {
        await this.salvarPesquisas(results);
      });

    return { message: 'Arquivo processado com sucesso' };
  }

  // Método para salvar as pesquisas no banco de dados
  async salvarPesquisas(results: any[]) {
    for (const linha of results) {
      try {
        // Validação básica dos campos
        if (!linha.ID_PESQUISA || !linha.DATA_PESQUISA || !linha.ESTADO || !linha['INTENÇÃO DE VOTO']) {
          console.error('Dados incompletos na linha:', linha);
          continue; // Ignora a linha com dados incompletos
        }

        // Busca o estado pelo código (sigla)
        const estado = await this.prisma.estado.findUnique({
          where: { sigla: linha.ESTADO },
        });

        if (!estado) {
          console.error(`Estado não encontrado: ${linha.ESTADO}`);
          continue;
        }

        // Busca o município pelo nome e estado
        const municipio = await this.prisma.municipio.findFirst({
          where: { nome: linha.MUNICÍPIO, estadoId: estado.id },
        });

        if (!municipio) {
          console.error(`Município não encontrado: ${linha.MUNICÍPIO} (${linha.ESTADO})`);
          continue;
        }

        // Salva a pesquisa no banco de dados
        await this.prisma.pesquisa.create({
          data: {
            idPesquisa: linha.ID_PESQUISA,
            dataPesquisa: new Date(linha.DATA_PESQUISA),
            municipioId: municipio.id,
            intencaoVoto: linha['INTENÇÃO DE VOTO'],
          },
        });

        console.log(`Pesquisa salva para ${linha.MUNICÍPIO} (${linha.ESTADO})`);
      } catch (error) {
        console.error(
          `Erro ao salvar pesquisa para ${linha.MUNICÍPIO} (${linha.ESTADO}):`,
          error,
        );
      }
    }
  }

  // Método findMany para encontrar múltiplas pesquisas com filtros
  async findMany(query: FiltroPesquisa) {
    const { estado, municipio } = query;

    return await this.prisma.pesquisa.findMany({
      where: {
        municipio: {
          nome: municipio,  // Filtro por município
          estado: {
            sigla: estado,  // Filtro por estado
          },
        },
      },
      orderBy: {
        dataPesquisa: 'asc', // Ordenação por data de pesquisa
      },
    });
  }
}
