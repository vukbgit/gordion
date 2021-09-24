#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _publisher = require("../publisher");

const program = new _commander.Command();
//(async () => {
program.description('Init Gordion GIT repository').action((name, options, command) => {
  _publisher.publisher.initGITRepository('gordion');
}); //await program.parseAsync()

program.parse(); //  })()