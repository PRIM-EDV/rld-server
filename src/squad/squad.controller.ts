import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Squad } from './squad.interface';
import { LoggingService } from 'src/utils/logging.service';


@Controller('squad')
export class SquadController {

    constructor(
        @InjectModel('Squad') private readonly _squad: Model<Squad>,
        private _log: LoggingService
    ) {}

    @Get()
        async getAll(): Promise<Squad[]> {
            this._log.info('GET /squad');
            return this._squad.find().exec();
        }

    @Post()
        async create(@Body() object: Squad): Promise<Squad> {
            this._log.info('POST /squad');
            const mapObject = new this._squad(object);
            return mapObject.save();
        }

    @Delete(':id')
        async delete(@Param('id') id: string): Promise<any> {
            this._log.info('DELETE /squad/' + id);
            return this._squad.remove({uid: id}).exec();
        }
}
