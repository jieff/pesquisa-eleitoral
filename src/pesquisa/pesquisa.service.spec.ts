import { Test, TestingModule } from '@nestjs/testing';
import { PesquisaService } from './pesquisa.service';

describe('PesquisaService', () => {
  let service: PesquisaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PesquisaService],
    }).compile();

    service = module.get<PesquisaService>(PesquisaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
