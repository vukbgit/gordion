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
   * @param silent - boolean to output info
   */
   public async exec(command: string, options?: {}, silent: boolean=false): Promise<ExecSuccess | ExecError> {
    if(silent !== true) {
      logger.info('GORDION SHELL COMMANDER: ' + command)
    }
    try {
      let result:childPromise.PromiseResult<string> = await childPromise.exec(
        command,
        options
      )
      if(silent !== true) {
        logger.info(result.stdout)
      }
      let outcome:ExecSuccess = {
        success: true,
        childProcess: result.childProcess,
        stdout: result.stdout,
        stderr: result.stderr
      }
      return outcome
    } catch(err: any) {
      let result:ExecError = {
        success:false,
        stderr: err.stderr,
        stdout: ''
      }
      if(silent !== true) {
        logger.error(err)
      }
      return result
    }
   }
}

/**
 * Success interface 
 */
 interface ExecSuccess extends childPromise.PromiseResult<string>
 {
   success:boolean
 }
 
/**
 * Error interface 
 */
 interface ExecError
 {
   success:boolean,
   stdout: string,
   stderr: string
 }
 

//the logger instance
const shellCommander = new ShellCommander()
export { shellCommander }