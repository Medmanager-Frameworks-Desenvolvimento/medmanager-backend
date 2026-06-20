import { Test, TestingModule } from '@nestjs/testing';
import { PrescricoesService } from './prescricoes.service';

describe('PrescricoesService', () => {
  let service: PrescricoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescricoesService],
    }).compile();

    service = module.get<PrescricoesService>(PrescricoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
