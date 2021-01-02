import { Document } from 'mongoose';

export interface Squad extends Document {
    name: string;
    callsign: string;
}
