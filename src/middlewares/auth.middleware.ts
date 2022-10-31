import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  use(req: any, res: Response, next: NextFunction) {
    const apiKey = req.headers.apikey;
    if (!apiKey) {
      return res.status(401).json({ msg: 'Unauthorized Request' });
    }
    this.usersService
      .findOneByApiKey(apiKey)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => {
        return res.status(401).json({ msg: 'Unauthorized Request' });
      });
  }
}
