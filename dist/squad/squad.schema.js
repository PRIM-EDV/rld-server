"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.SquadSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    callsign: { type: String, required: true }
});
//# sourceMappingURL=squad.schema.js.map