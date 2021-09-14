#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command('gordion-migration-builder');
import { logger } from '../logger'

logger.setLevel('INFO')

program
  //.description('Creates a migration for Gordion package')
  //.arguments('<name>')
  .requiredOption('-n, --name <name>', 'name option is mandatory')
  .action((options: [string], command: Command) => {
    logger.info(options)
    logger.info(command)
    
  });
  program.parse(process.argv)