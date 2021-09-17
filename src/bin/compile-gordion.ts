#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { shellCommander } from '../shell-commander'

//logger.setLevel('INFO')

program
  .description('compiles Gordion package')
  .action((options: [string], command: Command) => {
    shellCommander.exec(
      'npm run compile',
      {
        'cwd': 'node_modules/gordion',
      }
    )
  })
  .parse()