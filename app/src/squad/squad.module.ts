import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadSchema } from './squad.schema';
import { SquadController } from './squad.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Squad', schema: SquadSchema}])
    ],
    controllers: [SquadController],
})
export class SquadModule {}
