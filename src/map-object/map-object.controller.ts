import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MapObject } from './map-object.interface';
import { LoggingService } from 'src/utils/logging.service';

@Controller('map-object')
export class MapObjectController {

    constructor(
        @InjectModel('MapObject') private readonly _mapObject: Model<MapObject>,
        private _log: LoggingService
    ) {}

    @Get()
        async getAll(): Promise<MapObject[]> {
            this._log.info('GET /map-object');
            return this._mapObject.find().exec();
        }

    @Post()
        async create(@Body() object: MapObject): Promise<MapObject> {
            this._log.info('POST /map-object');
            const mapObject = new this._mapObject(object);
            return mapObject.save();
        }

    @Delete(':id')
        async delete(@Param('id') id: string): Promise<any> {
            this._log.info('DELETE /map-object/' + id);
            return this._mapObject.remove({uid: id}).exec();
        }
}
