import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RadioOperatorController } from './radio-operator.controller';
import { RadioOperatorSchema } from './radio-operator.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'RadioOperator', schema: RadioOperatorSchema}])
    ],
    controllers: [RadioOperatorController],
})
export class RadioOperatorModule {}
