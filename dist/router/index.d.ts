/// <reference types="node" />
/**
 * The router module handles routing using {@link https://www.npmjs.com/package/find-my-way | find-my-way}
 * @module
 * @beta
 */
import http from 'http';
/**
 * The Router class
 * @beta
 */
export declare class Router {
    /**
     * The router instance from the external module
     */
    private router;
    /**
     * Name of services configuration files
     */
    private routesFilesName;
    /**
    * Constructor
    */
    constructor();
    /**
     * Async generator that searches routes configuration files
     */
    private searchRoutes;
    /**
     * Registers all of routes defined into configuration files
     */
    registerRoutes(): Promise<void>;
    /**
     * Validates a route
     * @param route - a Route object
     * @returns bool
     */
    private validateRoute;
    /**
     * Registers a route
     * @param route - a Route object
     */
    private registerRoute;
    /**
     * Resolves a route
     * @param req request
     * @param res response
     * @returns void
     */
    resolveRoute(req: http.IncomingMessage, res: http.ServerResponse): void;
}
/**
 * The Router instance
 */
declare const router: Router;
export { router };
/**
 * Route interface
 */
export interface Route {
    /**
     * Request method the route responds to
     */
    "methods": string[];
    /**
     * The route definition / regular expression
     */
    "route": string;
    /**
     * Handler label
     */
    "handler": string;
    /**
     * Action associated to route, a handler method name
     */
    "action": string;
}
