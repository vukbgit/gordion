/**
 * The shell-commander module executes shell commands using {@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback | commander.js}
 * @module
 * @beta
 */
import * as childPromise from 'child-process-promise';
import { logger } from '../logger'

/**
 * Shell Commander class
 * @beta
 */
export class ShellCommander {
  
  /**
   * Execs a shell command
   * @param command - command string to be executed
   * @param options - object with options, see https://www.npmjs.com/package/commander#options 
   */
   public async exec(command: string, options?: {}, silent: boolean=false): Promise<childPromise.PromiseResult<string>> {
    if(silent !== true) {
      logger.info('GORDION SHELL COMMANDER: ' + command)
    }
    try {
      let result: childPromise.PromiseResult<string>
      result = await childPromise.exec(
        command,
        options
      )
      if(silent !== true) {
        logger.info(result.stdout)
      }
      return result
    } catch(err: any) {
      let result: childPromise.PromiseResult<string>
      logger.error(err)
      result = err
      return result
    }
   }
}
//the logger instance
const shellCommander = new ShellCommander()
export { shellCommander }