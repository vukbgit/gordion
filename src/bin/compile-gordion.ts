#!/usr/bin/env node
import * as child from 'child_process';
import { Command } from 'commander';
const program = new Command();
import { logger } from '../logger'

logger.setLevel('INFO')

program
  .description('compiles Gordion package')
  .action((options: [string], command: Command) => {
    child.exec(
      'npm run compile',
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