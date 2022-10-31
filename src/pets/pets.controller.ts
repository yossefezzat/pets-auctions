import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @Req() req) {
    createPetDto.ownerId = req.user._id;
    return this.petsService.create(createPetDto);
  }
}
