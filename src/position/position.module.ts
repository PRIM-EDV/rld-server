import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PositionSchema } from './position.schema';
import { PositionController } from './position.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Position', schema: PositionSchema}]),
    ],
    controllers: [PositionController],
    providers: []
})
export class PositionModule {}
