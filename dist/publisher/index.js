#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publisher = exports.Publisher = void 0;

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
 * Possible NPM versions
 * @beta
 */

(function (contexts) {
  contexts[contexts["gordion"] = 0] = "gordion";
  contexts[contexts["webapp"] = 1] = "webapp";
})(contexts || (contexts = {}));

var npmVersions;
/**
 * Publisher class for GIT and NPM
 * @beta
 */

(function (npmVersions) {
  npmVersions[npmVersions["major"] = 0] = "major";
  npmVersions[npmVersions["minor"] = 1] = "minor";
  npmVersions[npmVersions["patch"] = 2] = "patch";
  npmVersions[npmVersions["premajor"] = 3] = "premajor";
  npmVersions[npmVersions["preminor"] = 4] = "preminor";
  npmVersions[npmVersions["prepatch"] = 5] = "prepatch";
  npmVersions[npmVersions["prerelease"] = 6] = "prerelease";
})(npmVersions || (npmVersions = {}));

class Publisher {
  /**
   * The current context 
   */
  context = 'gordion';
  /**
   * Possible contexts
   */

  contexts = {
    'gordion': {
      folder: 'node_modules/gordion'
    },
    'webapp': {
      folder: '.'
    }
  };
  /**
   * Gets git status
   */

  async gitStatus() {
    const status = await _shellCommander.shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git status');
    return status.success;
  }
  /**
   * Lets choosing files to be published
   */


  async gitSelectFilesToPublish() {
    const result = await _shellCommander.shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git status --porcelain', {}, true);
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
  /**
   * Asks for GIT commit message
   */


  async gitAskCommitMessage() {
    const input = await (0, _enquirer.prompt)({
      type: 'input',
      name: 'message',
      initial: 'Gordion commit',
      message: 'GIT commit message'
    });
    return input.message;
  }
  /**
   * Adds, commits and push to GIT repository
   * @param filesToPublish - messages
   * @param message
   */


  async gitPublish(filesToPublish, message) {
    const commit = await _shellCommander.shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git add -A ' + filesToPublish.join(' ') + ' && git commit -m "' + message + '" && git push');
    return commit;
  }
  /**
   * Handles publication to a GIT repository
   * @param context
   */


  async publishToGIT(context) {
    this.context = context;
    const status = await this.gitStatus();

    if (status) {
      const filesToPublish = await this.gitSelectFilesToPublish();

      if (filesToPublish !== false) {
        const message = await this.gitAskCommitMessage();
        const commit = await this.gitPublish(filesToPublish, message);
      }
    }
  }
  /**
   * Lets choosing and bumps NPM version
   */


  async npmVersion() {
    //build choices
    let choices = [];

    for (let item in npmVersions) {
      if (isNaN(Number(item))) {
        choices.push(item);
      }
    }

    try {
      //choose semver field
      const input = await (0, _enquirer.prompt)({
        type: 'select',
        name: 'version',
        initial: 2,
        //patch
        message: 'Select semver field to bump (ESC to abort)',
        choices: choices
      });
      let version = input.version;
      const bump = await _shellCommander.shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && npm version ' + version, {}, true);

      if (bump.success === false) {
        _logger.logger.error(bump.stderr);

        return false;
      } else {
        return true;
      }
    } catch (e) {
      _logger.logger.error(e);

      return false;
    }
  }
  /**
   * Handles publication to NPM
   * @param context
   */


  async publishToNPM(context) {
    this.context = context;
    const version = await this.npmVersion();
    /*if(version) {
      const filesToPublish = await this.gitSelectFilesToPublish()
      if(filesToPublish !== false) {
        const message = await this.gitAskCommitMessage()
        const commit = await this.gitPublish(filesToPublish, message)
      }
    }*/
  }

}
/**
 * The Publisher instance
 */


exports.Publisher = Publisher;
const publisher = new Publisher();
exports.publisher = publisher;