import { Document } from 'mongoose';
import { MapObject } from 'src/core/models/db.map-object';

export interface MapObjectDocument extends MapObject, Document {}
