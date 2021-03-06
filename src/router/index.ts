/**
 * The router module handles routing using {@link https://www.npmjs.com/package/find-my-way | find-my-way}
 * @module
 * @beta
 */
 import http from 'http';
 import { logger } from '../logger'
 import FileHound from 'filehound';
 import FindMyWay from "find-my-way";
 import { dIContainer } from "../di-container"
 import { stringer } from "../stringer"
 
 /**
  * The Router class
  * @beta
  */
  export class Router {
   
   /**
    * The router instance from the external module
    */
    private router: any
 
   /**
    * Name of services configuration files
    */
    private routesFilesName: string = 'routes.json'
    
    /**
    * Constructor
    */
   constructor() {
     this.router = FindMyWay()
   }
   
   /**
    * Async generator that searches routes configuration files
    */
    private async *searchRoutes() {
     //find files
     const files = await FileHound.create()
     .paths('./' + (process.env.BUILD_FOLDER ?? 'dist'))
     .match(this.routesFilesName)
     .find()
     //build a map of promises
     const results = files.map(
       async (file: string) => {
         //import file
         const fileContent = await import(process.cwd() + '/' + file)
         //build an object with file path and routes definitions
         return {
           path: file,
           routes: fileContent.default
         }
       }
     )
     //loop and yeld results
     for(let result of results) {
       yield result;
     }
   }
 
   /**
    * Registers all of routes defined into configuration files
    */
   public async registerRoutes() {
     //loop files
     let routesNumber: number = 0
     for await (const routesFile of this.searchRoutes()) {
       //loop routes
       logger.debug(`routes registered from file ${routesFile.path}`);
       for(const route of routesFile.routes) {
         //validate route
         if(this.validateRoute(route)) {
           logger.debug(route);
           //register route
           this.registerRoute(route)
           //increment routes number
           routesNumber++
         } else {
           //invalid route
           logger.error(`invalid route in file ${routesFile.path}`, route);
         }
       }
     }
     if(routesNumber === 0) {
       logger.error('no routes registered')
     } else {
       logger.info(routesNumber, ' routes registered')
     }
   }
 
   /**
    * Validates a route
    * @param route - a Route object
    * @returns bool
    */
   private validateRoute(route: Route) {
     return(
       "methods" in route &&
       "route" in route &&
       "handler" in route &&
       "action" in route
     )
   }
 
   /**
    * Turns action to a service method name
    * @param asction
    * @returns the method name
    */
    public getServiceMethodName(action: string) {
      return stringer.camelCase(action)
    }

   /**
    * Registers a route
    * @param route - a Route object
    */
   private registerRoute(route: Route) {
    this.router.on(
      route.methods,
      route.route,
      (req: http.IncomingMessage, res: http.ServerResponse, params: { [key: string]: any }) => {
        const service = dIContainer.getService(route.handler)
        const methodName = this.getServiceMethodName(route.action)
        service[methodName](req, res, params)
      }
    )
   }
 
   /**
    * Resolves a route
    * @param req request
    * @param res response
    * @returns void
    */
   public resolveRoute(req: http.IncomingMessage, res: http.ServerResponse) {
     this.router.lookup(req, res)
   }
 }
 
 /**
  * The Router instance
  */
  const router = new Router()
 
 export { router }
 
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
 