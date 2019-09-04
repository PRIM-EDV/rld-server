import { SerialService } from '../utils/serial.service';
import { Model } from 'mongoose';
import { Position, PositionDocument } from './position.interface';
import { MapObject } from '../map-object/map-object.interface';
export interface SerialData {
    bw: number;
    flags: number;
    id: number;
    pw: number;
    px: number;
    py: number;
    sf: number;
}
export declare class PositionService {
    private readonly _position;
    private readonly _mapObject;
    private _serial;
    activePositions: Array<Position>;
    constructor(_position: Model<PositionDocument>, _mapObject: Model<MapObject>, _serial: SerialService);
    private _addPosition;
    private _cleanup;
    private _handleSerial;
    private _parseSerial;
    private _updatePosition;
    private _updateFriendly;
}
