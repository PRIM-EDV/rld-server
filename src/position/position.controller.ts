import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from 'src/utils/logging.service';
import { PositionObject } from './position.interface';

@Controller('position')
export class PositionController {

    constructor(
        @InjectModel('Position') private readonly _position: Model<PositionObject>,
        private _log: LoggingService
    ) {}

}
