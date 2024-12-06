import { Test, TestingModule } from '@nestjs/testing';
import { CalculoIntencaoVotoController } from './calculo-intencao-voto.controller';

describe('CalculoIntencaoVotoController', () => {
  let controller: CalculoIntencaoVotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculoIntencaoVotoController],
    }).compile();

    controller = module.get<CalculoIntencaoVotoController>(CalculoIntencaoVotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
