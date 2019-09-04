import { LoggingService } from './logging.service';
export declare class SerialService {
    private _log;
    device: any;
    private _data;
    constructor(_log: LoggingService);
    onRead(callback: any): void;
    write(s: string): void;
    private _read;
    private _connect;
    private _disconnect;
    private _autoConnect;
}
