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
 * Possible NPM versions
 * @beta
 */
 enum npmVersions {
  major,
  minor,
  patch,
  premajor,
  preminor,
  prepatch,
  prerelease,
  //'from-git'
}

/**
 * Publisher class for GIT and NPM
 * @beta
 */
 export class Publisher {

  /**
   * The current context 
   */
  private context: keyof typeof contexts = 'gordion'

  /**
   * Possible contexts
   */
  private contexts = {
    'gordion': {
      folder: 'node_modules/gordion'
    },
    'webapp': {
      folder: '.'
    }
  }

  /**
   * Gets git status
   */
   private async gitStatus() {
    const status = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git status')
    return status.success
    
  }
  
  /**
   * Lets choosing files to be published
   */
   private async gitSelectFilesToPublish() {
    const result = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git status --porcelain', {}, true)
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

  /**
   * Asks for GIT commit message
   */
   private async gitAskCommitMessage() {
    const input: Record<string,any> = await prompt({
      type: 'input',
      name: 'message',
      initial: 'Gordion commit',
      message: 'GIT commit message'
    })
    return input.message
  }

  /**
   * Adds, commits and push to GIT repository
   * @param filesToPublish - messages
   * @param message
   */
   private async gitPublish(filesToPublish: [string],message: string) {
    const commit = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git add -A ' + filesToPublish.join(' ') + ' && git commit -m "' + message + '" && git push')
    return commit
  }
  
  /**
   * Handles publication to a GIT repository
   * @param context
   */
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

  /**
   * Lets choosing and bumps NPM version
   */
   private async npmVersion() {
     //build choices
    let choices: string[] = []
    for (let item in npmVersions) {
      if (isNaN(Number(item))) {
        choices.push(item);
      }
    }
    try {
      //choose semver field
      const input: Record<string,any> = await prompt({
        type: 'select',
        name: 'version',
        initial: 2, //patch
        message: 'Select semver field to bump (ESC to abort)',
        choices: choices
      })
      let version = input.version
      //bump version
      const bump = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && npm version ' + version, {}, true)
      if(bump.success === false) {
        logger.error(bump.stderr)
        return false
      } else {
        logger.info(bump.stdout)
        //publish
        const publish = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && npm publish', {}, false)
        if(publish.success === false) {
          logger.error(publish.stderr)
          return false
        } else {
          //push new package.json to git
          const publish = await shellCommander.exec('cd ' + this.contexts[this.context].folder + ' && git push', {}, false)
          return true
        }
      }
    } catch(e) {
      logger.error(e);
      return false
    }
  }
  
  /**
   * Handles publication to NPM
   * @param context
   */
   public async publishToNPM(context: keyof typeof contexts) {
    this.context = context
    const version = await this.npmVersion()
    /*if(version) {
      const filesToPublish = await this.gitSelectFilesToPublish()
      if(filesToPublish !== false) {
        const message = await this.gitAskCommitMessage()
        const commit = await this.gitPublish(filesToPublish, message)
      }
    }*/
  }
}

/**
 * The Publisher instance
 */
 const publisher = new Publisher()

 export { publisher }