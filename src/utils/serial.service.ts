import { Injectable } from '@nestjs/common';
import SerialPort = require("serialport");
import { Subject } from 'rxjs';


@Injectable()
export class SerialService {
    // date = new Date();
    public device: any = undefined;

    private _data = new Subject<string>()

    constructor() {
        this._autoConnect();
    }

    public read(callback) {
        this._data.subscribe(callback);
    }

    public write(s: string) {
        if (this.device) {
            this.device.write(s + "\r");
        }
    }

    private _read() {
        let lineBuffer: string;

        this.device.on("data", (data: any) => {
            for (const d of data) {
                lineBuffer += String.fromCharCode(d);

                if (d === 10 || d === 13) {
                    this._data.next(lineBuffer);
                    lineBuffer = "";
                }
            }
        });
    }

    private _connect(port: any) {
        if (!this.device) {
            this.device = new SerialPort(port.comName, {
                baudRate: 115200,
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
        SerialPort.list().then((ports) => {
            let validPort;
            for (const port of ports) {
                if ((port.productId === "EA60" || port.productId === "ea60") && (port.vendorId === "10C4" || port.vendorId === "10c4")) {
                    validPort = port;
                }
            }
            validPort ? this._connect(validPort) : this._disconnect();
        });
    }
}