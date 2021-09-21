/**
 * The stringer module manipulates string
 * @module
 * @beta
 */
import { camelCase } from "camel-case";
import { logger } from '../logger'

/**
 * The Stringer class
 * @beta
 */
export class Stringer {
  
  /**
    * Formats 
    * @param route - a Route object
    */
   public camelCase(action:string):string {
    return camelCase(action)
   }
}

/**
 * The Templater instance
 */
const stringer = new Stringer()

export { stringer }