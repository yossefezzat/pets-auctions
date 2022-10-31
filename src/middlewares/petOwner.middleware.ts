import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class PetOwnerMiddleware implements NestMiddleware {
  constructor(private readonly petsService: PetsService) {}
  use(req: any, res: Response, next: NextFunction) {
    const userId = req.user._id;
    const { petId } = req.params;
    this.petsService
      .findOneByOwner(userId, petId)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(401).json({
          message: 'Unauthorized request',
        });
      });
  }
}
