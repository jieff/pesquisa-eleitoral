import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { EstadoModule } from './estado/estado.module';
import { SincronizacaoModule } from './sincronizacao/sincronizacao.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PesquisaController } from './pesquisa/pesquisa.controller';
import { PesquisaService } from './pesquisa/pesquisa.service';
import { CalculoIntencaoVotoService } from './calculo-intencao-voto/calculo-intencao-voto.service';
import { PesquisaModule } from './pesquisa/pesquisa.module'; 
import { CalculoIntencaoVotoModule } from './calculo-intencao-voto/calculo-intencao-voto.module';

@Module({
  providers: [
    PrismaService, 
    PesquisaService, 
    CalculoIntencaoVotoService
  ],
  exports: [PrismaService],
  imports: [
    ScheduleModule.forRoot(),
    EstadoModule, 
    SincronizacaoModule, 
    PesquisaModule,
    CalculoIntencaoVotoModule
  ],
  controllers: [
    PesquisaController,
  ], 
})
export class AppModule {}
