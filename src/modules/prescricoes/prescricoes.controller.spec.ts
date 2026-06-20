import { Test, TestingModule } from '@nestjs/testing';
import { PrescricoesController } from './prescricoes.controller';
import { PrescricoesService } from './prescricoes.service';

describe('PrescricoesController', () => {
  let controller: PrescricoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescricoesController],
      providers: [PrescricoesService],
    }).compile();

    controller = module.get<PrescricoesController>(PrescricoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
