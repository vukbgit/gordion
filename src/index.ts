// Copyright (c) vuk di Leonardo Venturini. All rights reserved. Licensed under the MIT license.

/**
 * A TypeScript web app engine
 * @remarks
 * This top level module re-exports inner modules
 * @packageDocumentation
 * @beta
 */

 import { logger } from "./logger"
 import { dIContainer } from "./di-container"
 import { router } from "./router"
 import http from 'http';

/**
 * Re-exports an instance of the {@link logger} class.
 * @public
 */
export { logger } from "./logger";

/**
 * Re-exports an instance of the {@link DIContainer} class.
 * @public
 */
export { dIContainer } from "./di-container";

/**
 * Re-exports an instance of the {@link router} class.
 * @public
 */
export { router } from "./router";

/**
 * Re-exports an instance of the {@link templater} class.
 * @public
 */
export { templater } from "./templater";

/**
 * Re-exports an instance of the {@link shellCommander} class.
 * @public
 */
export { shellCommander } from "./shell-commander";

/**
 * Exports the bootstrap function to be called by webapp
 * @public
 */
export async function bootstrap() {
  await dIContainer.registerServices()
  
  await router.registerRoutes()

  const port: number = Number(process.env.PORT);

  http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    router.resolveRoute(req, res)
  })
  //listen
  .listen(port)
  //start-up message
  .on('listening', () => {
    console.log(`Server running on port ${port}`);
  })
  //catch error
  .on('error', (error) => {
    console.log(`Error!`, error);
  })
}
