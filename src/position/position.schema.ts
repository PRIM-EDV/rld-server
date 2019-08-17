import { Schema } from 'mongoose';

export const PositionSchema: Schema = new Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    id: {type: Number, required: true},
    timestamp: {type: Number, required: true} 
});
