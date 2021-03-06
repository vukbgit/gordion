/**
 * The shell-commander module executes shell commands using {@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback | commander.js}
 * @module
 * @beta
 */
import * as childPromise from 'child-process-promise';
/**
 * Shell Commander class
 * @beta
 */
export declare class ShellCommander {
    /**
     * Execs a shell command
     * @param command - command string to be executed
     * @param options - object with options, see https://www.npmjs.com/package/commander#options
     * @param silent - boolean to output info
     */
    exec(command: string, options?: {}, silent?: boolean): Promise<ExecSuccess | ExecError>;
}
/**
 * Success interface
 */
interface ExecSuccess extends childPromise.PromiseResult<string> {
    success: boolean;
}
/**
 * Error interface
 */
interface ExecError {
    success: boolean;
    stdout: string;
    stderr: string;
}
declare const shellCommander: ShellCommander;
export { shellCommander };
