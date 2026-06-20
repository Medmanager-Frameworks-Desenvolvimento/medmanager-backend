import { Test, TestingModule } from '@nestjs/testing';
import { EnfermeirosService } from './enfermeiros.service';

describe('EnfermeirosService', () => {
  let service: EnfermeirosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnfermeirosService],
    }).compile();

    service = module.get<EnfermeirosService>(EnfermeirosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
