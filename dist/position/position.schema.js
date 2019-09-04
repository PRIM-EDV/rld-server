"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.PositionSchema = new mongoose_1.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    id: { type: Number, required: true },
    timestamp: { type: Number, required: true },
});
//# sourceMappingURL=position.schema.js.map