import { Model } from 'mongoose';
import { MapObject } from './map-object.interface';
import { LoggingService } from '../utils/logging.service';
export declare class MapObjectController {
    private readonly _mapObject;
    private _log;
    constructor(_mapObject: Model<MapObject>, _log: LoggingService);
    getAll(): Promise<MapObject[]>;
    create(object: MapObject): Promise<MapObject>;
    update(object: MapObject): Promise<void>;
    delete(id: string): Promise<any>;
}
