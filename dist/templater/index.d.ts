/**
 * The Templater class
 * @beta
 */
export declare class Templater {
    /**
     * The template engine instance from the external module
     */
    private templateEngine;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets root folder to search templates into
     * @param folder - templates root folder
     */
    setTemplatesRootFolder(folder: string): void;
    /**
     * Renders a template
     * @param templatePath - path to template from templates root folder
     * @returns template content
     */
    renderTemplate(templatePath: string): string;
}
/**
 * The Templater instance
 */
declare const templater: Templater;
export { templater };
