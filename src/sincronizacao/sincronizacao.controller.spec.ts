import { Test, TestingModule } from '@nestjs/testing';
import { SincronizacaoController } from './sincronizacao.controller';

describe('SincronizacaoController', () => {
  let controller: SincronizacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SincronizacaoController],
    }).compile();

    controller = module.get<SincronizacaoController>(SincronizacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
