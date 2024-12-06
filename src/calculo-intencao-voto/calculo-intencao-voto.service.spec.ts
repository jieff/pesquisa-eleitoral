import { Test, TestingModule } from '@nestjs/testing';
import { CalculoIntencaoVotoService } from './calculo-intencao-voto.service';

describe('CalculoIntencaoVotoService', () => {
  let service: CalculoIntencaoVotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculoIntencaoVotoService],
    }).compile();

    service = module.get<CalculoIntencaoVotoService>(CalculoIntencaoVotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
