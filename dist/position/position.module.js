"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const position_schema_1 = require("./position.schema");
const position_controller_1 = require("./position.controller");
const position_service_1 = require("./position.service");
const map_object_schema_1 = require("../map-object/map-object.schema");
let PositionModule = class PositionModule {
};
PositionModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Position', schema: position_schema_1.PositionSchema },
                { name: 'MapObject', schema: map_object_schema_1.MapObjectSchema }
            ]),
        ],
        controllers: [position_controller_1.PositionController],
        providers: [position_service_1.PositionService]
    })
], PositionModule);
exports.PositionModule = PositionModule;
//# sourceMappingURL=position.module.js.map