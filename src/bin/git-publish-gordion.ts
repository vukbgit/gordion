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
  
  async function selectFilesToPublish() {
    const result = await shellCommander.exec('cd node_modules/gordion && git diff --name-only', {}, true)
    let files = result.stdout.trim().split('\n')
    logger.warn(files.length)
    if(files.length == 0) {
      return false
    } else {
      files.unshift('ALL')
    }
    try {
      const input: Record<string,any> = await prompt({
        type: 'multiselect',
        name: 'selectedFiles',
        //initial: true,
        message: 'Select files to be published (ESC to abort)',
        choices: files
      })
      if(input.selectedFiles.indexOf('ALL') !== -1) {
        input.selectedFiles = result.stdout.split('\n')
      }
      return input.selectedFiles
    } catch(e) {
      return false
    }
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

  async function gitPublish(filesToPublish: [string],message: string) {
    const commit = await shellCommander.exec('cd node_modules/gordion && git add ' + filesToPublish.join(' ') + ' && git commit -m "' + message + '" && git push')
    return commit
  }
  
  async function publishToGIT() {
    await gitStatus()
    const filesToPublish = await selectFilesToPublish()
    if(filesToPublish !== false) {
      const message = await askGitCommitMessage()
      const commit = await gitPublish(filesToPublish, message)
    }
  }