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
    let compileCommand = 'tsc && babel src --out-dir dist --extensions .ts'
    if(typeof options.clean != 'undefined' && options.clean === true) {
      compileCommand = 'rimraf dist && ' + compileCommand
    }
    shellCommander.exec(
      compileCommand,
      {
        //'cwd': 'node_modules/gordion',
      }
    )
  })
  .parse()