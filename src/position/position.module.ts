import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PositionSchema } from './position.schema';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { MapObjectSchema } from '../models/map-object/map-object.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Position', schema: PositionSchema},
            {name: 'MapObject', schema: MapObjectSchema}
        ]),
    ],
    controllers: [PositionController],
    providers: [PositionService]
})
export class PositionModule {}
