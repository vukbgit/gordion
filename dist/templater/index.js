"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templater = exports.Templater = void 0;

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The templater module outputs templates using {@link https://www.npmjs.com/package/nunjucks | nunjucks}
 * @module
 * @beta
 */

/**
 * The Templater class
 * @beta
 */
class Templater {
  /**
   * The template engine instance from the external module
   */

  /**
   * Constructor
   */
  constructor() {
    this.templateEngine = _nunjucks.default; //default configuration

    this.setTemplatesRootFolder(process.env.SOURCE_FOLDER ?? 'src');
  }
  /**
   * Sets root folder to search templates into
   * @param folder - templates root folder
   */


  setTemplatesRootFolder(folder) {
    this.templateEngine.configure(folder);
  }
  /**
   * Renders a template
   * @param templatePath - path to template from templates root folder
   * @param context - ash with context variables
   * @returns template content
   */


  renderTemplate(templatePath, context) {
    return this.templateEngine.render(templatePath, context);
  }

}
/**
 * The Templater instance
 */


exports.Templater = Templater;
const templater = new Templater();
exports.templater = templater;