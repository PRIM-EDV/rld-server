import { Injectable } from '@nestjs/common';
import { SerialService } from 'src/utils/serial.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionDocument } from './position.interface';
import { MapObject } from '../map-object/map-object.interface';

const TRACKER = {'17': 'JK-19'};

export interface SerialData {
    bw: number;
    flags: number;
    id: number;
    pw: number;
    px: number;
    py: number;
    sf: number;
}

@Injectable()
export class PositionService {

    public activePositions: Array<Position> = [];

    constructor(
        @InjectModel('Position') private readonly _position: Model<PositionDocument>,
        @InjectModel('MapObject') private readonly _mapObject: Model<MapObject>,
        private _serial: SerialService
        ) {
        this._serial.onRead(this._handleSerial.bind(this));

        setInterval(this._cleanup.bind(this), 30000);
    }

    private async _addPosition(data): Promise<void> {
        const position = {
            tid: data.id,
            x: data.px,
            y: data.py,
            timestamp: Date.now()
        };
        this.activePositions.push(position);

        if (String(position.tid) in TRACKER) {
            const callsign = TRACKER[String(position.tid)];
            await this._updateFriendly(callsign, data);
        }
    }

    private _cleanup() {
        const now = Date.now();

        this.activePositions.forEach((position, index) => {
            if ( now - position.timestamp > 30000) {
                console.log('Tracker timed out');

                if (String(position.tid) in TRACKER) {
                    const callsign = TRACKER[String(position.tid)];
                    this._updateFriendly(callsign);
                }

                this.activePositions.splice(index, 1);
            }
        });
    }

    private _handleSerial(s: string) {
        const data = this._parseSerial(s);
        console.log(data);
        if (data) {
            const activePosition = this.activePositions.find(p => p.tid == data.id);

            if (activePosition) {
                this._updatePosition(activePosition, data);
            } else {
                this._addPosition(data);
            }
        }
    }

    private _parseSerial(s: string): SerialData {
        const data: SerialData = Object();
        let fields: Array<string> | Array<number>  = s.split(':');

        if (fields.length === 4) {
            fields = fields.map((x: string) => parseInt(x, 10));

            data.id = fields[0];
            data.flags = fields[1] >> 4;
            data.px = ((fields[1] & 0x0f) << 6) | ((fields[2] & 0xfc) >> 2);
            data.py = ((fields[2] & 0x03) << 8) | fields[3];
            data.sf = fields[4];
            data.bw = fields[5];
            data.pw = fields[6];

            return data;
        } else {
            return null;
        }
    }

    private async _updatePosition(position: Position, data: SerialData): Promise<void> {
        position.x = data.px;
        position.y = data.py;
        position.timestamp = Date.now();

        if (String(position.tid) in TRACKER) {
            const callsign = TRACKER[String(position.tid)];
            await this._updateFriendly(callsign, data);
        }
    }

    private async _updateFriendly(callsign: string, data?: SerialData): Promise<void> {
        if (data) {
            try {
                await this._mapObject.findOneAndUpdate(
                    {meta: {callsign: callsign}},
                    {x: data.px, y: data.py, meta: {tracked: true}});
            } catch {
                return;
            }
        } else {
            try {
                await this._mapObject.findOneAndUpdate(
                    {meta: {callsign: callsign}},
                    {meta: {tracked: false}});
            } catch {
                return;
            }
        }
    }
}
