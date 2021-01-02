import { Injectable } from '@nestjs/common';
import SerialPort = require('serialport');
import { Subject, BehaviorSubject } from 'rxjs';
import { LoggingService } from './logging.service';


@Injectable()
export class SerialService {
    public device: any = undefined;
    private _data = new Subject<string>();

    constructor(private _log: LoggingService) {
        setInterval(this._autoConnect.bind(this), 5000);
        this.onRead((data) => {console.log(data); });
    }

    public onRead(callback) {
        this._data.subscribe(callback);
    }

    public write(s: string) {
        if (this.device) {
            this.device.write(s + '\r');
        }
    }

    private _read() {
        let lineBuffer: string;

        this.device.on('data', (data: any) => {
            for (const d of data) {
                if (d === 10 || d === 13) {
                    this._data.next(lineBuffer);
                    lineBuffer = '';
                } else {
                    lineBuffer += String.fromCharCode(d);
                }
            }
        });
    }

    private _connect(port: any) {
        if (!this.device) {
            this.device = new SerialPort(port.comName, {
                baudRate: 115200,
            });
            this._log.info('Connected to radio device');

            this.device.on('close', () => {
                this.device = null;
                this._log.info('Disconnected from radio device');
            });

            this._read();
        }
    }

    private _disconnect() {
        if (this.device) {
            this.device = undefined;
        }
    }

    private _autoConnect() {
        if (this.device == null) {
            SerialPort.list().then((ports) => {
                let validPort;
                for (const port of ports) {
                    if ((port.productId === 'EA60' || port.productId === 'ea60') && (port.vendorId === '10C4' || port.vendorId === '10c4')) {
                        validPort = port;
                    }
                }
                validPort ? this._connect(validPort) : this._disconnect();
            });
        }
    }
}
