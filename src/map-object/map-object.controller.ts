import { Controller, Get, Post, Body } from '@nestjs/common';

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
            console.log(object)
            const mapObject = new this._mapObject(object);
            return mapObject.save();
        }
}
