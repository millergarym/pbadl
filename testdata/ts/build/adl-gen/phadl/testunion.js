"use strict";
/* @generated from adl module phadl.testunion */
Object.defineProperty(exports, "__esModule", { value: true });
const ADLSumType_AST = { "moduleName": "phadl.testunion", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "A", "default": { "kind": "nothing" }, "name": "A", "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } }, { "annotations": [], "serializedName": "B", "default": { "kind": "nothing" }, "name": "B", "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } }, { "annotations": [], "serializedName": "X", "default": { "kind": "nothing" }, "name": "X", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Int64" }, "parameters": [] } }, { "annotations": [], "serializedName": "Y", "default": { "kind": "nothing" }, "name": "Y", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Int64" }, "parameters": [] } }, { "annotations": [], "serializedName": "Z", "default": { "kind": "nothing" }, "name": "Z", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Void" }, "parameters": [] } }] } }, "name": "ADLSumType", "version": { "kind": "nothing" } } };
exports.snADLSumType = { moduleName: "phadl.testunion", name: "ADLSumType" };
function texprADLSumType() {
    return { value: { typeRef: { kind: "reference", value: exports.snADLSumType }, parameters: [] } };
}
exports.texprADLSumType = texprADLSumType;
exports._AST_MAP = {
    "phadl.testunion.ADLSumType": ADLSumType_AST
};
//# sourceMappingURL=testunion.js.map