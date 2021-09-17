#!/usr/bin/env node
import * as child from 'child_process';
import { Command } from 'commander';
const program = new Command();
import { logger } from '../logger'

logger.setLevel('INFO')

program
  .description('installs Gordion package dev dependencies')
  .action((options: [string], command: Command) => {
    //read Gordion package.json
    var packageJson = require('../../package.json')
    let installCommand = 'npm i -D'
    for (const pkg in packageJson.devDependencies) {
      const version = packageJson.devDependencies[pkg]
      installCommand += ' ' + pkg + '@' + version
    }
    logger.info(installCommand)
    child.exec(
      installCommand,
      {},
      (error, stdout, stderr) => {
        if (error) {
          logger.error(error);
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