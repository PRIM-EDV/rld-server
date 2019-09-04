"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const SerialPort = require("serialport");
const rxjs_1 = require("rxjs");
const logging_service_1 = require("./logging.service");
let SerialService = class SerialService {
    constructor(_log) {
        this._log = _log;
        this.device = undefined;
        this._data = new rxjs_1.Subject();
        setInterval(this._autoConnect.bind(this), 5000);
        this.onRead((data) => { console.log(data); });
    }
    onRead(callback) {
        this._data.subscribe(callback);
    }
    write(s) {
        if (this.device) {
            this.device.write(s + '\r');
        }
    }
    _read() {
        let lineBuffer;
        this.device.on('data', (data) => {
            for (const d of data) {
                if (d === 10 || d === 13) {
                    this._data.next(lineBuffer);
                    lineBuffer = '';
                }
                else {
                    lineBuffer += String.fromCharCode(d);
                }
            }
        });
    }
    _connect(port) {
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
    _disconnect() {
        if (this.device) {
            this.device = undefined;
        }
    }
    _autoConnect() {
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
};
SerialService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], SerialService);
exports.SerialService = SerialService;
//# sourceMappingURL=serial.service.js.map