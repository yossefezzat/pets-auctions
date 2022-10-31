import { Test, TestingModule } from '@nestjs/testing';
import { BidsController } from '../bids.controller';
import { BidsService } from '../bids.service';

describe('BidsController', () => {
  let controller: BidsController;
  let bidsService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidsController],
      providers: [
        BidsService,
        {
          provide: BidsService,
          useValue: bidsService,
        },
      ],
    }).compile();

    controller = module.get<BidsController>(BidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
