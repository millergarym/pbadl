"use strict";
/* @generated from adl module sys.adlast */
Object.defineProperty(exports, "__esModule", { value: true });
function makeScopedName(input) {
    return {
        moduleName: input.moduleName,
        name: input.name,
    };
}
exports.makeScopedName = makeScopedName;
function makeTypeExpr(input) {
    return {
        typeRef: input.typeRef,
        parameters: input.parameters,
    };
}
exports.makeTypeExpr = makeTypeExpr;
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
function makeStruct(input) {
    return {
        typeParams: input.typeParams,
        fields: input.fields,
    };
}
exports.makeStruct = makeStruct;
function makeUnion(input) {
    return {
        typeParams: input.typeParams,
        fields: input.fields,
    };
}
exports.makeUnion = makeUnion;
function makeTypeDef(input) {
    return {
        typeParams: input.typeParams,
        typeExpr: input.typeExpr,
    };
}
exports.makeTypeDef = makeTypeDef;
function makeNewType(input) {
    return {
        typeParams: input.typeParams,
        typeExpr: input.typeExpr,
        default: input.default,
    };
}
exports.makeNewType = makeNewType;
function makeDecl(input) {
    return {
        name: input.name,
        version: input.version,
        type_: input.type_,
        annotations: input.annotations,
    };
}
exports.makeDecl = makeDecl;
function makeScopedDecl(input) {
    return {
        moduleName: input.moduleName,
        decl: input.decl,
    };
}
exports.makeScopedDecl = makeScopedDecl;
function makeModule(input) {
    return {
        name: input.name,
        imports: input.imports,
        decls: input.decls,
        annotations: input.annotations,
    };
}
exports.makeModule = makeModule;
//# sourceMappingURL=adlast.js.map