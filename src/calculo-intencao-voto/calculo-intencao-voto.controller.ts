import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CalculoIntencaoVotoService } from './calculo-intencao-voto.service';
import { PesquisaService } from '../pesquisa/pesquisa.service';

@Controller('intencao-voto')
export class IntencaoVotoController {
  constructor(
    private readonly pesquisaService: PesquisaService,
    private readonly calculoIntencaoVotoService: CalculoIntencaoVotoService,
  ) { }

  @Get('evolucao')
  async obterDadosEvolucao(@Query() query: any) {
    return await this.pesquisaService.findMany(query);
  }


  @Post('processar')
  async processarPesquisa(@Body() results: any[]) {
    console.log('Recebendo dados de pesquisa no controlador:', results);


    const votosPonderados = [];

    for (const result of results) {
      const votoPonderado = await this.calculoIntencaoVotoService.calcularIntencaoVoto(result);
      votosPonderados.push(votoPonderado);
    }

    console.log('Resultado do cálculo de intenção de voto:', votosPonderados);

    return votosPonderados;
  }
}
