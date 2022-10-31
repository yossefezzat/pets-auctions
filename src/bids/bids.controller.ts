import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post('/:petId')
  create(@Body() createBidDto: CreateBidDto, @Req() req, @Res() res) {
    createBidDto.userId = req.user._id;
    createBidDto.petId = req.params.petId;
    this.bidsService
      .createBid(createBidDto)
      .then((bid) => res.status(201).json(bid))
      .catch((err) => res.status(400).json({ message: err.message }));
  }

  @Get('/:petId/:gsp?')
  async findAll(@Req() req, @Res() res) {
    const { petId } = req.params;
    const { gsp } = req.params;
    const allPetBids = await this.bidsService.listAllBids(petId, gsp);
    res.status(200).json(allPetBids);
  }
}
