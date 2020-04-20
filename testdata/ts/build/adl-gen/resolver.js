"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* @generated from adl */
const adl_1 = require("./runtime/adl");
const importscope_1 = require("./phadl/importscope");
const testunion_1 = require("./phadl/testunion");
const adlast_1 = require("./sys/adlast");
const annotations_1 = require("./sys/annotations");
const types_1 = require("./sys/types");
const teststruct_1 = require("./teststruct");
exports.ADL = {
    ...importscope_1._AST_MAP,
    ...testunion_1._AST_MAP,
    ...adlast_1._AST_MAP,
    ...annotations_1._AST_MAP,
    ...types_1._AST_MAP,
    ...teststruct_1._AST_MAP,
};
exports.RESOLVER = adl_1.declResolver(exports.ADL);
//# sourceMappingURL=resolver.js.map