"use strict";
/* @generated from adl module teststruct */
Object.defineProperty(exports, "__esModule", { value: true });
function makeADLProductType(input) {
    return {
        A: input.A,
        B: input.B,
        X: input.X,
        Y: input.Y,
    };
}
exports.makeADLProductType = makeADLProductType;
const ADLProductType_AST = { "moduleName": "teststruct", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "A", "default": { "kind": "nothing" }, "name": "A", "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } }, { "annotations": [], "serializedName": "B", "default": { "kind": "nothing" }, "name": "B", "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } }, { "annotations": [], "serializedName": "X", "default": { "kind": "nothing" }, "name": "X", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Int64" }, "parameters": [] } }, { "annotations": [], "serializedName": "Y", "default": { "kind": "nothing" }, "name": "Y", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Int64" }, "parameters": [] } }] } }, "name": "ADLProductType", "version": { "kind": "nothing" } } };
exports.snADLProductType = { moduleName: "teststruct", name: "ADLProductType" };
function texprADLProductType() {
    return { value: { typeRef: { kind: "reference", value: exports.snADLProductType }, parameters: [] } };
}
exports.texprADLProductType = texprADLProductType;
exports._AST_MAP = {
    "teststruct.ADLProductType": ADLProductType_AST
};
//# sourceMappingURL=teststruct.js.map