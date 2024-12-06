import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CalculoIntencaoVotoService } from 'src/calculo-intencao-voto/calculo-intencao-voto.service';

@Module({
  imports: [EstadoModule],
  providers: [
    EstadoService, 
    PrismaService,
    CalculoIntencaoVotoService
  ],
  controllers: [EstadoController],
  exports: [EstadoService]
})
export class EstadoModule {}
