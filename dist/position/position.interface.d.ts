import { Document } from 'mongoose';
export interface Position {
    x: number;
    y: number;
    tid: number;
    timestamp: number;
}
export interface PositionDocument extends Position, Document {
}
