#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _shellCommander = require("../shell-commander");

const program = new _commander.Command();
program.description('compiles Gordion package').option('-c, --clean', 'cleans dist folder before compiling').option('-t, --test <fake>', 'test').action((options, command) => {
  let compileCommand = 'tsc && babel src --out-dir dist --extensions .ts --copy-files';

  if (typeof options.clean != 'undefined' && options.clean === true) {
    compileCommand = 'rimraf dist && ' + compileCommand;
  }

  _shellCommander.shellCommander.exec(compileCommand, {//'cwd': 'node_modules/gordion',
  });
}).parse();