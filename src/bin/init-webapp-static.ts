#!/usr/bin/env node
import { sprintf } from 'sprintf-js';
import { Command,Option } from 'commander';
const program = new Command();
import { logger } from '../logger'
import { shellCommander } from '../shell-commander'

const defaultWebappIcon = 'static/corporate/icon.png'
const defaultWebappLaunch = 'static/corporate/launch.png'

program
  .description('inits webapp static assets')
  .option('-i, --icon <icon>', 'path to icon file (at least 512x512px)')
  .option('-l, --launch <launch>', 'path to launch screen file (at least 3200x3200px)')
  .action(async (options, command: Command) => {
    //create assets
    let icon:string
    if(typeof options.icon == 'undefined') {
      icon = defaultWebappIcon
      logger.warn(sprintf('icon file not specified, using default one %s', defaultWebappIcon))
    } else {
      icon = options.icon
    }
    let launch:string
    if(typeof options.launch == 'undefined') {
      launch = defaultWebappLaunch
      logger.warn(sprintf('launch screen file not specified, using default one %s', defaultWebappLaunch))
    } else {
      launch = options.launch
    }
    const cmd = sprintf('npx create-pwa --icon="../%s"  --launch="../%s"', icon, launch)
    shellCommander.exec(
      cmd,
      {
        'cwd': 'static',
      }
    )
  })
  .parse()