#!/usr/bin/env node
"use strict";

var _sprintfJs = require("sprintf-js");

var _commander = require("commander");

var _logger = require("../logger");

var _shellCommander = require("../shell-commander");

const program = new _commander.Command();
const defaultWebappIcon = 'static/corporate/icon.png';
const defaultWebappLaunch = 'static/corporate/launch.png';
program.description('inits webapp static assets').option('-i, --icon <icon>', 'path to icon file (at least 512x512px)').option('-l, --launch <launch>', 'path to launch screen file (at least 3200x3200px)').action(async (options, command) => {
  //create assets
  let icon;

  if (typeof options.icon == 'undefined') {
    icon = defaultWebappIcon;

    _logger.logger.warn((0, _sprintfJs.sprintf)('icon file not specified, using default one %s', defaultWebappIcon));
  } else {
    icon = options.icon;
  }

  let launch;

  if (typeof options.launch == 'undefined') {
    launch = defaultWebappLaunch;

    _logger.logger.warn((0, _sprintfJs.sprintf)('launch screen file not specified, using default one %s', defaultWebappLaunch));
  } else {
    launch = options.launch;
  }

  const cmd = (0, _sprintfJs.sprintf)('npx create-pwa --icon="../%s"  --launch="../%s"', icon, launch);

  _shellCommander.shellCommander.exec(cmd, {
    'cwd': 'static'
  });
}).parse();