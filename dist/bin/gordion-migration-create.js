#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _logger = require("../logger");

const program = new _commander.Command('gordion-migration-builder');

_logger.logger.setLevel('INFO');

program //.description('Creates a migration for Gordion package')
//.arguments('<name>')
.requiredOption('-n, --name <name>', 'name option is mandatory').action((options, command) => {
  _logger.logger.info(options);

  _logger.logger.info(command);
});
program.parse(process.argv);