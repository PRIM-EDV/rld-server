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
const Winston = require("winston");
const logFormat = Winston.format.printf((info) => {
    return `${info.timestamp} [${info.level}] ${info.message}`;
});
let LoggingService = class LoggingService {
    constructor() {
        console.log('instantiated');
        this._logger = Winston.createLogger({
            transports: [
                new Winston.transports.Console({
                    format: Winston.format.combine(Winston.format(info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(), Winston.format.colorize(), Winston.format.timestamp({
                        format: 'HH:mm:ss'
                    }), logFormat)
                }),
                new Winston.transports.File({
                    filename: 'logs/error.log', level: 'error',
                    format: Winston.format.combine(Winston.format(info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(), Winston.format.timestamp({
                        format: 'HH:mm:ss'
                    }), logFormat)
                }),
                new Winston.transports.File({
                    filename: 'logs/log.log', level: 'debug',
                    format: Winston.format.combine(Winston.format(info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(), Winston.format.timestamp({
                        format: 'HH:mm:ss'
                    }), logFormat)
                }),
            ],
        });
    }
    info(msg) {
        this._logger.info(msg);
    }
    debug(msg) {
        this._logger.debug(msg);
    }
    error(msg) {
        this._logger.error(msg);
    }
};
LoggingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], LoggingService);
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.service.js.map