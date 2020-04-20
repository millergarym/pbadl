"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./adl-gen/runtime/json");
const resolver_1 = require("./adl-gen/resolver");
function configure(program) {
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
exports.configure = configure;
//# sourceMappingURL=roundtripexpr.js.map