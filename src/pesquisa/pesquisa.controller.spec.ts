import { Test, TestingModule } from '@nestjs/testing';
import { PesquisaController } from './pesquisa.controller';

describe('PesquisaController', () => {
  let controller: PesquisaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesquisaController],
    }).compile();

    controller = module.get<PesquisaController>(PesquisaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
