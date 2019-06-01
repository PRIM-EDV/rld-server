import { Controller, Get, Post, Body } from '@nestjs/common';
import { Database } from '../utils/database.util';

import { MapObjectDocument } from 'src/models/map-object.model';

@Controller('map-object')
export class MapObjectController {

    @Get()
        async getAll(): Promise<MapObjectDocument[]> {
            return Database.mapObject.find().exec();
        }

    @Post()
        async create(@Body() object: MapObjectDocument): Promise<MapObjectDocument> {
            const mapObject = new Database.mapObject(object);
            return mapObject.save();
        }
}
