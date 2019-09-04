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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const serial_service_1 = require("../utils/serial.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TRACKER = { '16': 'JK-19' };
let PositionService = class PositionService {
    constructor(_position, _mapObject, _serial) {
        this._position = _position;
        this._mapObject = _mapObject;
        this._serial = _serial;
        this.activePositions = [];
        this._serial.onRead(this._handleSerial.bind(this));
        setInterval(this._cleanup.bind(this), 30000);
    }
    _addPosition(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const position = {
                tid: data.id,
                x: data.px,
                y: data.py,
                timestamp: Date.now()
            };
            this.activePositions.push(position);
            if (String(position.tid) in TRACKER) {
                const callsign = TRACKER[String(position.tid)];
                yield this._updateFriendly(callsign, data);
            }
        });
    }
    _cleanup() {
        const now = Date.now();
        this.activePositions.forEach((position, index) => {
            if (now - position.timestamp > 30000) {
                console.log('Tracker timed out');
                if (String(position.tid) in TRACKER) {
                    const callsign = TRACKER[String(position.tid)];
                    this._updateFriendly(callsign);
                }
                this.activePositions.splice(index, 1);
            }
        });
    }
    _handleSerial(s) {
        const data = this._parseSerial(s);
        if (data) {
            const activePosition = this.activePositions.find(p => p.tid == data.id);
            if (activePosition) {
                this._updatePosition(activePosition, data);
            }
            else {
                this._addPosition(data);
            }
        }
    }
    _parseSerial(s) {
        const data = Object();
        let fields = s.split(':');
        if (fields.length === 4) {
            fields = fields.map((x) => parseInt(x, 10));
            data.id = fields[0];
            data.flags = fields[1] >> 4;
            data.px = ((fields[1] & 0x0f) << 6) | ((fields[2] & 0xfc) >> 2);
            data.py = ((fields[2] & 0x03) << 8) | fields[3];
            data.sf = fields[4];
            data.bw = fields[5];
            data.pw = fields[6];
            return data;
        }
        else {
            return null;
        }
    }
    _updatePosition(position, data) {
        return __awaiter(this, void 0, void 0, function* () {
            position.x = data.px;
            position.y = data.py;
            position.timestamp = Date.now();
            if (String(position.tid) in TRACKER) {
                const callsign = TRACKER[String(position.tid)];
                yield this._updateFriendly(callsign, data);
            }
        });
    }
    _updateFriendly(callsign, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data) {
                try {
                    console.log(yield this._mapObject.findOneAndUpdate({ "meta.callsign": callsign }, { "position.x": data.px, "position.y": data.py, "meta.tracked": true }));
                }
                catch (e) {
                    return;
                }
            }
            else {
                try {
                    yield this._mapObject.findOneAndUpdate({ "meta.callsign": callsign }, { "meta.tracked": false });
                }
                catch (_a) {
                    return;
                }
            }
        });
    }
};
PositionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Position')),
    __param(1, mongoose_1.InjectModel('MapObject')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        serial_service_1.SerialService])
], PositionService);
exports.PositionService = PositionService;
//# sourceMappingURL=position.service.js.map