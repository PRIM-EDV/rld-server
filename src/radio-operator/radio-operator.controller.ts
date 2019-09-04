import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '../utils/logging.service';
import { RadioOperator, RadioOperatorDocument } from './radio-operator.interface'


@Controller('operator')
export class RadioOperatorController {

    constructor(
        @InjectModel('RadioOperator') private readonly _radioOperator: Model<RadioOperatorDocument>,
        private _log: LoggingService
    ) {}

    @Get()
    async getAll(): Promise<RadioOperator[]> {
        this._log.info('GET /operator');
        return this._radioOperator.find().exec();
    }

    @Post()
    async create(@Body() data: RadioOperator): Promise<any> {
        this._log.info('POST /operator');

        try {
            const existingData = await this._radioOperator.find({callsign: data.callsign});
            
            if (existingData.length == 0) {
                const operator = new this._radioOperator(data);
                return operator.save();
            }

        } catch(err) {
            console.log(err)
        }
    }

    @Delete(':id')
    async delete(@Param('id') callsign: string): Promise<any> {
        this._log.info('DELETE /operator/' + callsign);
        return this._radioOperator.remove({callsign: callsign}).exec();
    }

}
