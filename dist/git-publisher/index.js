#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitPublisher = exports.GitPublisher = void 0;

var _commander = require("commander");

var _enquirer = require("enquirer");

var _shellCommander = require("../shell-commander");

var _logger = require("../logger");

const program = new _commander.Command();

/**
 * Possible contexts
 * @beta
 */
var contexts;
/**
 * GIT Publisher class
 * @beta
 */

(function (contexts) {
  contexts[contexts["gordion"] = 0] = "gordion";
  contexts[contexts["webapp"] = 1] = "webapp";
})(contexts || (contexts = {}));

class GitPublisher {
  /**
   * The context 
   */
  context = 'gordion';
  contexts = {
    'gordion': {
      folder: 'node_modules/gordion'
    },
    'webapp': {
      folder: '.'
    }
  };

  async gitStatus() {
    const status = await _shellCommander.shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git status');
    return status.success;
  }

  async selectFilesToPublish() {
    const result = await _shellCommander.shellCommander.exec('cd node_modules/gordion && git status --porcelain', {}, true);
    let files = [];
    result.stdout.trim().split('\n').forEach(line => {
      let path = line.split(' ').pop() || '';

      if (path) {
        files.push(path);
      }
    });
    let choices = [...files];

    if (files.length == 0) {
      return false;
    } else {
      choices.unshift('ALL');
    }

    try {
      const input = await (0, _enquirer.prompt)({
        type: 'multiselect',
        name: 'selectedFiles',
        //initial: true,
        message: 'Select files to be published (ESC to abort)',
        choices: choices
      });

      if (input.selectedFiles.indexOf('ALL') !== -1) {
        return files;
      } else {
        return input.selectedFiles;
      }
    } catch (e) {
      _logger.logger.error(e);

      return false;
    }
  }

  async askGitCommitMessage() {
    const input = await (0, _enquirer.prompt)({
      type: 'input',
      name: 'message',
      initial: 'Gordion commit',
      message: 'GIT commit message'
    });
    return input.message;
  }

  async gitPublish(filesToPublish, message) {
    const commit = await _shellCommander.shellCommander.exec('cd node_modules/gordion && git add ' + filesToPublish.join(' ') + ' && git commit -m "' + message + '" && git push');
    return commit;
  }

  async publishToGIT(context) {
    this.context = context;
    const status = await this.gitStatus();

    if (status) {
      const filesToPublish = await this.selectFilesToPublish();

      if (filesToPublish !== false) {
        const message = await this.askGitCommitMessage();
        const commit = await this.gitPublish(filesToPublish, message);
      }
    }
  }

}
/**
 * The GIT Publisher instance
 */


exports.GitPublisher = GitPublisher;
const gitPublisher = new GitPublisher();
exports.gitPublisher = gitPublisher;