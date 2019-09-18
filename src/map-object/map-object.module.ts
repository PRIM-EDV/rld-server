import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MapObjectSchema } from '../models/map-object/map-object.schema';
import { MapObjectController } from './map-object.controller';
import { MapObjectGateway } from './map-object.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'MapObject', schema: MapObjectSchema}])
    ],
    controllers: [],
    providers:[MapObjectGateway]
})
export class MapObjectModule {}
