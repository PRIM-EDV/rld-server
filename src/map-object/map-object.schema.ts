import { Schema } from 'mongoose';

export const MapObjectSchema: Schema = new Schema({
    position: { x: Number, y: Number },
    uid: {type: String, required: true, unique: true},
    name: {type: String},
    type: {type: String, required: true},
    meta: {
        size: {type: Number},
        description: {type: String},
        wounded: {type: Number},
        callsign: {type: String},
        subtype: {type: Number},
        tracked: {type: Boolean},
        medics: {type: Number},
        technitians: {type: Number},
        scientists: {type: Number}
    }

    // email: { type: String, required: true, unique: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
});
