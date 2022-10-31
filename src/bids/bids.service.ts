import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { generalized_second_price } from './helpers/bidWinner';
import { Bid } from './schemas/bid.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BidsService {
  constructor(@InjectModel(Bid.name) private readonly bidModel: Model<Bid>) {}
  async createBid(createBidDto: CreateBidDto) {
    try {
      const bid = await this.bidModel.create(createBidDto);
      return await new this.bidModel(bid).save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async listAllBids(petId: string, gsp: string) {
    let bids = await this.bidModel.find({ petId });
    if (gsp === 'winner') {
      bids = await generalized_second_price(bids);
    }
    return bids;
  }
}
