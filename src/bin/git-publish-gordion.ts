#!/usr/bin/env node
import * as path from 'path';
import { Command } from 'commander';
const program = new Command();
import { prompt } from 'enquirer';
import { shellCommander } from '../shell-commander'
import { logger } from '../logger'

(async () => {
  program
    .description('Publish updates to Gordion GIT repository')
    .action(publishToGIT)
    await program.parseAsync()
  })()
  
  async function gitStatus() {
    const status = await shellCommander.exec('cd node_modules/gordion && git status')
    return status
  }
  
  async function askGitPublish() {
    const input: Record<string,any> = await prompt({
      type: 'confirm',
      name: 'doPublish',
      initial: true,
      message: 'Publish all files to GIT repository?'
    })
    return input.doPublish
  }
  
  async function askGitCommitMessage() {
    const input: Record<string,any> = await prompt({
      type: 'input',
      name: 'message',
      initial: 'Gordion commit',
      message: 'GIT commit message'
    })
    return input.message
  }

  async function gitPublish(message: string) {
    const commit = await shellCommander.exec('cd node_modules/gordion && git add . && git commit -m "' + message + '" && git push')
    return commit
  }
  
  async function publishToGIT() {
    await gitStatus()
    const doPublish = await askGitPublish()
    if(doPublish) {
      const message = await askGitCommitMessage()
      const commit = await gitPublish(message)
    } else {
      logger.warn('GIT publication aborted by user')
    }
  }