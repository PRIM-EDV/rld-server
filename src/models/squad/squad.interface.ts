import { Document } from 'mongoose';
import { Squad } from 'src/core/models/db.squad';


export interface SquadDocument extends Squad, Document {}