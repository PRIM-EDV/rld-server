import mongoose, { Schema, Document } from 'mongoose';

export interface MapObjectDocument extends Document {
    position: { x: number, y: number};
}

const MapObjectSchema: Schema = new Schema({
    position: { x: Number, y: Number },
    // email: { type: String, required: true, unique: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
});

export default mongoose.model<MapObjectDocument>('MapObject', MapObjectSchema);
