/**
 * Possible log levels
 * @beta
 */
export declare enum logLevels {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}
/**
 * Logger class
 * @beta
 */
export declare class Logger {
    /**
     * Sets log level
     * @param logLevel - log level
     */
    setLevel(logLevel: keyof typeof logLevels): void;
    /**
     * Logs one or more messages, it's called by specific loglevel methods
     * @param logLevel - log level
     * @param messages - messages
     */
    private log;
    /**
     * Logs one or mode messages with TRACE log level
     * @param messages - messages
     */
    trace(...messages: any[]): void;
    /**
     * Logs one or mode messages with DEBUG log level
     * @param messages - messages
     */
    debug(...messages: any[]): void;
    /**
     * Logs one or mode messages with INFO log level
     * @param messages - messages
     */
    info(...messages: any[]): void;
    /**
     * Logs one or mode messages with WARN log level
     * @param messages - messages
     */
    warn(...messages: any[]): void;
    /**
     * Logs one or mode messages with ERROR log level
     * @param messages - messages
     */
    error(...messages: any[]): void;
}
declare const logger: Logger;
export { logger };
