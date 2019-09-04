import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { LoggingService } from './utils/logging.service';
import { MapObjectModule } from './map-object/map-object.module';
import { SquadModule } from './squad/squad.module';
import { PositionModule } from './position/position.module';
import { LoggingModule } from './utils/logging.module';
import { SerialModule } from './utils/serial.module';
import { RadioOperatorModule } from './radio-operator/radio-operator.module'

@Module({
  imports: [
    RadioOperatorModule,
    LoggingModule,
    SquadModule,
    SerialModule,
    PositionModule,
    MapObjectModule,
    MongooseModule.forRoot('mongodb://localhost/prim')
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
  exports: []
})
export class AppModule {}
