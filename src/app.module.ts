import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { MapObjectController } from './controllers/map-object.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/prim')],
  controllers: [
    AppController,
    MapObjectController,
  ],
  providers: [AppService],
})
export class AppModule {}
