import { Injectable } from '@nestjs/common';

export interface SerialData {
    bw: number;
    flags: number;
    id: number;
    pw: number;
    px: number;
    py: number
    sf: number;
}

@Injectable()
export class PositionService {
    constructor() {
        
    }

    private _parseSerial(s: string): SerialData {
        const data: SerialData = Object();
        let fields: Array<string> | Array<number>  = s.split(":");

        if (fields.length === 7) {
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
}
