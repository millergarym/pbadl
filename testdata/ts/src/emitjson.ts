import * as adlast from './adl-gen/sys/adlast';
import * as adl from "./adl-gen/runtime/adl";
import { createJsonBinding } from "./adl-gen/runtime/json";
import { collect, scopedName, scopedNamesEqual, expandTypes, expandNewType, expandTypeAlias, parseAdl, forEachDecl, getAnnotation, decodeTypeExpr, LoadedAdl } from "./util";
import * as fs from "fs";
import * as mustache from "mustache";
import { isEnum, typeExprToStringUnscoped } from './adl-gen/runtime/utils';
import { Command } from "commander";
import { snakeCase } from "change-case";
import { RESOLVER } from './adl-gen/resolver';
import { texprADLSumType, ADLSumType } from './adl-gen/phadl/testunion';
import { deepEqual } from 'assert';
import { isDeepStrictEqual } from 'util';

interface TestVal<T> {
  val: T,
  msg?: string,
  err?: boolean;
}

const testVals: TestVal<ADLSumType>[] = [
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
    // val: { kind: "X", value: 9223372036854775807 },
    //  9223372036854776000
  },
  {
    msg: "kind X max neg int",
    val: { kind: "X", value: Number.MIN_SAFE_INTEGER },
    // val: { kind: "X", value: -9223372036854775808 },
  },
];

export function configureCli(program: Command) {
  program
    .command("emmitjson")
    .description('Emmit json for testing')
    .action((cmd: {}) => {
      const jb = createJsonBinding(RESOLVER, texprADLSumType());
      const a = jb.toJson({
        kind: "A",
        value: "str",
      });
      process.stdout.write(JSON.stringify(a));
    });
}

export function configureConsumeCli(program: Command) {
  program
    .command("consumejson")
    .description('consume json for testing')
    .action((cmd: {}) => {
      const jb = createJsonBinding(RESOLVER, texprADLSumType());
      var stdin = process.openStdin();
      stdin.addListener("data", function (d) {
        try {
          const obj = jb.fromJson(JSON.parse(d));
        } catch (error) {
          console.error(error.toString());
          process.exit(1)
        }
      });
    });
}


export function configureEmmitOrConsumeCli(program: Command) {
  program
    .command("eorc")
    .option('-C, --count', 'print number of tests')
    .option('-U, --unmarshall', 'consume, default is marshal (aka emmit)')
    .option('-N, --index <testvals index>', 'index of test 0 - ' + (testVals.length - 1), 0)
    .description('json for testing')
    .action((cmd: {}) => {
      if (cmd['count']) {
        process.stdout.write(testVals.length + "")
        return
      }
      const idx = Number.parseInt(cmd['index']) - 1
      const testVal = testVals[idx]
      const jb = createJsonBinding(RESOLVER, texprADLSumType());
      if (cmd['unmarshall']) {
        var stdin = process.openStdin();
        stdin.addListener("data", function (d) {
          try {
            const obj = jb.fromJson(JSON.parse(d));
            if (!isDeepStrictEqual(obj, testVal.val)) {
              console.error("expect vs received", testVal.val, obj)
              process.exit(1)
            }
          } catch (error) {
            console.error(error.toString());
            process.exit(1)
          }
        });
      } else {
        if (testVal.msg) {
          process.stderr.write(testVal.msg)
        }
        const a = jb.toJson(testVal.val);
        process.stdout.write(JSON.stringify(a));
      }
    });
}

export function configureRoundTripCli(program: Command) {
  program
    .command("roundtrip")
    .description('json for testing')
    .action((cmd: {}) => {
      const jb = createJsonBinding(RESOLVER, texprADLSumType());
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

export function configureRoundTripTExprCli(program: Command) {
  program
    .command("roundtriptexpr <moduleName> <name>")
    .option('--moduleName', 'module name')
    .option('--name', 'struct or union name')
    .description('json for testing')
    .action((moduleName, name, cmd: {}) => {
      const texpr: adl.ATypeExpr<unknown> = {
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


export function configureArrayRoundTripCli(program: Command) {
  program
    .command("array_roundtrip")
    .description('json for testing')
    .action((cmd: {}) => {
      const jb = createJsonBinding(RESOLVER, texprADLSumType());
      var stdin = process.openStdin();
      stdin.addListener("data", function (d) {
        let tests = [];
        try {
          tests = JSON.parse(d)
        } catch (error) {
          console.error("json parse error", error.toString());
          process.exit(1)
        }
        let results: ({} | null)[] = [];
        tests.forEach((element: {}) => {
          try {
            const obj = jb.fromJson(element);
            const a = jb.toJson(obj);
            results.push(a)
          } catch (error) {
            results.push({ error: error.toString() });
          }
        });
        process.stdout.write(JSON.stringify(results));
      });

    });
}
