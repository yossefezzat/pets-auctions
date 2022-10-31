import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './schemas/pet.schema';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<Pet>) {}
  async create(createPetDto: CreatePetDto) {
    const pet = await this.petModel.create(createPetDto);
    return await pet.save();
  }
  async findOneByOwner(ownerId: string, petId: string) {
    const pet = await this.petModel.findOne({ ownerId, _id: petId });
    if (!pet) throw new NotFoundException();
    return pet;
  }
}
