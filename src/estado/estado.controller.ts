import { Controller, Get } from '@nestjs/common';
import { EstadoService } from './estado.service';

@Controller('estados')
export class EstadoController {
    constructor (private readonly estadoService: EstadoService) {}

    @Get()
    async getEstados(){
        return this.estadoService.findAll();
    }
}
