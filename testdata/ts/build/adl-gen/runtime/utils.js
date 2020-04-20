"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEnum(union) {
    for (let field of union.fields) {
        if (!isVoid(field.typeExpr)) {
            return false;
        }
    }
    return true;
}
exports.isEnum = isEnum;
function isVoid(texpr) {
    if (texpr.typeRef.kind === "primitive") {
        return texpr.typeRef.value === "Void";
    }
    return false;
}
exports.isVoid = isVoid;
function typeExprsEqual(texpr1, texpr2) {
    if (!typeRefsEqual(texpr1.typeRef, texpr2.typeRef)) {
        return false;
    }
    if (texpr1.parameters.length != texpr2.parameters.length) {
        return false;
    }
    for (let i = 0; i < texpr1.parameters.length; i++) {
        if (!typeExprsEqual(texpr1.parameters[i], texpr2.parameters[i])) {
            return false;
        }
    }
    return true;
}
exports.typeExprsEqual = typeExprsEqual;
function typeRefsEqual(tref1, tref2) {
    if (tref1.kind === "primitive" && tref2.kind === "primitive") {
        return tref1.value === tref2.value;
    }
    else if (tref1.kind === "typeParam" && tref2.kind === "typeParam") {
        return tref1.value === tref2.value;
    }
    else if (tref1.kind === "reference" && tref2.kind === "reference") {
        return scopedNamesEqual(tref1.value, tref2.value);
    }
    return false;
}
exports.typeRefsEqual = typeRefsEqual;
function scopedNamesEqual(sn1, sn2) {
    return sn1.moduleName === sn2.moduleName && sn1.name === sn2.name;
}
exports.scopedNamesEqual = scopedNamesEqual;
function typeExprToStringImpl(te, withScopedNames) {
    let result = "";
    if (te.typeRef.kind == "primitive") {
        result = te.typeRef.value;
    }
    else if (te.typeRef.kind == "typeParam") {
        result = te.typeRef.value;
    }
    else if (te.typeRef.kind == "reference") {
        result = withScopedNames
            ? te.typeRef.value.moduleName + "." + te.typeRef.value.name
            : te.typeRef.value.name;
    }
    if (te.parameters.length > 0) {
        result = result + "<" + te.parameters.map(p => typeExprToStringImpl(p, withScopedNames)) + ">";
    }
    return result;
}
/* Convert a type expression to a string, with fully scoped names */
function typeExprToString(te) {
    return typeExprToStringImpl(te, true);
}
exports.typeExprToString = typeExprToString;
/* Convert a type expression to a string, with unscoped names */
function typeExprToStringUnscoped(te) {
    return typeExprToStringImpl(te, false);
}
exports.typeExprToStringUnscoped = typeExprToStringUnscoped;
//# sourceMappingURL=utils.js.map