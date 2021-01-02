import { Document } from 'mongoose';

export interface MapObject extends Document {
    name: string;
    position: { x: number, y: number};
    uid: string;
    type: string;
    meta: {
        size?: number,
        description?: string,
        wounded?: number,
        subtype: number,
        tracked: boolean
    };
}
