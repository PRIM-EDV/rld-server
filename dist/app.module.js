"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const map_object_module_1 = require("./map-object/map-object.module");
const squad_module_1 = require("./squad/squad.module");
const position_module_1 = require("./position/position.module");
const logging_module_1 = require("./utils/logging.module");
const serial_module_1 = require("./utils/serial.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            logging_module_1.LoggingModule,
            squad_module_1.SquadModule,
            serial_module_1.SerialModule,
            position_module_1.PositionModule,
            map_object_module_1.MapObjectModule,
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/prim')
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [app_service_1.AppService],
        exports: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map