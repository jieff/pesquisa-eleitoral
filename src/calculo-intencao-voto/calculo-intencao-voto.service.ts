import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EstadoService } from '../estado/estado.service';

@Injectable()
export class CalculoIntencaoVotoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly estadoService: EstadoService,
  ) { }

  // Função para calcular o grupo de municípios com base na população
  calcularGrupo(populacao: number): number {
    if (populacao <= 20000) {
      return 1; // Grupo 1
    } else if (populacao <= 100000) {
      return 2; // Grupo 2
    } else if (populacao <= 1000000) {
      return 3; // Grupo 3
    } else {
      return 4; // Grupo 4
    }
  }

  // Função para calcular a intenção de voto ponderada para um único registro
  async calcularIntencaoVoto(data: any) {
    console.log('Iniciando cálculo de intenção de voto.');
    console.log('Registro recebido:', data);

    const { MUNICÍPIO, ESTADO, 'INTENÇÃO DE VOTO': intencaoVoto } = data;

    if (!MUNICÍPIO || !ESTADO || !intencaoVoto) {
      throw new Error('Dados insuficientes. Certifique-se de que MUNICÍPIO, ESTADO e INTENÇÃO DE VOTO estão presentes.');
    }

    // Converte a intenção de voto de A, B, etc., para um valor numérico
    const intentaoVotoNumerico = this.converterIntencaoVotoParaNumero(intencaoVoto);

    if (intentaoVotoNumerico === null) {
      throw new Error(`Intenção de voto inválida: ${intencaoVoto}`);
    }

    // Busca o estado pelo nome ou sigla
    const estado = await this.estadoService.findBySigla(ESTADO);
    if (!estado) {
      console.error(`Estado não encontrado: ${ESTADO}`);
      throw new Error(`Estado com sigla ${ESTADO} não encontrado`);
    }

    console.log('Estado encontrado:', estado);

    // Busca o município dentro do estado
    const municipio = await this.prisma.municipio.findUnique({
      where: { nome_estadoId: { nome: MUNICÍPIO, estadoId: estado.id } },
    });

    if (!municipio) {
      console.error(`Município não encontrado: ${MUNICÍPIO} no estado ${ESTADO}`);
      throw new Error(`Município ${MUNICÍPIO} não encontrado no estado ${ESTADO}`);
    }

    console.log('Município encontrado:', municipio);

    // Verifica se a população é 0 e substitui por um valor padrão ou gera um erro
    if (municipio.populacao <= 0) {
      console.warn(`População inválida para o município ${MUNICÍPIO}. Usando valor padrão.`);
      municipio.populacao = 10000; // Valor padrão para municípios com dados de população inválidos
    }


    console.log('População do município:', municipio.populacao);

    // Calcula o grupo e pondera a intenção de voto
    const grupo = this.calcularGrupo(municipio.populacao);
    const pesoMunicipio = municipio.populacao / 1000000;

    console.log('Grupo do município:', grupo);
    console.log('Peso do município:', pesoMunicipio);
    console.log('Intenção de voto recebida:', intencaoVoto);

    // Retorna a intenção de voto ponderada
    const resultado = {
      'MUNICÍPIO': MUNICÍPIO,
      'ESTADO': ESTADO,
      'GRUPO': grupo,
      'INTENÇÃO DE VOTO PONDERADA': intentaoVotoNumerico * pesoMunicipio,
    };

    console.log('Resultado do cálculo:', resultado);
    return resultado;
  }

  // Função para converter a intenção de voto (A, B, C, ...) em números
  converterIntencaoVotoParaNumero(intencaoVoto: string): number | null {
    const votos: { [key: string]: number } = {
      'A': 1,
      'B': 2,
      'C': 3,
      'D': 4,
    };
    return votos[intencaoVoto] || null;
  }
}
