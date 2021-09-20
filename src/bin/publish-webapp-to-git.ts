#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { publisher } from '../publisher'

(async () => {
  program
    .description('Publish updates to Gordion GIT repository')
    .action((name, options, command) => {
      publisher.publishToGIT('webapp')
    })
    await program.parseAsync()
  })()
