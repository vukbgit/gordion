#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { logger } from '../logger'

logger.setLevel('INFO')

program
  .description('Creates a migration for Gordion package')
  .argument('<name>', 'migration name')
  .action((name: string, options: [string], command: Command) => {
    logger.info(name)
    logger.info(options)
    logger.info(command)
    
  })
  .parse(process.argv)