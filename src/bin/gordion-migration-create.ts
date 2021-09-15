#!/usr/bin/env node
import * as child from 'child_process';
import { Command } from 'commander';
const program = new Command('gordion-migration-builder');
import { logger } from '../logger'

logger.setLevel('INFO')

program
  .description('Creates a migration for Gordion package')
  .argument('<name>', 'the name of the migration')
  .action((name: string, options: [string], command: Command) => {
    var foo: child.ChildProcess = child.exec(
      'npx migrate create ' + name,
      {
        'cwd': 'node_modules/gordion',
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        logger.info(stdout);
        if(stderr) {
          logger.error(stderr);
        }
      }
    )
  })
  .parse(process.argv)