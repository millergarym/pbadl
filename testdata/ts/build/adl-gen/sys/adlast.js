"use strict";
/* @generated from adl module sys.adlast */
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleName_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } } }, "name": "ModuleName", "version": { "kind": "nothing" } } };
exports.snModuleName = { moduleName: "sys.adlast", name: "ModuleName" };
function texprModuleName() {
    return { value: { typeRef: { kind: "reference", value: exports.snModuleName }, parameters: [] } };
}
exports.texprModuleName = texprModuleName;
const Ident_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "primitive", "value": "String" }, "parameters": [] } } }, "name": "Ident", "version": { "kind": "nothing" } } };
exports.snIdent = { moduleName: "sys.adlast", name: "Ident" };
function texprIdent() {
    return { value: { typeRef: { kind: "reference", value: exports.snIdent }, parameters: [] } };
}
exports.texprIdent = texprIdent;
const Annotations_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.types", "name": "Map" } }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ScopedName" } }, "parameters": [] }, { "typeRef": { "kind": "primitive", "value": "Json" }, "parameters": [] }] } } }, "name": "Annotations", "version": { "kind": "nothing" } } };
exports.snAnnotations = { moduleName: "sys.adlast", name: "Annotations" };
function texprAnnotations() {
    return { value: { typeRef: { kind: "reference", value: exports.snAnnotations }, parameters: [] } };
}
exports.texprAnnotations = texprAnnotations;
function makeScopedName(input) {
    return {
        moduleName: input.moduleName,
        name: input.name,
    };
}
exports.makeScopedName = makeScopedName;
const ScopedName_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "moduleName", "default": { "kind": "nothing" }, "name": "moduleName", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ModuleName" } }, "parameters": [] } }, { "annotations": [], "serializedName": "name", "default": { "kind": "nothing" }, "name": "name", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] } }] } }, "name": "ScopedName", "version": { "kind": "nothing" } } };
exports.snScopedName = { moduleName: "sys.adlast", name: "ScopedName" };
function texprScopedName() {
    return { value: { typeRef: { kind: "reference", value: exports.snScopedName }, parameters: [] } };
}
exports.texprScopedName = texprScopedName;
const TypeRef_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "primitive", "default": { "kind": "nothing" }, "name": "primitive", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] } }, { "annotations": [], "serializedName": "typeParam", "default": { "kind": "nothing" }, "name": "typeParam", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] } }, { "annotations": [], "serializedName": "reference", "default": { "kind": "nothing" }, "name": "reference", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ScopedName" } }, "parameters": [] } }] } }, "name": "TypeRef", "version": { "kind": "nothing" } } };
exports.snTypeRef = { moduleName: "sys.adlast", name: "TypeRef" };
function texprTypeRef() {
    return { value: { typeRef: { kind: "reference", value: exports.snTypeRef }, parameters: [] } };
}
exports.texprTypeRef = texprTypeRef;
function makeTypeExpr(input) {
    return {
        typeRef: input.typeRef,
        parameters: input.parameters,
    };
}
exports.makeTypeExpr = makeTypeExpr;
const TypeExpr_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "typeRef", "default": { "kind": "nothing" }, "name": "typeRef", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "TypeRef" } }, "parameters": [] } }, { "annotations": [], "serializedName": "parameters", "default": { "kind": "nothing" }, "name": "parameters", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "TypeExpr" } }, "parameters": [] }] } }] } }, "name": "TypeExpr", "version": { "kind": "nothing" } } };
exports.snTypeExpr = { moduleName: "sys.adlast", name: "TypeExpr" };
function texprTypeExpr() {
    return { value: { typeRef: { kind: "reference", value: exports.snTypeExpr }, parameters: [] } };
}
exports.texprTypeExpr = texprTypeExpr;
function makeField(input) {
    return {
        name: input.name,
        serializedName: input.serializedName,
        typeExpr: input.typeExpr,
        default: input.default,
        annotations: input.annotations,
    };
}
exports.makeField = makeField;
const Field_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "name", "default": { "kind": "nothing" }, "name": "name", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] } }, { "annotations": [], "serializedName": "serializedName", "default": { "kind": "nothing" }, "name": "serializedName", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] } }, { "annotations": [], "serializedName": "typeExpr", "default": { "kind": "nothing" }, "name": "typeExpr", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "TypeExpr" } }, "parameters": [] } }, { "annotations": [], "serializedName": "default", "default": { "kind": "nothing" }, "name": "default", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.types", "name": "Maybe" } }, "parameters": [{ "typeRef": { "kind": "primitive", "value": "Json" }, "parameters": [] }] } }, { "annotations": [], "serializedName": "annotations", "default": { "kind": "nothing" }, "name": "annotations", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Annotations" } }, "parameters": [] } }] } }, "name": "Field", "version": { "kind": "nothing" } } };
exports.snField = { moduleName: "sys.adlast", name: "Field" };
function texprField() {
    return { value: { typeRef: { kind: "reference", value: exports.snField }, parameters: [] } };
}
exports.texprField = texprField;
function makeStruct(input) {
    return {
        typeParams: input.typeParams,
        fields: input.fields,
    };
}
exports.makeStruct = makeStruct;
const Struct_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "typeParams", "default": { "kind": "nothing" }, "name": "typeParams", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] }] } }, { "annotations": [], "serializedName": "fields", "default": { "kind": "nothing" }, "name": "fields", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Field" } }, "parameters": [] }] } }] } }, "name": "Struct", "version": { "kind": "nothing" } } };
exports.snStruct = { moduleName: "sys.adlast", name: "Struct" };
function texprStruct() {
    return { value: { typeRef: { kind: "reference", value: exports.snStruct }, parameters: [] } };
}
exports.texprStruct = texprStruct;
function makeUnion(input) {
    return {
        typeParams: input.typeParams,
        fields: input.fields,
    };
}
exports.makeUnion = makeUnion;
const Union_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "typeParams", "default": { "kind": "nothing" }, "name": "typeParams", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] }] } }, { "annotations": [], "serializedName": "fields", "default": { "kind": "nothing" }, "name": "fields", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Field" } }, "parameters": [] }] } }] } }, "name": "Union", "version": { "kind": "nothing" } } };
exports.snUnion = { moduleName: "sys.adlast", name: "Union" };
function texprUnion() {
    return { value: { typeRef: { kind: "reference", value: exports.snUnion }, parameters: [] } };
}
exports.texprUnion = texprUnion;
function makeTypeDef(input) {
    return {
        typeParams: input.typeParams,
        typeExpr: input.typeExpr,
    };
}
exports.makeTypeDef = makeTypeDef;
const TypeDef_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "typeParams", "default": { "kind": "nothing" }, "name": "typeParams", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] }] } }, { "annotations": [], "serializedName": "typeExpr", "default": { "kind": "nothing" }, "name": "typeExpr", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "TypeExpr" } }, "parameters": [] } }] } }, "name": "TypeDef", "version": { "kind": "nothing" } } };
exports.snTypeDef = { moduleName: "sys.adlast", name: "TypeDef" };
function texprTypeDef() {
    return { value: { typeRef: { kind: "reference", value: exports.snTypeDef }, parameters: [] } };
}
exports.texprTypeDef = texprTypeDef;
function makeNewType(input) {
    return {
        typeParams: input.typeParams,
        typeExpr: input.typeExpr,
        default: input.default,
    };
}
exports.makeNewType = makeNewType;
const NewType_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "typeParams", "default": { "kind": "nothing" }, "name": "typeParams", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] }] } }, { "annotations": [], "serializedName": "typeExpr", "default": { "kind": "nothing" }, "name": "typeExpr", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "TypeExpr" } }, "parameters": [] } }, { "annotations": [], "serializedName": "default", "default": { "kind": "nothing" }, "name": "default", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.types", "name": "Maybe" } }, "parameters": [{ "typeRef": { "kind": "primitive", "value": "Json" }, "parameters": [] }] } }] } }, "name": "NewType", "version": { "kind": "nothing" } } };
exports.snNewType = { moduleName: "sys.adlast", name: "NewType" };
function texprNewType() {
    return { value: { typeRef: { kind: "reference", value: exports.snNewType }, parameters: [] } };
}
exports.texprNewType = texprNewType;
const DeclType_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "struct_", "default": { "kind": "nothing" }, "name": "struct_", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Struct" } }, "parameters": [] } }, { "annotations": [], "serializedName": "union_", "default": { "kind": "nothing" }, "name": "union_", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Union" } }, "parameters": [] } }, { "annotations": [], "serializedName": "type_", "default": { "kind": "nothing" }, "name": "type_", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "TypeDef" } }, "parameters": [] } }, { "annotations": [], "serializedName": "newtype_", "default": { "kind": "nothing" }, "name": "newtype_", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "NewType" } }, "parameters": [] } }] } }, "name": "DeclType", "version": { "kind": "nothing" } } };
exports.snDeclType = { moduleName: "sys.adlast", name: "DeclType" };
function texprDeclType() {
    return { value: { typeRef: { kind: "reference", value: exports.snDeclType }, parameters: [] } };
}
exports.texprDeclType = texprDeclType;
function makeDecl(input) {
    return {
        name: input.name,
        version: input.version,
        type_: input.type_,
        annotations: input.annotations,
    };
}
exports.makeDecl = makeDecl;
const Decl_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "name", "default": { "kind": "nothing" }, "name": "name", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Ident" } }, "parameters": [] } }, { "annotations": [], "serializedName": "version", "default": { "kind": "nothing" }, "name": "version", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.types", "name": "Maybe" } }, "parameters": [{ "typeRef": { "kind": "primitive", "value": "Word32" }, "parameters": [] }] } }, { "annotations": [], "serializedName": "type_", "default": { "kind": "nothing" }, "name": "type_", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "DeclType" } }, "parameters": [] } }, { "annotations": [], "serializedName": "annotations", "default": { "kind": "nothing" }, "name": "annotations", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Annotations" } }, "parameters": [] } }] } }, "name": "Decl", "version": { "kind": "nothing" } } };
exports.snDecl = { moduleName: "sys.adlast", name: "Decl" };
function texprDecl() {
    return { value: { typeRef: { kind: "reference", value: exports.snDecl }, parameters: [] } };
}
exports.texprDecl = texprDecl;
function makeScopedDecl(input) {
    return {
        moduleName: input.moduleName,
        decl: input.decl,
    };
}
exports.makeScopedDecl = makeScopedDecl;
const ScopedDecl_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "moduleName", "default": { "kind": "nothing" }, "name": "moduleName", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ModuleName" } }, "parameters": [] } }, { "annotations": [], "serializedName": "decl", "default": { "kind": "nothing" }, "name": "decl", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Decl" } }, "parameters": [] } }] } }, "name": "ScopedDecl", "version": { "kind": "nothing" } } };
exports.snScopedDecl = { moduleName: "sys.adlast", name: "ScopedDecl" };
function texprScopedDecl() {
    return { value: { typeRef: { kind: "reference", value: exports.snScopedDecl }, parameters: [] } };
}
exports.texprScopedDecl = texprScopedDecl;
const DeclVersions_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "type_", "value": { "typeParams": [], "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Decl" } }, "parameters": [] }] } } }, "name": "DeclVersions", "version": { "kind": "nothing" } } };
exports.snDeclVersions = { moduleName: "sys.adlast", name: "DeclVersions" };
function texprDeclVersions() {
    return { value: { typeRef: { kind: "reference", value: exports.snDeclVersions }, parameters: [] } };
}
exports.texprDeclVersions = texprDeclVersions;
const Import_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "union_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "moduleName", "default": { "kind": "nothing" }, "name": "moduleName", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ModuleName" } }, "parameters": [] } }, { "annotations": [], "serializedName": "scopedName", "default": { "kind": "nothing" }, "name": "scopedName", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ScopedName" } }, "parameters": [] } }] } }, "name": "Import", "version": { "kind": "nothing" } } };
exports.snImport = { moduleName: "sys.adlast", name: "Import" };
function texprImport() {
    return { value: { typeRef: { kind: "reference", value: exports.snImport }, parameters: [] } };
}
exports.texprImport = texprImport;
function makeModule(input) {
    return {
        name: input.name,
        imports: input.imports,
        decls: input.decls,
        annotations: input.annotations,
    };
}
exports.makeModule = makeModule;
const Module_AST = { "moduleName": "sys.adlast", "decl": { "annotations": [], "type_": { "kind": "struct_", "value": { "typeParams": [], "fields": [{ "annotations": [], "serializedName": "name", "default": { "kind": "nothing" }, "name": "name", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "ModuleName" } }, "parameters": [] } }, { "annotations": [], "serializedName": "imports", "default": { "kind": "nothing" }, "name": "imports", "typeExpr": { "typeRef": { "kind": "primitive", "value": "Vector" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Import" } }, "parameters": [] }] } }, { "annotations": [], "serializedName": "decls", "default": { "kind": "nothing" }, "name": "decls", "typeExpr": { "typeRef": { "kind": "primitive", "value": "StringMap" }, "parameters": [{ "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Decl" } }, "parameters": [] }] } }, { "annotations": [], "serializedName": "annotations", "default": { "kind": "nothing" }, "name": "annotations", "typeExpr": { "typeRef": { "kind": "reference", "value": { "moduleName": "sys.adlast", "name": "Annotations" } }, "parameters": [] } }] } }, "name": "Module", "version": { "kind": "nothing" } } };
exports.snModule = { moduleName: "sys.adlast", name: "Module" };
function texprModule() {
    return { value: { typeRef: { kind: "reference", value: exports.snModule }, parameters: [] } };
}
exports.texprModule = texprModule;
exports._AST_MAP = {
    "sys.adlast.ModuleName": ModuleName_AST,
    "sys.adlast.Ident": Ident_AST,
    "sys.adlast.Annotations": Annotations_AST,
    "sys.adlast.ScopedName": ScopedName_AST,
    "sys.adlast.TypeRef": TypeRef_AST,
    "sys.adlast.TypeExpr": TypeExpr_AST,
    "sys.adlast.Field": Field_AST,
    "sys.adlast.Struct": Struct_AST,
    "sys.adlast.Union": Union_AST,
    "sys.adlast.TypeDef": TypeDef_AST,
    "sys.adlast.NewType": NewType_AST,
    "sys.adlast.DeclType": DeclType_AST,
    "sys.adlast.Decl": Decl_AST,
    "sys.adlast.ScopedDecl": ScopedDecl_AST,
    "sys.adlast.DeclVersions": DeclVersions_AST,
    "sys.adlast.Import": Import_AST,
    "sys.adlast.Module": Module_AST
};
//# sourceMappingURL=adlast.js.map