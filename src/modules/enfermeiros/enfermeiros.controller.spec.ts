import { Test, TestingModule } from '@nestjs/testing';
import { EnfermeirosController } from './enfermeiros.controller';
import { EnfermeirosService } from './enfermeiros.service';

describe('EnfermeirosController', () => {
  let controller: EnfermeirosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnfermeirosController],
      providers: [EnfermeirosService],
    }).compile();

    controller = module.get<EnfermeirosController>(EnfermeirosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
