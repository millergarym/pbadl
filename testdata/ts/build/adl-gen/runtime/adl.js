"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function declResolver(...astMaps) {
    const astMap = {};
    for (let map of astMaps) {
        for (let scopedName in map) {
            astMap[scopedName] = map[scopedName];
        }
    }
    function resolver(scopedName) {
        const scopedNameStr = scopedName.moduleName + "." + scopedName.name;
        const result = astMap[scopedNameStr];
        if (result === undefined) {
            throw new Error("Unable to resolve ADL type " + scopedNameStr);
        }
        return result;
    }
    return resolver;
}
exports.declResolver = declResolver;
/* Type expressions for primitive types */
function texprPrimitive(ptype) {
    return {
        value: {
            typeRef: { kind: "primitive", value: ptype },
            parameters: []
        }
    };
}
;
function texprPrimitive1(ptype, etype) {
    return {
        value: {
            typeRef: { kind: "primitive", value: ptype },
            parameters: [etype.value]
        }
    };
}
;
function texprVoid() { return texprPrimitive("Void"); }
exports.texprVoid = texprVoid;
function texprBool() { return texprPrimitive("Bool"); }
exports.texprBool = texprBool;
function texprInt8() { return texprPrimitive("Int8"); }
exports.texprInt8 = texprInt8;
function texprInt16() { return texprPrimitive("Int16"); }
exports.texprInt16 = texprInt16;
function texprInt32() { return texprPrimitive("Int32"); }
exports.texprInt32 = texprInt32;
function texprInt64() { return texprPrimitive("Int64"); }
exports.texprInt64 = texprInt64;
function texprWord8() { return texprPrimitive("Word8"); }
exports.texprWord8 = texprWord8;
function texprWord16() { return texprPrimitive("Word16"); }
exports.texprWord16 = texprWord16;
function texprWord32() { return texprPrimitive("Word32"); }
exports.texprWord32 = texprWord32;
function texprWord64() { return texprPrimitive("Word64"); }
exports.texprWord64 = texprWord64;
function texprFloat() { return texprPrimitive("Float"); }
exports.texprFloat = texprFloat;
function texprDouble() { return texprPrimitive("Double"); }
exports.texprDouble = texprDouble;
function texprJson() { return texprPrimitive("Json"); }
exports.texprJson = texprJson;
function texprByteVector() { return texprPrimitive("ByteVector"); }
exports.texprByteVector = texprByteVector;
function texprString() { return texprPrimitive("String"); }
exports.texprString = texprString;
function texprVector(etype) {
    return texprPrimitive1("Vector", etype);
}
exports.texprVector = texprVector;
function texprStringMap(etype) {
    return texprPrimitive1("StringMap", etype);
}
exports.texprStringMap = texprStringMap;
function texprNullable(etype) {
    return texprPrimitive1("Nullable", etype);
}
exports.texprNullable = texprNullable;
//# sourceMappingURL=adl.js.map