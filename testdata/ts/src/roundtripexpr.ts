import { ATypeExpr } from "./adl-gen/runtime/adl";
import { createJsonBinding } from "./adl-gen/runtime/json";
import { Command } from "commander";
import { RESOLVER } from './adl-gen/resolver';

export function configure(program: Command) {
  program
    .command("roundtriptexpr <moduleName> <name>")
    .option('--moduleName', 'module name')
    .option('--name', 'struct or union name')
    .description('json for testing')
    .action((moduleName, name, cmd: {}) => {
      const texpr: ATypeExpr<unknown> = {
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
      }
      const jb = createJsonBinding(RESOLVER, texpr);
      var stdin = process.openStdin();
      stdin.addListener("data", function (d) {
        try {
          const obj = jb.fromJson(JSON.parse(d));
          const a = jb.toJson(obj);
          process.stdout.write(JSON.stringify(a));
        } catch (error) {
          console.error(error.toString());
          process.exit(1)
        }
      });

    });
}

