#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { gitPublisher } from '../git-publisher'

(async () => {
  program
    .description('Publish updates to Gordion GIT repository')
    .action((name, options, command) => {
      gitPublisher.publishToGIT('gordion')
    })
    await program.parseAsync()
  })()
