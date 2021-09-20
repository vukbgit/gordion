#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import { prompt } from 'enquirer';
import { shellCommander } from '../shell-commander'
import { logger } from '../logger'

/**
 * Possible contexts
 * @beta
 */
 export enum contexts {
  gordion,
  webapp
}

/**
 * GIT Publisher class
 * @beta
 */
 export class GitPublisher {

  /**
   * The context 
   */
  private context: keyof typeof contexts | null = null

  private async gitStatus() {
    const status = await shellCommander.exec('cd node_modules/gordion && git status')
    return status
  }
  
  private async selectFilesToPublish() {
    //const result = await shellCommander.exec('cd node_modules/gordion && git diff --name-only', {}, true)
    const result = await shellCommander.exec('cd node_modules/gordion && git status --porcelain', {}, true)
    let files: string[] = []
    result.stdout.trim().split('\n').forEach(line => {
      let path = line.split(' ').pop() || ''
      if(path) {
        files.push(path)
      }
    })
    logger.warn(files.length)
    let choices: string[] = [...files]
    //if(files.length == 0 || (files.length == 1 && files[0] == '')) {
    if(files.length == 0) {
      return false
    } else {
      choices.unshift('ALL')
    }
    try {
      const input: Record<string,any> = await prompt({
        type: 'multiselect',
        name: 'selectedFiles',
        //initial: true,
        message: 'Select files to be published (ESC to abort)',
        choices: choices
      })
      if(input.selectedFiles.indexOf('ALL') !== -1) {
        return files
      } else {
        return input.selectedFiles
      }
    } catch(e) {
      logger.error(e);
      return false
    }
  }

  private async askGitCommitMessage() {
    const input: Record<string,any> = await prompt({
      type: 'input',
      name: 'message',
      initial: 'Gordion commit',
      message: 'GIT commit message'
    })
    return input.message
  }

  private async gitPublish(filesToPublish: [string],message: string) {
    const commit = await shellCommander.exec('cd node_modules/gordion && git add ' + filesToPublish.join(' ') + ' && git commit -m "' + message + '" && git push')
    return commit
  }
  
  public async publishToGIT(context: keyof typeof contexts) {
    this.context = context
    await this.gitStatus()
    const filesToPublish = await this.selectFilesToPublish()
    logger.warn(filesToPublish)
    if(filesToPublish !== false) {
      const message = await this.askGitCommitMessage()
      const commit = await this.gitPublish(filesToPublish, message)
    }
  }
}

/**
 * The GIT Publisher instance
 */
 const gitPublisher = new GitPublisher()

 export { gitPublisher }