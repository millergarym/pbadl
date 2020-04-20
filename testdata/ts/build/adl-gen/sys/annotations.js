"use strict";
/* @generated from adl module sys.annotations */
Object.defineProperty(exports, "__esModule", { value: true });
const Doc_AST = { "moduleName": "sys.annotations", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } } }, "name": "Doc", "version": { "kind": "nothing" } } };
exports.snDoc = { moduleName: "sys.annotations", name: "Doc" };
function texprDoc() {
    return { value: { typeRef: { kind: "reference", value: exports.snDoc }, parameters: [] } };
}
exports.texprDoc = texprDoc;
const SerializedName_AST = { "moduleName": "sys.annotations", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } } }, "name": "SerializedName", "version": { "kind": "nothing" } } };
exports.snSerializedName = { moduleName: "sys.annotations", name: "SerializedName" };
function texprSerializedName() {
    return { value: { typeRef: { kind: "reference", value: exports.snSerializedName }, parameters: [] } };
}
exports.texprSerializedName = texprSerializedName;
const CustomSerialization_AST = { "moduleName": "sys.annotations", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "primitive", "value": "Bool" }, "parameters": [] } } }, "name": "CustomSerialization", "version": { "kind": "nothing" } } };
exports.snCustomSerialization = { moduleName: "sys.annotations", name: "CustomSerialization" };
function texprCustomSerialization() {
    return { value: { typeRef: { kind: "reference", value: exports.snCustomSerialization }, parameters: [] } };
}
exports.texprCustomSerialization = texprCustomSerialization;
exports._AST_MAP = {
    "sys.annotations.Doc": Doc_AST,
    "sys.annotations.SerializedName": SerializedName_AST,
    "sys.annotations.CustomSerialization": CustomSerialization_AST
};
//# sourceMappingURL=annotations.js.map