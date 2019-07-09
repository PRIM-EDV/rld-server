import { Schema } from 'mongoose';

export const MapObjectSchema: Schema = new Schema({
    position: { x: Number, y: Number },
    uid: {type: String, required: true, unique: true},
    name: {type: String},
    type: {type: String, required: true},

    // email: { type: String, required: true, unique: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
});
