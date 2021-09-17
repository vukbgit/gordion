#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _shellCommander = require("../shell-commander");

const program = new _commander.Command();
program.description('installs Gordion package dev dependencies').action((options, command) => {
  //read Gordion package.json
  var packageJson = require('../../package.json');

  let installCommand = 'npm i -D';

  for (const pkg in packageJson.devDependencies) {
    const version = packageJson.devDependencies[pkg];
    installCommand += ' ' + pkg + '@' + version;
  }

  _shellCommander.shellCommander.exec(installCommand);
}).parse();