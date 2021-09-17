#!/usr/bin/env node
//import * as child from 'child_process';
"use strict";

var _commander = require("commander");

var _shellCommander = require("../shell-commander");

const program = new _commander.Command(); //import { logger } from '../logger'

//logger.setLevel('INFO')
program.description('compiles Gordion package').action((options, command) => {
  _shellCommander.shellCommander.exec('npm run compile', {
    'cwd': 'node_modules/gordion'
  });
}).parse(process.argv);