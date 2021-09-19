#!/usr/bin/env node
"use strict";

var _commander = require("commander");

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
  /*const doPublish = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Publish all of the files to GIT repository?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  });
  return doPublish*/
}

async function publishToGIT() {
  await gitStatus();
  const doPublish = await askGitPublish();

  _logger.logger.debug(doPublish);
  /*let command = 'cd node_modules/.bin';
  files.forEach((file: string) => {
    command += ' && ln -sf ../gordion/dist/bin/' + path.basename(file) + ' gordion-' + path.basename(file, '.js')
  });
  shellCommander.exec(
    command
  )*/

}