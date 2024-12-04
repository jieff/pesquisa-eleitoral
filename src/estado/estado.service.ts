import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EstadoService {
    constructor (private prisma: PrismaService){}

    async findAll(){
        return this.prisma.estado.findMany();
    }
}
