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
 enum contexts {
  gordion,
  webapp
}

/**
 * Publisher class for GIT and NPM
 * @beta
 */
 export class Publisher {

  /**
   * The context 
   */
  private context: keyof typeof contexts = 'gordion'

  private contexts = {
    'gordion': {
      folder: 'node_modules/gordion'
    },
    'webapp': {
      folder: '.'
    }
  }

  private async gitStatus() {
    const status = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git status')
    return status.success
    
  }
  
  private async gitSelectFilesToPublish() {
    const result = await shellCommander.exec('cd node_modules/gordion && git status --porcelain', {}, true)
    let files: string[] = []
    result.stdout.trim().split('\n').forEach(line => {
      let path = line.split(' ').pop() || ''
      if(path) {
        files.push(path)
      }
    })
    let choices: string[] = [...files]
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

  private async gitAskCommitMessage() {
    const input: Record<string,any> = await prompt({
      type: 'input',
      name: 'message',
      initial: 'Gordion commit',
      message: 'GIT commit message'
    })
    return input.message
  }

  private async gitPublish(filesToPublish: [string],message: string) {
    const commit = await shellCommander.exec('cd node_modules/gordion && git add -A ' + filesToPublish.join(' ') + ' && git commit -m "' + message + '" && git push')
    return commit
  }
  
  public async publishToGIT(context: keyof typeof contexts) {
    this.context = context
    const status = await this.gitStatus()
    if(status) {
      const filesToPublish = await this.gitSelectFilesToPublish()
      if(filesToPublish !== false) {
        const message = await this.gitAskCommitMessage()
        const commit = await this.gitPublish(filesToPublish, message)
      }
    }
  }
}

/**
 * The Publisher instance
 */
 const publisher = new publisher()

 export { publisher }