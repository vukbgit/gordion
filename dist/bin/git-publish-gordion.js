#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _enquirer = require("enquirer");

var _shellCommander = require("../shell-commander");

var _logger = require("../logger");

const program = new _commander.Command();

(async () => {
  program.description('Publish updates to Gordion GIT repository').action(publishToGIT);
  await program.parseAsync();
})();

async function gitStatus() {
  const status = await _shellCommander.shellCommander.exec('cd node_modules/gordion && git status');
  return status;
}

async function askGitPublish() {
  const input = await (0, _enquirer.prompt)({
    type: 'confirm',
    name: 'doPublish',
    initial: true,
    message: 'Publish all files to GIT repository?'
  });
  return input.doPublish;
}

async function askGitCommitMessage() {
  const input = await (0, _enquirer.prompt)({
    type: 'input',
    name: 'message',
    initial: 'Gordion commit',
    message: 'GIT commit message'
  });
  return input.message;
}

async function gitCommitAll(message) {
  const commit = await _shellCommander.shellCommander.exec('cd node_modules/gordion && git add . && git commit -m "' + message + '"');
  return commit;
}

async function publishToGIT() {
  await gitStatus();
  const doPublish = await askGitPublish();

  if (doPublish) {
    const message = await askGitCommitMessage();
    const commit = await gitCommitAll(message);
  } else {
    _logger.logger.warn('GIT publication aborted by user');
  }
}