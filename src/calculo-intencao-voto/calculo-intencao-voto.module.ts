// src/pesquisa/pesquisa.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PesquisaService } from '../pesquisa/pesquisa.service';
import { CalculoIntencaoVotoService } from './calculo-intencao-voto.service';
import { PesquisaController } from '../pesquisa/pesquisa.controller';
import { IntencaoVotoController } from './calculo-intencao-voto.controller';
import { EstadoModule } from 'src/estado/estado.module';

@Module({
  imports: [EstadoModule],
  controllers: [PesquisaController, IntencaoVotoController],
  providers: [PesquisaService, CalculoIntencaoVotoService, PrismaService],
})
export class CalculoIntencaoVotoModule {}
