import { Test, TestingModule } from '@nestjs/testing';
import { QuizeService } from './quize.service';

describe('QuizeService', () => {
  let service: QuizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizeService],
    }).compile();

    service = module.get<QuizeService>(QuizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
