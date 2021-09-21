"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootstrap = bootstrap;
Object.defineProperty(exports, "dIContainer", {
  enumerable: true,
  get: function () {
    return _diContainer.dIContainer;
  }
});
Object.defineProperty(exports, "router", {
  enumerable: true,
  get: function () {
    return _router.router;
  }
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return _logger.logger;
  }
});
Object.defineProperty(exports, "templater", {
  enumerable: true,
  get: function () {
    return _templater.templater;
  }
});
Object.defineProperty(exports, "shellCommander", {
  enumerable: true,
  get: function () {
    return _shellCommander.shellCommander;
  }
});

var _diContainer = require("./di-container");

var _router = require("./router");

var _http = _interopRequireDefault(require("http"));

var _logger = require("./logger");

var _templater = require("./templater");

var _shellCommander = require("./shell-commander");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) vuk di Leonardo Venturini. All rights reserved. Licensed under the MIT license.

/**
 * A TypeScript web app engine
 * @remarks
 * This top level module re-exports inner modules
 * @packageDocumentation
 * @beta
 */

/**
 * Re-exports an instance of the {@link logger} class.
 * @public
 */

/**
 * Re-exports an instance of the {@link DIContainer} class.
 * @public
 */

/**
 * Re-exports an instance of the {@link router} class.
 * @public
 */

/**
 * Re-exports an instance of the {@link templater} class.
 * @public
 */

/**
 * Re-exports an instance of the {@link shellCommander} class.
 * @public
 */

/**
 * Exports the bootstrap function to be called by webapp
 * @public
 */
async function bootstrap() {
  await _diContainer.dIContainer.registerServices();
  await _router.router.registerRoutes();
  const port = Number(process.env.PORT);

  _http.default.createServer((req, res) => {
    _router.router.resolveRoute(req, res);
  }) //listen
  .listen(port) //start-up message
  .on('listening', () => {
    console.log(`Server running on port ${port}`);
  }) //catch error
  .on('error', error => {
    console.log(`Error!`, error);
  });
}