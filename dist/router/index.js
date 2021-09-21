"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.Router = void 0;

var _logger = require("../logger");

var _filehound = _interopRequireDefault(require("filehound"));

var _findMyWay = _interopRequireDefault(require("find-my-way"));

var _diContainer = require("../di-container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The Router class
 * @beta
 */
class Router {
  /**
   * The router instance from the external module
   */

  /**
   * Name of services configuration files
   */
  routesFilesName = 'routes.json';
  /**
  * Constructor
  */

  constructor() {
    this.router = (0, _findMyWay.default)();
  }
  /**
   * Async generator that searches routes configuration files
   */


  async *searchRoutes() {
    //find files
    const files = await _filehound.default.create().paths('./' + (process.env.BUILD_FOLDER ?? 'dist')).match(this.routesFilesName).find(); //build a map of promises

    const results = files.map(async file => {
      //import file
      const fileContent = await Promise.resolve(`${process.cwd() + '/' + file}`).then(s => _interopRequireWildcard(require(s))); //build an object with file path and routes definitions

      return {
        path: file,
        routes: fileContent.default
      };
    }); //loop and yeld results

    for (let result of results) {
      yield result;
    }
  }
  /**
   * Registers all of routes defined into configuration files
   */


  async registerRoutes() {
    //loop files
    let routesNumber = 0;

    for await (const routesFile of this.searchRoutes()) {
      //loop routes
      _logger.logger.debug(`routes registered from file ${routesFile.path}`);

      for (const route of routesFile.routes) {
        //validate route
        if (this.validateRoute(route)) {
          //register route
          this.registerRoute(route);

          _logger.logger.debug(route); //increment routes number


          routesNumber++;
        } else {
          //invalid route
          _logger.logger.error(`invalid route in file ${routesFile.path}`, route);
        }
      }
    }

    if (routesNumber === 0) {
      _logger.logger.error('no routes registered');
    } else {
      _logger.logger.info(routesNumber, ' routes registered');
    }
  }
  /**
   * Validates a route
   * @param route - a Route object
   * @returns bool
   */


  validateRoute(route) {
    return "methods" in route && "route" in route && "handler" in route && "action" in route;
  }
  /**
   * Registers a route
   * @param route - a Route object
   */


  registerRoute(route) {
    this.router.on(route.methods, route.route, _diContainer.dIContainer.getServiceMethod(route.handler, route.action));
  }
  /**
   * Resolves a route
   * @param req request
   * @param res response
   * @returns void
   */


  resolveRoute(req, res) {
    this.router.lookup(req, res);
  }

}
/**
 * The Router instance
 */


exports.Router = Router;
const router = new Router();
/**
 * Route interface 
 */

exports.router = router;