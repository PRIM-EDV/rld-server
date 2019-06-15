import { Document } from 'mongoose';

export interface MapObject extends Document {
    position: { x: number, y: number};
    uid: string;
}
