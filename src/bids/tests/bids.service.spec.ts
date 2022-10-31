import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { BidsService } from '../bids.service';
import { Bid } from '../schemas/bid.schema';

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};
class bidModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn();
  static create = jest.fn();
  static createBid = jest.fn();
  static listAllBids = jest.fn();
}

describe('BidsService', () => {
  let service: BidsService;
  let bidRepository: any;
  const bidModelToken = getModelToken('Bid');
  const bid = {
    _id: '63602443dd14c24be221ef79',
    name: 'john dear',
    value: 150,
    petId: '63602401dd14c24be221ef6e',
    userId: '636023c9dd14c24be221ef65',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidsService,
        {
          provide: bidModelToken,
          useValue: bidModel,
        },
      ],
    }).compile();

    service = module.get<BidsService>(BidsService);
    bidRepository = module.get<Model<Bid>>(getModelToken('Bid'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Bid', () => {
    it('should create a new category when all data sent is correct', async () => {
      jest.spyOn(bidRepository, 'create').mockResolvedValueOnce(bid);
      const data = await service.createBid(bid);
      expect(bidRepository.create).toHaveBeenCalledWith(bid);
      expect(data).toEqual(bid);
    });

    it('should throw a badRequestException in case of bad inputs', async () => {
      jest.spyOn(bidRepository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });
      const error = await getError(async () => await service.createBid(bid));
      expect(error).toStrictEqual(new BadRequestException(error));
    });
  });

  describe('Find Bids', () => {
    it('should find all bids by petId', async () => {
      const petId = 'fakeId';
      jest.spyOn(bidRepository, 'find').mockResolvedValueOnce([bid]);
      const data = await service.listAllBids(petId, '');
      expect(bidRepository.find).toHaveBeenCalledWith({ petId });
      expect(data).toEqual([bid]);
    });
  });
});
