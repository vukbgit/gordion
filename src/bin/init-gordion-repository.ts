#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { publisher } from '../publisher'

//(async () => {
  program
    .description('Init Gordion GIT repository')
    .action((name, options, command) => {
      publisher.initGITRepository('gordion')
    })
    //await program.parseAsync()
    program.parse()
//  })()
