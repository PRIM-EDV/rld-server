import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MapObjectSchema } from './map-object.schema';
import { MapObjectController } from './map-object.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'MapObject', schema: MapObjectSchema}])
    ],
    controllers: [MapObjectController],
})
export class MapObjectModule {}
