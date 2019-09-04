import { Document } from 'mongoose';

export interface RadioOperator {
    callsign: string;
    trackerId?: number;
}

export interface RadioOperatorDocument extends RadioOperator, Document {}
