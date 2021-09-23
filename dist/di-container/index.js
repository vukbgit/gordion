"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dIContainer = exports.DIContainer = void 0;

var _filehound = _interopRequireDefault(require("filehound"));

var _bottlejs = _interopRequireDefault(require("bottlejs"));

var _logger = require("../logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The DI Container class
 * @beta
 */
class DIContainer {
  /**
   * The DI Container instance from the external module
   */

  /**
   * Name of services configuration files
   */
  servicesFilesName = 'services.js';
  /**
   * Constructor
   */

  constructor() {
    this.diContainer = new _bottlejs.default();
  }
  /**
   * Async generator that searches services configuration files
   */


  async *searchServices() {
    //find files
    const files = await _filehound.default.create().paths('./' + (process.env.BUILD_FOLDER ?? 'dist')).match(this.servicesFilesName).find(); //build a map of promises

    const requests = files.map(file => Promise.resolve(`${process.cwd() + '/' + file}`).then(s => _interopRequireWildcard(require(s)))); //loop and yeld promises

    for (let request of requests) {
      yield request;
    }
  }
  /**
   * Registers all of services defined into configuration files
   */


  async registerServices() {
    //loop files
    for await (const servicesFile of this.searchServices()) {
      //loop file services
      for (const service of servicesFile.default) {
        this.registerService(service.label, service.service);
      }
    }

    _logger.logger.info('all services registered!');
  }
  /**
   * Registers a service
   * @param label service label
   * @param constructor function or class definition
   */


  registerService(label, constructor) {
    this.diContainer.service(label, constructor);
  }
  /**
   * Gets a service
   * @param label service label
   * @returns the service instance
   */


  getService(label) {
    //return this.diContainer.container[label]
    const service = this.diContainer.container[label];
    return service;
  }

}
/**
 * The DI Container instance
 */


exports.DIContainer = DIContainer;
const dIContainer = new DIContainer();
exports.dIContainer = dIContainer;