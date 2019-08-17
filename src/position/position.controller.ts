import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from 'src/utils/logging.service';
import { Position } from './position.interface';

@Controller('position')
export class PositionController {

    constructor(
        private _log: LoggingService
    ) {}

}
