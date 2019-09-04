"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.MapObjectSchema = new mongoose_1.Schema({
    position: { x: Number, y: Number },
    uid: { type: String, required: true, unique: true },
    name: { type: String },
    type: { type: String, required: true },
    meta: {
        size: { type: Number },
        description: { type: String },
        wounded: { type: Number },
        callsign: { type: String },
        subtype: { type: Number },
        tracked: { type: Boolean }
    }
});
//# sourceMappingURL=map-object.schema.js.map