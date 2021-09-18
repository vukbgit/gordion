/**
 * The logger module sets a log level and outputs accordingly formatted messages to console
 * @module
 * @beta
 */
import util from 'util';
import log from 'loglevel';
import chalk from 'chalk';

/**
 * Possible log levels
 * @beta
 */
export enum logLevels {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR
}

/**
 * Logger class
 * @beta
 */
export class Logger {
  
  /**
   * Sets log level
   * @param logLevel - log level
   */
   public setLevel(logLevel: keyof typeof logLevels): void {
     log.setLevel(logLevel)
   }

  /**
   * Logs one or more messages, it's called by specific loglevel methods
   * @param logLevel - log level
   * @param messages - messages
   */
   private log(logLevel: keyof typeof logLevels, ...messages: any[]) {
    //map messages to an array
    const enhancedMessages = messages.map((message: string) => {
      //get string representation of objects
      if (typeof message === 'object') {
        message = '\n' + util.inspect(message)
      }
      return message
    })
    //format accordingly to log level
    switch(logLevel) {
      case 'TRACE':
        log.trace(chalk.bgWhite.black(...enhancedMessages))
        break
      case 'DEBUG':
        log.debug(chalk.bgGreenBright.black(...enhancedMessages))
        break
      case 'INFO':
        log.info(chalk.bgBlue.white(...enhancedMessages))
        break
      case 'WARN':
        log.warn(chalk.bgYellow.black(...enhancedMessages))
        break
      case 'ERROR':
        log.error(chalk.bgRed.black(...enhancedMessages))
        break
      default:
        log.info(chalk.reset(...enhancedMessages))
    }
  }

  /**
   * Logs one or mode messages with TRACE log level
   * @param messages - messages
   */
  public trace(...messages: any[]) {
    this.log('TRACE', ...messages)
  }
  
  /**
   * Logs one or mode messages with DEBUG log level
   * @param messages - messages
   */
  public debug(...messages: any[]) {
    this.log('DEBUG', ...messages)
  }

  /**
   * Logs one or mode messages with INFO log level
   * @param messages - messages
   */
  public info(...messages: any[]) {
    this.log('INFO', ...messages)
  }

  /**
   * Logs one or mode messages with WARN log level
   * @param messages - messages
   */
  public warn(...messages: any[]) {
    this.log('WARN', ...messages)
  }

  /**
   * Logs one or mode messages with ERROR log level
   * @param messages - messages
   */
  public error(...messages: any[]) {
    this.log('ERROR', ...messages)
  }
}
//the logger instance
const logger = new Logger()

//logger.setLevel(process.env.LOG_LEVEL as keyof typeof logLevels)

export { logger }