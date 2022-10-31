import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return await user.save();
  }
  async findAll() {
    return this.userModel.find();
  }
  async findOneByApiKey(apiKey: string) {
    const user = await this.userModel.findOne({ apiKey });
    if (!user) throw new NotFoundException();
    return user;
  }
}
