import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { BidsModule } from './bids/bids.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PetOwnerMiddleware } from './middlewares/petOwner.middleware';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    MongooseModule.forRoot(
      `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    ),
    UsersModule,
    PetsModule,
    BidsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('pets');
    consumer.apply(AuthMiddleware).forRoutes('bids/:petId');
    consumer.apply(AuthMiddleware, PetOwnerMiddleware).forRoutes({
      path: 'bids/:petId/:gsp',
      method: RequestMethod.GET,
    });
  }
}
