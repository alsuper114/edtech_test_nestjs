import { Test, TestingModule } from '@nestjs/testing';
import { QuizeController } from './quize.controller';

describe('QuizeController', () => {
  let controller: QuizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizeController],
    }).compile();

    controller = module.get<QuizeController>(QuizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
