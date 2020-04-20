"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Convert an ADL value to a dynamically typed value
 */
function toDynamic(jsonBinding, value) {
    return { typeExpr: jsonBinding.typeExpr, value: jsonBinding.toJson(value) };
}
exports.toDynamic = toDynamic;
/**
 * Convert an ADL value to a dynamically typed value
 */
function fromDynamic(jsonBinding, dynamic) {
    if (utils_1.typeExprsEqual(jsonBinding.typeExpr, dynamic.typeExpr)) {
        return jsonBinding.fromJson(dynamic.value);
    }
    return null;
}
exports.fromDynamic = fromDynamic;
//# sourceMappingURL=dynamic.js.map