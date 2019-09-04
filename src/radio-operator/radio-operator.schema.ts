import { Schema } from 'mongoose';

export const RadioOperatorSchema: Schema = new Schema({
    callsign: {type: String, required: true, unique: true},
    trackerId: {type: Number}
});
