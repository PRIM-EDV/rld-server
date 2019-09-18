import { Document } from 'mongoose';
import { RadioOperator } from 'src/core/models/db.radio-operator';
 

export interface RadioOperatorDocument extends RadioOperator, Document {}
