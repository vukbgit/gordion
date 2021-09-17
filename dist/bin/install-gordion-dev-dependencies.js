#!/usr/bin/env node
"use strict";

var child = _interopRequireWildcard(require("child_process"));

var _commander = require("commander");

var _logger = require("../logger");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const program = new _commander.Command();

_logger.logger.setLevel('INFO');

program.description('installs Gordion package dev dependencies').action((options, command) => {
  //read Gordion package.json
  var packageJson = require('../../package.json');

  let installCommand = 'npm i -D';

  for (const pkg in packageJson.devDependencies) {
    const version = packageJson.devDependencies[pkg];
    installCommand += ' ' + pkg + '@' + version;
  }

  _logger.logger.info(installCommand);

  child.exec(installCommand, {}, (error, stdout, stderr) => {
    if (error) {
      _logger.logger.error(error);

      return;
    }

    _logger.logger.info(stdout);

    if (stderr) {
      _logger.logger.error(stderr);
    }
  });
}).parse(process.argv);