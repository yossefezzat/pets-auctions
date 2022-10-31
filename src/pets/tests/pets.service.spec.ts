import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PetsService } from '../pets.service';
import { Pet } from '../schemas/pet.schema';

describe('PetsService', () => {
  let service: PetsService;
  let petRepository: any;
  const petModelToken = getModelToken('Pet');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        {
          provide: petModelToken,
          useValue: {
            create: jest.fn(),
            findOneByOwner: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
    petRepository = module.get<Model<Pet>>(getModelToken('Pet'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find Bids', () => {
    it('should find all bids by petId', async () => {
      const pet = {
        _id: 'fakeId',
        name: 'cat',
        status: 'available',
        ownerId: 'fakeId',
      };
      const ownerId = 'fakeId';
      const _id = 'fakeId';
      jest.spyOn(petRepository, 'findOne').mockResolvedValueOnce(pet);
      const data = await service.findOneByOwner(ownerId, _id);
      expect(petRepository.findOne).toHaveBeenCalledWith({ ownerId, _id });
      expect(data).toEqual(pet);
    });
  });
});
