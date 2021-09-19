#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _logger = require("../logger");

var _shellCommander = require("../shell-commander");

const program = new _commander.Command();
program.description('compiles Gordion package').option('-c, --clean', 'cleans dist folder before compiling').option('-t, --test <fake>', 'test').action((options, command) => {
  _logger.logger.info(options.clean);

  const compileCommand = typeof options.clean != 'undefined' && options.clean === true ? 'npm run compile-clean' : 'npm run compile'; //const compileCommand = 'npm run compile'

  _shellCommander.shellCommander.exec(compileCommand, {
    'cwd': 'node_modules/gordion'
  });
}).parse();