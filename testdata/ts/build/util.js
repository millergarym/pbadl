"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const adlast = __importStar(require("./adl-gen/sys/adlast"));
const resolver_1 = require("./adl-gen/resolver");
const json_1 = require("./adl-gen/runtime/json");
const adl = __importStar(require("./adl-gen/runtime/adl"));
const utils_1 = require("./adl-gen/runtime/utils");
const tmp = __importStar(require("tmp"));
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const util_1 = require("util");
;
/**
 * Load and parse the specified ADL files (and their dependencies) into
 * an adlast map.
 *
 * Runs the adl compiler as a subprocess, using the environment variable ADLC to
 * specify the path.
 */
async function parseAdl(adlFiles, adlSearchPath) {
    const moduleMapJB = json_1.createJsonBinding(resolver_1.RESOLVER, adl.texprStringMap(adlast.texprModule()));
    // Work in a temporary directory
    const workdir = await tmpDirP();
    // run the ADL ast parser, outputing to a temporary file
    const outfile = workdir.name + "/output.json";
    const adlc = process.env.ADLC || "/usr/local/bin/adlc";
    let args = ["ast", `--combined-output=${outfile}`];
    for (const dir of adlSearchPath) {
        args = args.concat(['-I', dir]);
    }
    args = args.concat(adlFiles);
    try {
        await execFileP(adlc, args, {});
    }
    catch (e) {
        console.log("adl compiler failed:");
        console.log(e.stdout);
        console.log(e.stderr);
        throw e;
    }
    // Parse the module map json
    const jv = JSON.parse(await readFileP(outfile, 'utf8'));
    const modules = moduleMapJB.fromJsonE(jv);
    resolveRelativeModuleRefs(modules);
    // Build the resolver
    const allAdlDecls = {};
    forEachDecl(modules, scopedDecl => {
        allAdlDecls[scopedDecl.moduleName + "." + scopedDecl.decl.name] = scopedDecl;
    });
    const resolver = adl.declResolver(allAdlDecls);
    // Cleanup
    await unlinkP(outfile);
    workdir.removeCallback();
    return { allAdlDecls, modules, resolver };
}
exports.parseAdl = parseAdl;
const execFileP = util_1.promisify(child_process_1.execFile);
const readFileP = util_1.promisify(fs.readFile);
const unlinkP = util_1.promisify(fs.unlink);
function tmpDirP() {
    return new Promise((resolve, reject) => {
        tmp.dir({}, (err, name, removeCallback) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ name, removeCallback });
            }
        });
    });
}
/**
 *  Convert module relative scoped names into absolute scoped namees
 */
function resolveRelativeModuleRefs(moduleMap) {
    forEachDecl(moduleMap, (sdecl) => {
        function resolve(typeExpr) {
            if (typeExpr.typeRef.kind == 'reference' && typeExpr.typeRef.value.moduleName == '') {
                typeExpr.typeRef.value.moduleName = sdecl.moduleName;
            }
            typeExpr.parameters.forEach(p => resolve(p));
        }
        const dtype = sdecl.decl.type_;
        switch (dtype.kind) {
            case 'newtype_':
                resolve(dtype.value.typeExpr);
                break;
            case 'struct_':
                dtype.value.fields.forEach(f => resolve(f.typeExpr));
                break;
            case 'union_':
                dtype.value.fields.forEach(f => resolve(f.typeExpr));
                break;
            case 'type_':
                resolve(dtype.value.typeExpr);
                break;
        }
    });
}
exports.resolveRelativeModuleRefs = resolveRelativeModuleRefs;
function substituteTypeVariable(typeExpr, tparam, tvalue) {
    if (typeExpr.typeRef.kind == 'typeParam' && typeExpr.typeRef.value == tparam && typeExpr.parameters.length == 0) {
        return tvalue;
    }
    return {
        typeRef: typeExpr.typeRef,
        parameters: typeExpr.parameters.map(p => substituteTypeVariable(p, tparam, tvalue))
    };
}
exports.substituteTypeVariable = substituteTypeVariable;
function substituteTypeVariables(typeExpr0, tparams, tvalues) {
    let typeExpr = typeExpr0;
    for (let i = 0; i < tparams.length; i++) {
        typeExpr = substituteTypeVariable(typeExpr, tparams[0], tvalues[0]);
    }
    return typeExpr;
}
exports.substituteTypeVariables = substituteTypeVariables;
function expandTypeAlias(resolver, typeExpr) {
    if (typeExpr.typeRef.kind == 'reference') {
        const sdecl = resolver(typeExpr.typeRef.value);
        const dtype = sdecl.decl.type_;
        if (dtype.kind == 'type_') {
            const tparams = dtype.value.typeParams;
            const tvalues = typeExpr.parameters;
            return substituteTypeVariables(dtype.value.typeExpr, tparams, tvalues);
        }
    }
    return null;
}
exports.expandTypeAlias = expandTypeAlias;
function expandNewType(resolver, typeExpr) {
    if (typeExpr.typeRef.kind == 'reference') {
        const sdecl = resolver(typeExpr.typeRef.value);
        const dtype = sdecl.decl.type_;
        if (dtype.kind == 'newtype_') {
            const tparams = dtype.value.typeParams;
            const tvalues = typeExpr.parameters;
            return substituteTypeVariables(dtype.value.typeExpr, tparams, tvalues);
        }
    }
    return null;
}
exports.expandNewType = expandNewType;
/**
 * Recursively xpand type aliases and/or newtypes by substitution
 */
function expandTypes(resolver, typeExpr, options) {
    switch (typeExpr.typeRef.kind) {
        case "primitive":
            break;
        case "reference":
            let texpr2 = null;
            if (options.expandTypeAliases) {
                texpr2 = texpr2 || expandTypeAlias(resolver, typeExpr);
            }
            if (options.expandNewType) {
                texpr2 = texpr2 || expandNewType(resolver, typeExpr);
            }
            if (texpr2) {
                return expandTypes(resolver, texpr2, options);
            }
            break;
        case "typeParam":
            break;
    }
    return typeExpr;
}
exports.expandTypes = expandTypes;
;
/**
 * Execute the given function for each ADL declaration
 */
function forEachDecl(moduleMap, fn) {
    for (const moduleName of Object.keys(moduleMap)) {
        const module = moduleMap[moduleName];
        for (const declName of Object.keys(module.decls)) {
            const decl = module.decls[declName];
            fn({ moduleName, decl });
        }
    }
}
exports.forEachDecl = forEachDecl;
/**
 * Ensure that the given declaration is monomorphic.
 *
 * If it already is, just return it. Otherwise construct a new ScopedDecl
 * that has all type parameters substituted.
 */
function monomorphicDecl(typeExpr, declName, namer, resolver) {
    const decl = resolver(declName);
    // If the type is already monomorphic, just return it
    if (typeExpr.parameters.length == 0) {
        return decl;
    }
    // Otherwise build a monomorphised decl
    const type_ = (() => {
        switch (decl.decl.type_.kind) {
            case 'type_': return {
                kind: decl.decl.type_.kind,
                value: {
                    typeParams: [],
                    typeExpr: substituteTypeVariables(decl.decl.type_.value.typeExpr, decl.decl.type_.value.typeParams, typeExpr.parameters),
                },
            };
            case 'newtype_': return {
                kind: decl.decl.type_.kind,
                value: {
                    typeParams: [],
                    typeExpr: substituteTypeVariables(decl.decl.type_.value.typeExpr, decl.decl.type_.value.typeParams, typeExpr.parameters),
                    default: decl.decl.type_.value.default,
                },
            };
            case 'struct_': return {
                kind: decl.decl.type_.kind,
                value: {
                    typeParams: [],
                    fields: decl.decl.type_.value.fields.map(f => ({
                        name: f.name,
                        serializedName: f.serializedName,
                        typeExpr: substituteTypeVariables(f.typeExpr, decl.decl.type_.value.typeParams, typeExpr.parameters),
                        default: f.default,
                        annotations: f.annotations
                    })),
                },
            };
            case 'union_': return {
                kind: decl.decl.type_.kind,
                value: {
                    typeParams: [],
                    fields: decl.decl.type_.value.fields.map(f => ({
                        name: f.name,
                        serializedName: f.serializedName,
                        typeExpr: substituteTypeVariables(f.typeExpr, decl.decl.type_.value.typeParams, typeExpr.parameters),
                        default: f.default,
                        annotations: f.annotations
                    })),
                },
            };
        }
    })();
    return {
        moduleName: decl.moduleName,
        decl: {
            name: namer(decl.decl.name, typeExpr.parameters),
            version: decl.decl.version,
            annotations: decl.decl.annotations,
            type_,
        }
    };
}
exports.monomorphicDecl = monomorphicDecl;
/**
 * A default monomorphic namer that is just the type expression converted to a string
 */
function monomorphicName(declName, typeParams) {
    if (typeParams.length == 0) {
        return declName;
    }
    return declName + "<" + typeParams.map(te => utils_1.typeExprToString(te)).join(",") + ">";
}
exports.monomorphicName = monomorphicName;
/**
 * Return the json value for the given annotation type for the given decl. Return undefined if the
 * decl doesn't have that annotation
 */
function getAnnotation(annotations, annotationType) {
    for (const ann of annotations) {
        if (scopedNamesEqual(ann.v1, annotationType)) {
            return ann.v2;
        }
    }
    return undefined;
}
exports.getAnnotation = getAnnotation;
function getStringAnnotation(annotations, atype) {
    const ann = getAnnotation(annotations, atype);
    return ann && typeof ann === "string" ? ann : undefined;
}
exports.getStringAnnotation = getStringAnnotation;
function getNumberAnnotation(annotations, atype) {
    const ann = getAnnotation(annotations, atype);
    return ann && typeof ann === "number" ? ann : undefined;
}
exports.getNumberAnnotation = getNumberAnnotation;
function getBooleanAnnotation(annotations, atype) {
    const ann = getAnnotation(annotations, atype);
    return ann && typeof ann === "boolean" ? ann : undefined;
}
exports.getBooleanAnnotation = getBooleanAnnotation;
function hasAnnotation(annotations, atype) {
    return getAnnotation(annotations, atype) != undefined;
}
exports.hasAnnotation = hasAnnotation;
function decodeTypeExpr(typeExpr) {
    switch (typeExpr.typeRef.kind) {
        case 'primitive':
            const primitive = typeExpr.typeRef.value;
            switch (primitive) {
                case "Void": return { kind: primitive };
                case "String": return { kind: primitive };
                case "Bool": return { kind: primitive };
                case "Json": return { kind: primitive };
                case "Int8": return { kind: primitive };
                case "Int16": return { kind: primitive };
                case "Int32": return { kind: primitive };
                case "Int64": return { kind: primitive };
                case "Word8": return { kind: primitive };
                case "Word16": return { kind: primitive };
                case "Word32": return { kind: primitive };
                case "Word64": return { kind: primitive };
                case "Float": return { kind: primitive };
                case "Double": return { kind: primitive };
                case "Vector": return { kind: "Vector", elemType: decodeTypeExpr(typeExpr.parameters[0]) };
                case "StringMap": return { kind: "StringMap", elemType: decodeTypeExpr(typeExpr.parameters[0]) };
                case "Nullable": return { kind: "Nullable", elemType: decodeTypeExpr(typeExpr.parameters[0]) };
            }
            break;
        case 'reference':
            return { kind: "Reference", refScopedName: typeExpr.typeRef.value, parameters: typeExpr.parameters.map(decodeTypeExpr) };
    }
    return { kind: "Other", typeExpr };
}
exports.decodeTypeExpr = decodeTypeExpr;
function scopedNameFromString(s) {
    const ss = s.split(/\./);
    return {
        moduleName: ss.slice(0, ss.length - 1).join('.'),
        name: ss[ss.length - 1]
    };
}
exports.scopedNameFromString = scopedNameFromString;
function scopedName(moduleName, name) {
    return { moduleName, name };
}
exports.scopedName = scopedName;
function scopedNamesEqual(n1, n2) {
    return n1.moduleName == n2.moduleName && n1.name == n2.name;
}
exports.scopedNamesEqual = scopedNamesEqual;
/**
 * Helper for command line processing
 */
function collect(val, memo) {
    memo.push(val);
    return memo;
}
exports.collect = collect;
async function execHxAdlHs(args) {
    const hxadlhs = process.env.HXADLHS || "/usr/local/bin/hx-adl-hs";
    try {
        await execFileP(hxadlhs, args, {});
    }
    catch (e) {
        console.log("adl compiler failed:");
        console.log(e.stdout);
        console.log(e.stderr);
        throw e;
    }
}
exports.execHxAdlHs = execHxAdlHs;
//# sourceMappingURL=util.js.map