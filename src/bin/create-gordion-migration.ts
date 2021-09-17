#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { shellCommander } from '../shell-commander'

program
  .description('Creates a migration for Gordion package')
  .argument('<name>', 'the name of the migration')
  .action((name: string, options: [string], command: Command) => {
    shellCommander.exec(
      'npx migrate create ' + name,
      {
        'cwd': 'node_modules/gordion',
      }
    )
  })
  .parse()