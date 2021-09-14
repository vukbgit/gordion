#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _logger = require("../logger");

const program = new _commander.Command();

_logger.logger.setLevel('INFO');

program.description('Creates a migration for Gordion package').argument('<name>', 'migration name').action((name, options, command) => {
  _logger.logger.info(name);

  _logger.logger.info(options);

  _logger.logger.info(command);
}).parse(process.argv);