import program from "commander";
import * as emitjson from "./emitjson";

program.name("adl-ts");
program.version("1.0.0");

emitjson.configureCli(program);
emitjson.configureConsumeCli(program);
emitjson.configureRoundTripCli(program);
emitjson.configureEmmitOrConsumeCli(program);
emitjson.configureArrayRoundTripCli(program);
emitjson.configureRoundTripTExprCli(program);

// error on unknown commands
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});


program.parse(process.argv);

