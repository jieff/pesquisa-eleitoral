import { Controller, Post } from '@nestjs/common';
import { SincronizacaoService } from './sincronizacao.service';

@Controller('sincronizacao')
export class SincronizacaoController {
  constructor(private readonly sincronizacaoService: SincronizacaoService) {}

  @Post('atualizar')
  async atualizarDados() {
    return this.sincronizacaoService.sincronizarEstadosEMunicipios();
  }
}
