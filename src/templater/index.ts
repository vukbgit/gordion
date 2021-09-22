/**
 * The templater module outputs templates using {@link https://www.npmjs.com/package/nunjucks | nunjucks}
 * @module
 * @beta
 */
import nunjucks from 'nunjucks';
import { logger } from '../logger'

/**
 * The Templater class
 * @beta
 */
export class Templater {
  
  /**
   * The template engine instance from the external module
   */
  private templateEngine: any
  
  /**
   * Constructor
   */
  constructor() {
    this.templateEngine = nunjucks
    //default configuration
    this.setTemplatesRootFolder(process.env.SOURCE_FOLDER ?? 'src')
  }

  /**
   * Sets root folder to search templates into
   * @param folder - templates root folder
   */
  public setTemplatesRootFolder(folder: string) {
    this.templateEngine.configure(folder)
  }

  /**
   * Renders a template
   * @param templatePath - path to template from templates root folder
   * @param context - ash with context variables
   * @returns template content
   */
  public renderTemplate(templatePath: string, context?: object): string {
    return this.templateEngine.render(templatePath, context)
  }
}

/**
 * The Templater instance
 */
const templater = new Templater()

export { templater }