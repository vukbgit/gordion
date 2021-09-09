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
export { logger } from "./logger";

/**
 * Re-exports an instance of the {@link diContainer} class.
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