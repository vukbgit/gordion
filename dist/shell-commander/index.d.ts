/**
 * Shell Commander class
 * @beta
 */
export declare class ShellCommander {
    /**
     * Execs a command
     * @param command - command string to be executed
     * @param options - object with options, see https://www.npmjs.com/package/commander#options
     */
    exec(command: string, options?: {}): void;
}
declare const shellCommander: ShellCommander;
export { shellCommander };
