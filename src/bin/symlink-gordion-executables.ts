#!/usr/bin/env node
import * as path from 'path';
import { Command } from 'commander';
const program = new Command();
import FileHound from 'filehound';
import { shellCommander } from '../shell-commander'

(async () => {
  program
    .description('Create symlinks to gordion executables')
    .action(createSymlinks)
    await program.parseAsync()
  })()
  
  async function findExecutables() {
    const files = await FileHound.create()
    .paths('./' + (process.env.BUILD_FOLDER ?? 'node_modules/gordion/dist/bin'))
    .match('*.js')
    .find()
    return files
  }

  async function createSymlinks() {
    const files = await findExecutables()
    let command = 'cd node_modules/.bin';
    files.forEach((file: string) => {
      command += ' && ln -sf ../gordion/dist/bin/' + path.basename(file) + ' gordion-' + path.basename(file, '.js')
    });
    shellCommander.exec(
      command
    )
  }