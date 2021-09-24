#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { publisher } from '../publisher'

(async () => {
  program
    .description('Init webapp GIT repository')
    .action((name, options, command) => {
      publisher.initGITRepository('webapp')
    })
    await program.parseAsync()
  })()
