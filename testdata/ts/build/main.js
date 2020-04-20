"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const emitjson = __importStar(require("./emitjson"));
commander_1.default.name("adl-ts");
commander_1.default.version("1.0.0");
emitjson.configureCli(commander_1.default);
emitjson.configureConsumeCli(commander_1.default);
emitjson.configureRoundTripCli(commander_1.default);
emitjson.configureEmmitOrConsumeCli(commander_1.default);
emitjson.configureArrayRoundTripCli(commander_1.default);
emitjson.configureRoundTripTExprCli(commander_1.default);
// error on unknown commands
commander_1.default.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', commander_1.default.args.join(' '));
    process.exit(1);
});
commander_1.default.parse(process.argv);
//# sourceMappingURL=main.js.map