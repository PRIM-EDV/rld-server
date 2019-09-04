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
const map_object_schema_1 = require("./map-object.schema");
const map_object_controller_1 = require("./map-object.controller");
let MapObjectModule = class MapObjectModule {
};
MapObjectModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'MapObject', schema: map_object_schema_1.MapObjectSchema }])
        ],
        controllers: [map_object_controller_1.MapObjectController],
    })
], MapObjectModule);
exports.MapObjectModule = MapObjectModule;
//# sourceMappingURL=map-object.module.js.map