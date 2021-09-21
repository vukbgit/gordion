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
export declare function bootstrap(): Promise<void>;
