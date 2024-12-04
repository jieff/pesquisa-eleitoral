import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { EstadoModule } from './estado/estado.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [EstadoModule],
})
export class AppModule {}
