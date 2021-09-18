"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.Logger = exports.logLevels = void 0;

var _util = _interopRequireDefault(require("util"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The logger module sets a log level and outputs accordingly formatted messages to console
 * @module
 * @beta
 */

/**
 * Possible log levels
 * @beta
 */
let logLevels;
/**
 * Logger class
 * @beta
 */

exports.logLevels = logLevels;

(function (logLevels) {
  logLevels[logLevels["TRACE"] = 0] = "TRACE";
  logLevels[logLevels["DEBUG"] = 1] = "DEBUG";
  logLevels[logLevels["INFO"] = 2] = "INFO";
  logLevels[logLevels["WARN"] = 3] = "WARN";
  logLevels[logLevels["ERROR"] = 4] = "ERROR";
})(logLevels || (exports.logLevels = logLevels = {}));

class Logger {
  /**
   * Sets log level
   * @param logLevel - log level
   */
  setLevel(logLevel) {
    _loglevel.default.setLevel(logLevel);
  }
  /**
   * Logs one or more messages, it's called by specific loglevel methods
   * @param logLevel - log level
   * @param messages - messages
   */


  log(logLevel, ...messages) {
    //map messages to an array
    const enhancedMessages = messages.map(message => {
      //get string representation of objects
      if (typeof message === 'object') {
        message = '\n' + _util.default.inspect(message);
      }

      return message;
    }); //format accordingly to log level

    switch (logLevel) {
      case 'TRACE':
        _loglevel.default.trace(_chalk.default.bgWhite.black(...enhancedMessages));

        break;

      case 'DEBUG':
        _loglevel.default.debug(_chalk.default.bgGreenBright.black(...enhancedMessages));

        break;

      case 'INFO':
        _loglevel.default.info(_chalk.default.bgBlue.white(...enhancedMessages));

        break;

      case 'WARN':
        _loglevel.default.warn(_chalk.default.bgYellow.black(...enhancedMessages));

        break;

      case 'ERROR':
        _loglevel.default.error(_chalk.default.bgRed.black(...enhancedMessages));

        break;

      default:
        _loglevel.default.info(_chalk.default.reset(...enhancedMessages));

    }
  }
  /**
   * Logs one or mode messages with TRACE log level
   * @param messages - messages
   */


  trace(...messages) {
    this.log('TRACE', ...messages);
  }
  /**
   * Logs one or mode messages with DEBUG log level
   * @param messages - messages
   */


  debug(...messages) {
    this.log('DEBUG', ...messages);
  }
  /**
   * Logs one or mode messages with INFO log level
   * @param messages - messages
   */


  info(...messages) {
    this.log('INFO', ...messages);
  }
  /**
   * Logs one or mode messages with WARN log level
   * @param messages - messages
   */


  warn(...messages) {
    this.log('WARN', ...messages);
  }
  /**
   * Logs one or mode messages with ERROR log level
   * @param messages - messages
   */


  error(...messages) {
    this.log('ERROR', ...messages);
  }

} //the logger instance


exports.Logger = Logger;
const logger = new Logger(); //logger.setLevel(process.env.LOG_LEVEL as keyof typeof logLevels)

exports.logger = logger;