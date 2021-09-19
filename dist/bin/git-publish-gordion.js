#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _gitPublisher = require("../git-publisher");

const program = new _commander.Command();

(async () => {
  program.description('Publish updates to Gordion GIT repository').action((name, options, command) => {
    _gitPublisher.gitPublisher.publishToGIT('gordion');
  });
  await program.parseAsync();
})();