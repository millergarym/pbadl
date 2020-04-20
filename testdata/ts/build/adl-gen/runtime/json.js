"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const b64 = __importStar(require("base64-js"));
const utils_1 = require("./utils");
;
/**
 * Construct a JsonBinding for an arbitrary type expression
 */
function createJsonBinding(dresolver, texpr) {
    const jb0 = buildJsonBinding(dresolver, texpr.value, {});
    function fromJsonE(json) {
        try {
            return jb0.fromJson(json);
        }
        catch (e) {
            throw mapJsonException(e);
        }
    }
    return { typeExpr: texpr.value, toJson: jb0.toJson, fromJson: jb0.fromJson, fromJsonE };
}
exports.createJsonBinding = createJsonBinding;
;
// Map a JsonException to an Error value
function mapJsonException(exception) {
    if (exception && exception['kind'] == "JsonParseException") {
        const jserr = exception;
        return new Error(jserr.getMessage());
    }
    else {
        return exception;
    }
}
exports.mapJsonException = mapJsonException;
/** Convenience function for generating a json parse exception.
 *  @param {string} message - Exception message.
 */
function jsonParseException(message) {
    const context = [];
    let createContextString = () => {
        const rcontext = context.slice(0);
        rcontext.push('$');
        rcontext.reverse();
        return rcontext.join('.');
    };
    return {
        kind: 'JsonParseException',
        getMessage() {
            return message + ' at ' + createContextString();
        },
        pushField(fieldName) {
            context.push(fieldName);
        },
        pushIndex(index) {
            context.push('[' + index + ']');
        },
        toString() {
            return this.getMessage();
        }
    };
}
exports.jsonParseException = jsonParseException;
/**
 * Check if a javascript error is of the json parse exception type.
 * @param exception The exception to check.
 */
function isJsonParseException(exception) {
    return exception.kind === 'JsonParseException';
}
exports.isJsonParseException = isJsonParseException;
;
function buildJsonBinding(dresolver, texpr, boundTypeParams) {
    if (texpr.typeRef.kind === "primitive") {
        return primitiveJsonBinding(dresolver, texpr.typeRef.value, texpr.parameters, boundTypeParams);
    }
    else if (texpr.typeRef.kind === "reference") {
        const ast = dresolver(texpr.typeRef.value);
        if (ast.decl.type_.kind === "struct_") {
            return structJsonBinding(dresolver, ast.decl.type_.value, texpr.parameters, boundTypeParams);
        }
        else if (ast.decl.type_.kind === "union_") {
            const union = ast.decl.type_.value;
            if (utils_1.isEnum(union)) {
                return enumJsonBinding(dresolver, union, texpr.parameters, boundTypeParams);
            }
            else {
                return unionJsonBinding(dresolver, union, texpr.parameters, boundTypeParams);
            }
        }
        else if (ast.decl.type_.kind === "newtype_") {
            return newtypeJsonBinding(dresolver, ast.decl.type_.value, texpr.parameters, boundTypeParams);
        }
        else if (ast.decl.type_.kind === "type_") {
            return typedefJsonBinding(dresolver, ast.decl.type_.value, texpr.parameters, boundTypeParams);
        }
    }
    else if (texpr.typeRef.kind === "typeParam") {
        return boundTypeParams[texpr.typeRef.value];
    }
    throw new Error("buildJsonBinding : unimplemented ADL type");
}
;
function primitiveJsonBinding(dresolver, ptype, params, boundTypeParams) {
    if (ptype === "String") {
        return identityJsonBinding("a string", (v) => typeof (v) === 'string');
    }
    else if (ptype === "Int8") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Void") {
        return identityJsonBinding("a null", (v) => v === null);
    }
    else if (ptype === "Bool") {
        return identityJsonBinding("a bool", (v) => typeof (v) === 'boolean');
    }
    else if (ptype === "Int8") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Int16") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Int32") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Int64") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Word8") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Word16") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Word32") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Word64") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Float") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Double") {
        return identityJsonBinding("a number", (v) => typeof (v) === 'number');
    }
    else if (ptype === "Json") {
        return identityJsonBinding("a json value", (_v) => true);
    }
    else if (ptype === "Bytes") {
        return bytesJsonBinding();
    }
    else if (ptype === "Vector") {
        return vectorJsonBinding(dresolver, params[0], boundTypeParams);
    }
    else if (ptype === "StringMap") {
        return stringMapJsonBinding(dresolver, params[0], boundTypeParams);
    }
    else if (ptype === "Nullable") {
        return nullableJsonBinding(dresolver, params[0], boundTypeParams);
    }
    else
        throw new Error("Unimplemented json binding for primitive " + ptype);
}
;
function identityJsonBinding(expected, predicate) {
    function toJson(v) {
        return v;
    }
    function fromJson(json) {
        if (!predicate(json)) {
            throw jsonParseException("expected " + expected);
        }
        return json;
    }
    return { toJson, fromJson };
}
function bytesJsonBinding() {
    function toJson(v) {
        return b64.fromByteArray(v);
    }
    function fromJson(json) {
        if (typeof (json) != 'string') {
            throw jsonParseException('expected a string');
        }
        return b64.toByteArray(json);
    }
    return { toJson, fromJson };
}
function vectorJsonBinding(dresolver, texpr, boundTypeParams) {
    const elementBinding = once(() => buildJsonBinding(dresolver, texpr, boundTypeParams));
    function toJson(v) {
        return v.map(elementBinding().toJson);
    }
    function fromJson(json) {
        if (!(json instanceof Array)) {
            throw jsonParseException('expected an array');
        }
        let result = [];
        json.forEach((eljson, i) => {
            try {
                result.push(elementBinding().fromJson(eljson));
            }
            catch (e) {
                if (isJsonParseException(e)) {
                    e.pushIndex(i);
                }
                throw e;
            }
        });
        return result;
    }
    return { toJson, fromJson };
}
function stringMapJsonBinding(dresolver, texpr, boundTypeParams) {
    const elementBinding = once(() => buildJsonBinding(dresolver, texpr, boundTypeParams));
    function toJson(v) {
        const result = {};
        for (let k in v) {
            result[k] = elementBinding().toJson(v[k]);
        }
        return result;
    }
    function fromJson(json) {
        if (!(json instanceof Object)) {
            throw jsonParseException('expected an object');
        }
        let result = {};
        for (let k in json) {
            try {
                result[k] = elementBinding().fromJson(json[k]);
            }
            catch (e) {
                if (isJsonParseException(e)) {
                    e.pushField(k);
                }
            }
        }
        return result;
    }
    return { toJson, fromJson };
}
function nullableJsonBinding(dresolver, texpr, boundTypeParams) {
    const elementBinding = once(() => buildJsonBinding(dresolver, texpr, boundTypeParams));
    function toJson(v) {
        if (v === null) {
            return null;
        }
        return elementBinding().toJson(v);
    }
    function fromJson(json) {
        if (json === null) {
            return null;
        }
        return elementBinding().fromJson(json);
    }
    return { toJson, fromJson };
}
;
function structJsonBinding(dresolver, struct, params, boundTypeParams) {
    const newBoundTypeParams = createBoundTypeParams(dresolver, struct.typeParams, params, boundTypeParams);
    const fieldDetails = [];
    struct.fields.forEach((field) => {
        let buildDefault = once(() => {
            if (field.default.kind === "just") {
                const json = field.default.value;
                return { 'value': buildJsonBinding(dresolver, field.typeExpr, newBoundTypeParams).fromJson(json) };
            }
            else {
                return null;
            }
        });
        fieldDetails.push({
            field: field,
            jsonBinding: once(() => buildJsonBinding(dresolver, field.typeExpr, newBoundTypeParams)),
            buildDefault: buildDefault,
        });
    });
    function toJson(v) {
        const json = {};
        fieldDetails.forEach((fd) => {
            json[fd.field.serializedName] = fd.jsonBinding().toJson(v && v[fd.field.name]);
        });
        return json;
    }
    function fromJson(json) {
        if (!(json instanceof Object)) {
            throw jsonParseException("expected an object");
        }
        const v = {};
        fieldDetails.forEach((fd) => {
            if (json[fd.field.serializedName] === undefined) {
                const defaultv = fd.buildDefault();
                if (defaultv === null) {
                    throw jsonParseException("missing struct field " + fd.field.serializedName);
                }
                else {
                    v[fd.field.name] = defaultv.value;
                }
            }
            else {
                try {
                    v[fd.field.name] = fd.jsonBinding().fromJson(json[fd.field.serializedName]);
                }
                catch (e) {
                    if (isJsonParseException(e)) {
                        e.pushField(fd.field.serializedName);
                    }
                    throw e;
                }
            }
        });
        return v;
    }
    return { toJson, fromJson };
}
function enumJsonBinding(_dresolver, union, _params, _boundTypeParams) {
    const fieldSerializedNames = [];
    const fieldNumbers = {};
    union.fields.forEach((field, i) => {
        fieldSerializedNames.push(field.serializedName);
        fieldNumbers[field.serializedName] = i;
    });
    function toJson(v) {
        return fieldSerializedNames[v];
    }
    function fromJson(json) {
        if (typeof (json) !== 'string') {
            throw jsonParseException("expected a string for enum");
        }
        const result = fieldNumbers[json];
        if (result === undefined) {
            throw jsonParseException("invalid string for enum: " + json);
        }
        return result;
    }
    return { toJson, fromJson };
}
function unionJsonBinding(dresolver, union, params, boundTypeParams) {
    const newBoundTypeParams = createBoundTypeParams(dresolver, union.typeParams, params, boundTypeParams);
    const detailsByName = {};
    const detailsBySerializedName = {};
    union.fields.forEach((field) => {
        const details = {
            field: field,
            isVoid: utils_1.isVoid(field.typeExpr),
            jsonBinding: once(() => buildJsonBinding(dresolver, field.typeExpr, newBoundTypeParams))
        };
        detailsByName[field.name] = details;
        detailsBySerializedName[field.serializedName] = details;
    });
    function toJson(v0) {
        const v = v0;
        const details = detailsByName[v.kind];
        if (details.isVoid) {
            return details.field.serializedName;
        }
        else {
            const result = {};
            result[details.field.serializedName] = details.jsonBinding().toJson(v.value);
            return result;
        }
    }
    function lookupDetails(serializedName) {
        let details = detailsBySerializedName[serializedName];
        if (details === undefined) {
            throw jsonParseException("invalid union field " + serializedName);
        }
        return details;
    }
    function fromJson(json) {
        if (typeof (json) === "string") {
            let details = lookupDetails(json);
            if (!details.isVoid) {
                throw jsonParseException("union field " + json + "needs an associated value");
            }
            return { kind: details.field.name };
        }
        else if (json instanceof Object) {
            for (let k in json) {
                let details = lookupDetails(k);
                try {
                    return {
                        kind: details.field.name,
                        value: details.jsonBinding().fromJson(json[k])
                    };
                }
                catch (e) {
                    if (isJsonParseException(e)) {
                        e.pushField(k);
                    }
                    throw e;
                }
            }
            throw jsonParseException("union without a property");
        }
        else {
            throw jsonParseException("expected an object or string");
        }
    }
    return { toJson, fromJson };
}
function newtypeJsonBinding(dresolver, newtype, params, boundTypeParams) {
    const newBoundTypeParams = createBoundTypeParams(dresolver, newtype.typeParams, params, boundTypeParams);
    return buildJsonBinding(dresolver, newtype.typeExpr, newBoundTypeParams);
}
function typedefJsonBinding(dresolver, typedef, params, boundTypeParams) {
    const newBoundTypeParams = createBoundTypeParams(dresolver, typedef.typeParams, params, boundTypeParams);
    return buildJsonBinding(dresolver, typedef.typeExpr, newBoundTypeParams);
}
function createBoundTypeParams(dresolver, paramNames, paramTypes, boundTypeParams) {
    let result = {};
    paramNames.forEach((paramName, i) => {
        result[paramName] = buildJsonBinding(dresolver, paramTypes[i], boundTypeParams);
    });
    return result;
}
/**
 * Helper function that takes a thunk, and evaluates it only on the first call. Subsequent
 * calls return the previous value
 */
function once(run) {
    let result = null;
    return () => {
        if (result === null) {
            result = run();
        }
        return result;
    };
}
/**
 * Get the value of an annotation of type T
 */
function getAnnotation(jb, annotations) {
    if (jb.typeExpr.typeRef.kind != 'reference') {
        return undefined;
    }
    const annScopedName = jb.typeExpr.typeRef.value;
    const ann = annotations.find(el => utils_1.scopedNamesEqual(el.v1, annScopedName));
    if (ann === undefined) {
        return undefined;
    }
    return jb.fromJsonE(ann.v2);
}
exports.getAnnotation = getAnnotation;
//# sourceMappingURL=json.js.map