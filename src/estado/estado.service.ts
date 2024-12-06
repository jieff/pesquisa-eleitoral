import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Estado } from '@prisma/client';


@Injectable()
export class EstadoService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.estado.findMany();
    }

    async findBySigla(sigla: string): Promise<Estado | null> {
        return this.prisma.estado.findUnique({
            where: { sigla }, // O Prisma usa o campo 'sigla' para buscar pelo estado
        });
    }

}
