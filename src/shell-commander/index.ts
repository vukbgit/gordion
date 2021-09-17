/**
 * The shell-commander module executes shell commands using {@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback | commander.js}
 * @module
 * @beta
 */
import * as child from 'child_process';
import * as childPromise from 'child-process-promise';
import { logger } from '../logger'

logger.setLevel('INFO')

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
   public exec(command: string, options?: {}): void {
    logger.info('GORDION SHELL COMMANDER: ' + command);
    childPromise.exec(
      command,
      options
    ).then(function (result) {
      logger.info(result.stdout)
    }).catch(function (err) {
      logger.error(err);
    })
   }
}
//the logger instance
const shellCommander = new ShellCommander()
export { shellCommander }