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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const logging_service_1 = require("../utils/logging.service");
let SquadController = class SquadController {
    constructor(_squad, _log) {
        this._squad = _squad;
        this._log = _log;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this._log.info('GET /squad');
            return this._squad.find().exec();
        });
    }
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            this._log.info('POST /squad');
            const mapObject = new this._squad(object);
            return mapObject.save();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this._log.info('DELETE /squad/' + id);
            return this._squad.remove({ uid: id }).exec();
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SquadController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SquadController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SquadController.prototype, "delete", null);
SquadController = __decorate([
    common_1.Controller('squad'),
    __param(0, mongoose_2.InjectModel('Squad')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        logging_service_1.LoggingService])
], SquadController);
exports.SquadController = SquadController;
//# sourceMappingURL=squad.controller.js.map