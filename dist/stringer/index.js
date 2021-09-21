"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringer = exports.Stringer = void 0;

var _camelCase = require("camel-case");

/**
 * The stringer module manipulates string
 * @module
 * @beta
 */

/**
 * The Stringer class
 * @beta
 */
class Stringer {
  /**
    * Formats 
    * @param route - a Route object
    */
  camelCase(action) {
    return (0, _camelCase.camelCase)(action);
  }

}
/**
 * The Templater instance
 */


exports.Stringer = Stringer;
const stringer = new Stringer();
exports.stringer = stringer;