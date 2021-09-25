/**
 * The publisher module provides publication over different channels (GIT and NPM so far)
 * @module
 * @beta
 */
 import { sprintf } from 'sprintf-js';
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
    * Inits git repository
    */
    private async gitInit() {
      try {
        //confirm
        let input: Record<string,any> = await prompt({
          type: 'confirm',
          name: 'init',
          initial: true,
          message: sprintf('Init repository and overwrite current %s files (ESC to abort)?', this.context)
        })
        if(input.init) {
           //ask for username
           input = await prompt({
             type: 'input',
             name: 'username',
             initial: '',
             message: 'GIT username',
             required: true
           })
           const username = input.username
           //ask for email
           input = await prompt({
             type: 'input',
             name: 'email',
             initial: '',
             message: 'GIT email',
             required: true
           })
           const email = input.email
           //ask for repository URL
           input = await prompt({
             type: 'input',
             name: 'repoUrl',
             initial: '',
             message: 'GIT repository url',
             required: true
           })
           const repoUrl = input.repoUrl
           //one more confirm
           input = await prompt({
             type: 'confirm',
             name: 'init',
             initial: true,
             message: sprintf(
               'Init repository with the following details (ESC to abort)?\nusername: %s\nemail: %s\nrepo URL: %s\n',
               username,
               email,
               repoUrl
             )
           })
           if(input.init) {
             const command = `
 cd ${this.contexts[this.context].folder}
 git init -b main
 git config user.name "${username}"
 git config user.email "${email}"
 git remote add origin ${repoUrl}
 git fetch origin
 git checkout -b main origin/main -f
             `
             const init = await shellCommander.exec(command)
           }
        }
      } catch(err) {
        logger.error(err)
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
    * Inits GIT repository
    * @param context
    */
    public async initGITRepository(context: keyof typeof contexts) {
     this.context = context
     const status = await this.gitInit()
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
       const bump = await shellCommander.exec(
         sprintf('cd %s && npm version %s', this.contexts[this.context].folder, version),
         {},
         false
       )
       if(bump.success === false) {
         logger.error(bump.stderr)
         return false
       } else {
         const version = bump.stdout.replace(/^v/,'').trim()
         logger.info(version)
         //publish
         const publish = await shellCommander.exec(
           sprintf('cd %s && npm publish', this.contexts[this.context].folder),
           {},
           false
         )
         if(publish.success === false) {
           logger.error(publish.stderr)
           return false
         } else {
           //push new package.json to git
           const publish = await shellCommander.exec(
             sprintf('cd %s && git push', this.contexts[this.context].folder),
             {},
             false
           )
           if(publish.success === false) {
             logger.error(publish.stderr)
             return false
           } else {
             //update gordion version into webapp package.json without reinstalling
             let publishedToRegistry:boolean = false
             while(publishedToRegistry == false) {
               try {
                 let publishToRegistry = await shellCommander.exec(
                   sprintf('npm cache clean --force && npm i gordion@%s --package-lock-only', version),
                   {},
                   false
                 )
                 publishedToRegistry = publishToRegistry.success
               } catch(err) {
                 logger.error('not yet published...');
                 publishedToRegistry = false
               }

             }

             return true
           }
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
   }
 }
 
 /**
  * The Publisher instance
  */
  const publisher = new Publisher()
 
  export { publisher }