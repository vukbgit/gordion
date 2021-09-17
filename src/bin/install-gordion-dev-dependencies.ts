#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { shellCommander } from '../shell-commander'

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
    shellCommander.exec(
      installCommand
    )
    /*child.exec(
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
    )*/
  })
  .parse(process.argv)