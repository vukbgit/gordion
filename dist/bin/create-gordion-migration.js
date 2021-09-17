#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _shellCommander = require("../shell-commander");

const program = new _commander.Command();
program.description('Creates a migration for Gordion package').argument('<name>', 'the name of the migration').action((name, options, command) => {
  _shellCommander.shellCommander.exec('npx migrate create ' + name, {
    'cwd': 'node_modules/gordion'
  });
}).parse();