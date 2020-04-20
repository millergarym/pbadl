"use strict";
/* @generated from adl module sys.types */
Object.defineProperty(exports, "__esModule", { value: true });
function makePair(input) {
    return {
        v1: input.v1,
        v2: input.v2,
    };
}
exports.makePair = makePair;
const Pair_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": ["T1", "T2"], "fields": [{ "annotations": [], "serializedName": "v1", "default": { "kind": "nothing" }, "name": "v1", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "T1" }, "parameters": [] } }, { "annotations": [], "serializedName": "v2", "default": { "kind": "nothing" }, "name": "v2", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "T2" }, "parameters": [] } }] } }, "name": "Pair", "version": { "kind": "nothing" } } };
exports.snPair = { moduleName: "sys.types", name: "Pair" };
function texprPair(texprT1, texprT2) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "Pair" } }, parameters: [texprT1.value, texprT2.value] } };
}
exports.texprPair = texprPair;
const Either_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": ["T1", "T2"], "fields": [{ "annotations": [], "serializedName": "left", "default": { "kind": "nothing" }, "name": "left", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "T1" }, "parameters": [] } }, { "annotations": [], "serializedName": "right", "default": { "kind": "nothing" }, "name": "right", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "T2" }, "parameters": [] } }] } }, "name": "Either", "version": { "kind": "nothing" } } };
exports.snEither = { moduleName: "sys.types", name: "Either" };
function texprEither(texprT1, texprT2) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "Either" } }, parameters: [texprT1.value, texprT2.value] } };
}
exports.texprEither = texprEither;
const Maybe_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": ["T"], "fields": [{ "annotations": [], "serializedName": "nothing", "default": { "kind": "nothing" }, "name": "nothing", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Void" }, "parameters": [] } }, { "annotations": [], "serializedName": "just", "default": { "kind": "nothing" }, "name": "just", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "T" }, "parameters": [] } }] } }, "name": "Maybe", "version": { "kind": "nothing" } } };
exports.snMaybe = { moduleName: "sys.types", name: "Maybe" };
function texprMaybe(texprT) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "Maybe" } }, parameters: [texprT.value] } };
}
exports.texprMaybe = texprMaybe;
const Error_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": ["T"], "fields": [{ "annotations": [], "serializedName": "value", "default": { "kind": "nothing" }, "name": "value", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "T" }, "parameters": [] } }, { "annotations": [], "serializedName": "error", "default": { "kind": "nothing" }, "name": "error", "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } }] } }, "name": "Error", "version": { "kind": "nothing" } } };
exports.snError = { moduleName: "sys.types", name: "Error" };
function texprError(texprT) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "Error" } }, parameters: [texprT.value] } };
}
exports.texprError = texprError;
function makeMapEntry(input) {
    return {
        key: input.key,
        value: input.value,
    };
}
exports.makeMapEntry = makeMapEntry;
const MapEntry_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": ["K", "V"], "fields": [{ "annotations": [], "serializedName": "k", "default": { "kind": "nothing" }, "name": "key", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "K" }, "parameters": [] } }, { "annotations": [], "serializedName": "v", "default": { "kind": "nothing" }, "name": "value", "typeExpr": { "typeRef": { "kind": "typeParam", "value": "V" }, "parameters": [] } }] } }, "name": "MapEntry", "version": { "kind": "nothing" } } };
exports.snMapEntry = { moduleName: "sys.types", name: "MapEntry" };
function texprMapEntry(texprK, texprV) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "MapEntry" } }, parameters: [texprK.value, texprV.value] } };
}
exports.texprMapEntry = texprMapEntry;
const Map_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "newtype_", "value": { "typeParams": ["K", "V"], "default": { "kind": "nothing" }, "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.types", "name": "Pair" } }, "parameters": [{ "typeRef": { "kind": "typeParam", "value": "K" }, "parameters": [] }, { "typeRef": { "kind": "typeParam", "value": "V" }, "parameters": [] }] }] } } }, "name": "Map", "version": { "kind": "nothing" } } };
exports.snMap = { moduleName: "sys.types", name: "Map" };
function texprMap(texprK, texprV) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "Map" } }, parameters: [texprK.value, texprV.value] } };
}
exports.texprMap = texprMap;
const Set_AST = { "moduleName": "sys.types", "decl": { "annotations": [], "type_": { "kind": "newtype_", "value": { "typeParams": ["T"], "default": { "kind": "nothing" }, "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "typeParam", "value": "T" }, "parameters": [] }] } } }, "name": "Set", "version": { "kind": "nothing" } } };
exports.snSet = { moduleName: "sys.types", name: "Set" };
function texprSet(texprT) {
    return { value: { typeRef: { kind: "reference", value: { moduleName: "sys.types", name: "Set" } }, parameters: [texprT.value] } };
}
exports.texprSet = texprSet;
exports._AST_MAP = {
    "sys.types.Pair": Pair_AST,
    "sys.types.Either": Either_AST,
    "sys.types.Maybe": Maybe_AST,
    "sys.types.Error": Error_AST,
    "sys.types.MapEntry": MapEntry_AST,
    "sys.types.Map": Map_AST,
    "sys.types.Set": Set_AST
};
//# sourceMappingURL=types.js.map