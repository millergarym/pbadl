"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./adl-gen/runtime/json");
const resolver_1 = require("./adl-gen/resolver");
const testunion_1 = require("./adl-gen/phadl/testunion");
const util_1 = require("util");
const testVals = [
    {
        msg: "kind A string",
        val: { kind: "A", value: "str" }
    },
    {
        msg: "kind X int",
        val: { kind: "X", value: 1 },
    },
    {
        msg: "kind Z void",
        val: { kind: "Z" },
    },
    {
        msg: "kind X max int",
        val: { kind: "X", value: Number.MAX_SAFE_INTEGER },
    },
    {
        msg: "kind X max neg int",
        val: { kind: "X", value: Number.MIN_SAFE_INTEGER },
    },
];
function configureCli(program) {
    program
        .command("emmitjson")
        .description('Emmit json for testing')
        .action((cmd) => {
        const jb = json_1.createJsonBinding(resolver_1.RESOLVER, testunion_1.texprADLSumType());
        const a = jb.toJson({
            kind: "A",
            value: "str",
        });
        process.stdout.write(JSON.stringify(a));
    });
}
exports.configureCli = configureCli;
function configureConsumeCli(program) {
    program
        .command("consumejson")
        .description('consume json for testing')
        .action((cmd) => {
        const jb = json_1.createJsonBinding(resolver_1.RESOLVER, testunion_1.texprADLSumType());
        var stdin = process.openStdin();
        stdin.addListener("data", function (d) {
            try {
                const obj = jb.fromJson(JSON.parse(d));
            }
            catch (error) {
                console.error(error.toString());
                process.exit(1);
            }
        });
    });
}
exports.configureConsumeCli = configureConsumeCli;
function configureEmmitOrConsumeCli(program) {
    program
        .command("eorc")
        .option('-C, --count', 'print number of tests')
        .option('-U, --unmarshall', 'consume, default is marshal (aka emmit)')
        .option('-N, --index <testvals index>', 'index of test 0 - ' + (testVals.length - 1), 0)
        .description('json for testing')
        .action((cmd) => {
        if (cmd['count']) {
            process.stdout.write(testVals.length + "");
            return;
        }
        const idx = Number.parseInt(cmd['index']) - 1;
        const testVal = testVals[idx];
        const jb = json_1.createJsonBinding(resolver_1.RESOLVER, testunion_1.texprADLSumType());
        if (cmd['unmarshall']) {
            var stdin = process.openStdin();
            stdin.addListener("data", function (d) {
                try {
                    const obj = jb.fromJson(JSON.parse(d));
                    if (!util_1.isDeepStrictEqual(obj, testVal.val)) {
                        console.error("expect vs received", testVal.val, obj);
                        process.exit(1);
                    }
                }
                catch (error) {
                    console.error(error.toString());
                    process.exit(1);
                }
            });
        }
        else {
            if (testVal.msg) {
                process.stderr.write(testVal.msg);
            }
            const a = jb.toJson(testVal.val);
            process.stdout.write(JSON.stringify(a));
        }
    });
}
exports.configureEmmitOrConsumeCli = configureEmmitOrConsumeCli;
function configureRoundTripCli(program) {
    program
        .command("roundtrip")
        .description('json for testing')
        .action((cmd) => {
        const jb = json_1.createJsonBinding(resolver_1.RESOLVER, testunion_1.texprADLSumType());
        var stdin = process.openStdin();
        stdin.addListener("data", function (d) {
            try {
                const obj = jb.fromJson(JSON.parse(d));
                const a = jb.toJson(obj);
                process.stdout.write(JSON.stringify(a));
            }
            catch (error) {
                console.error(error.toString());
                process.exit(1);
            }
        });
    });
}
exports.configureRoundTripCli = configureRoundTripCli;
function configureRoundTripTExprCli(program) {
    program
        .command("roundtriptexpr <moduleName> <name>")
        .option('--moduleName', 'module name')
        .option('--name', 'struct or union name')
        .description('json for testing')
        .action((moduleName, name, cmd) => {
        const texpr = {
            value: {
                typeRef: {
                    kind: "reference",
                    value: {
                        moduleName: moduleName,
                        name: name,
                    },
                },
                parameters: []
            }
        };
        const jb = json_1.createJsonBinding(resolver_1.RESOLVER, texpr);
        var stdin = process.openStdin();
        stdin.addListener("data", function (d) {
            try {
                const obj = jb.fromJson(JSON.parse(d));
                const a = jb.toJson(obj);
                process.stdout.write(JSON.stringify(a));
            }
            catch (error) {
                console.error(error.toString());
                process.exit(1);
            }
        });
    });
}
exports.configureRoundTripTExprCli = configureRoundTripTExprCli;
function configureArrayRoundTripCli(program) {
    program
        .command("array_roundtrip")
        .description('json for testing')
        .action((cmd) => {
        const jb = json_1.createJsonBinding(resolver_1.RESOLVER, testunion_1.texprADLSumType());
        var stdin = process.openStdin();
        stdin.addListener("data", function (d) {
            let tests = [];
            try {
                tests = JSON.parse(d);
            }
            catch (error) {
                console.error("json parse error", error.toString());
                process.exit(1);
            }
            let results = [];
            tests.forEach((element) => {
                try {
                    const obj = jb.fromJson(element);
                    const a = jb.toJson(obj);
                    results.push(a);
                }
                catch (error) {
                    results.push({ error: error.toString() });
                }
            });
            process.stdout.write(JSON.stringify(results));
        });
    });
}
exports.configureArrayRoundTripCli = configureArrayRoundTripCli;
//# sourceMappingURL=emitjson.js.map