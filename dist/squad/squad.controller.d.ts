import { Model } from 'mongoose';
import { Squad } from './squad.interface';
import { LoggingService } from '../utils/logging.service';
export declare class SquadController {
    private readonly _squad;
    private _log;
    constructor(_squad: Model<Squad>, _log: LoggingService);
    getAll(): Promise<Squad[]>;
    create(object: Squad): Promise<Squad>;
    delete(id: string): Promise<any>;
}
