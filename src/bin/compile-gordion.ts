#!/usr/bin/env node
import { Command,Option } from 'commander';
const program = new Command();
import { logger } from '../logger'
import { shellCommander } from '../shell-commander'

program
  .description('compiles Gordion package')
  .option('-c, --clean', 'cleans dist folder before compiling')
  .option('-t, --test <fake>', 'test')
  .action((options, command: Command) => {
    logger.info(options.clean)
    const compileCommand = typeof options.clean != 'undefined' && options.clean === true ? 'npm run compile-clean' : 'npm run compile'
    //const compileCommand = 'npm run compile'
    shellCommander.exec(
      compileCommand,
      {
        'cwd': 'node_modules/gordion',
      }
    )
  })
  .parse()