"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shellCommander = exports.ShellCommander = void 0;

var childPromise = _interopRequireWildcard(require("child-process-promise"));

var _logger = require("../logger");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The shell-commander module executes shell commands using {@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback | commander.js}
 * @module
 * @beta
 */

/**
 * Shell Commander class
 * @beta
 */
class ShellCommander {
  /**
   * Execs a shell command
   * @param command - command string to be executed
   * @param options - object with options, see https://www.npmjs.com/package/commander#options 
   * @param silent - boolean to output info
   */
  async exec(command, options, silent = false) {
    if (silent !== true) {
      _logger.logger.info('GORDION SHELL COMMANDER: ' + command);
    }

    try {
      let result = await childPromise.exec(command, options);

      if (silent !== true) {
        _logger.logger.info(result.stdout);
      }

      let outcome = {
        success: true,
        childProcess: result.childProcess,
        stdout: result.stdout,
        stderr: result.stderr
      };
      return outcome;
    } catch (err) {
      let result = {
        success: false,
        stderr: err.stderr,
        stdout: ''
      };

      if (silent !== true) {
        _logger.logger.error(err);
      }

      return result;
    }
  }

}
/**
 * Success interface 
 */


exports.ShellCommander = ShellCommander;
//the logger instance
const shellCommander = new ShellCommander();
exports.shellCommander = shellCommander;