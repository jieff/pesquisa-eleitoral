import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SincronizacaoService } from './sincronizacao.service';
import { PrismaService } from 'src/database/prisma.service';
import { SincronizacaoController } from './sincronizacao.controller';

@Module({
  imports: [HttpModule],
  providers: [SincronizacaoService, PrismaService],
  controllers: [SincronizacaoController]
})
export class SincronizacaoModule {}
