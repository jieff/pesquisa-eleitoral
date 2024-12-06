import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SincronizacaoService {
  private estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private municipiosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';

  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  async sincronizarEstadosEMunicipios() {
    // Obter estados
    const estadosResponse = await this.httpService.get(this.estadosUrl).toPromise();
    const estados = estadosResponse.data;

    // Atualizar estados no banco
    for (const estado of estados) {
      await this.prisma.estado.upsert({
        where: { sigla: estado.sigla },
        update: { nome: estado.nome },
        create: { sigla: estado.sigla, nome: estado.nome },
      });
    }

    // Obter municípios
    const municipiosResponse = await this.httpService.get(this.municipiosUrl).toPromise();
    const municipios = municipiosResponse.data;

    // Atualizar municípios no banco
    for (const municipio of municipios) {
      const estadoSigla = municipio.microrregiao.mesorregiao.UF.sigla;
      const estado = await this.prisma.estado.findUnique({ where: { sigla: estadoSigla } });

      if (estado) {
        await this.prisma.municipio.upsert({
            where: { nome_estadoId: { nome: municipio.nome, estadoId: estado.id } },
            update: {},
            create: {
              nome: municipio.nome,
              estadoId: estado.id,
            },
          });
      }
    }

    return { message: 'Sincronização concluída com sucesso!' };
  }
}
