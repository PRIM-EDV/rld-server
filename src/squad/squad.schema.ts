import { Schema } from 'mongoose';

export const SquadSchema: Schema = new Schema({
    name: {type: String, required: true},
    callsign: {type: String, required: true}
});
