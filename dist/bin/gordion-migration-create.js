#!/usr/bin/env node
"use strict";

var child = _interopRequireWildcard(require("child_process"));

var _commander = require("commander");

var _logger = require("../logger");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const program = new _commander.Command('gordion-migration-builder');

_logger.logger.setLevel('INFO');

program.description('Creates a migration for Gordion package').argument('<name>', 'the name of the migration').action((name, options, command) => {
  //logger.info(name)
  //logger.info(options)
  //logger.info(command)
  var foo = child.exec('npx migrate create ' + name, {
    'cwd': 'node_modules/gordion'
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    _logger.logger.info(stdout);

    if (stderr) {
      _logger.logger.error(stderr);
    }
  });
}).parse(process.argv);