import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { LoggingService } from './utils/logging.service';
import { MapObjectModule } from './map-object/map-object.module';

@Module({
  imports: [
    MapObjectModule,
    MongooseModule.forRoot('mongodb://localhost/prim')
  ],
  controllers: [
    AppController
  ],
  providers: [AppService, LoggingService],
})
export class AppModule {}
