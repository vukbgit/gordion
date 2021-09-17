#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { shellCommander } from '../shell-commander'

program
  .description('Creates a migration for webapp')
  .argument('<name>', 'the name of the migration')
  .action((name: string, options: [string], command: Command) => {
    const result = shellCommander.exec(
      'npx migrate create ' + name
    )

  })
  .parse()