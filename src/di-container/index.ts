/**
 * The di-container module handles dependencies injection using {@link https://www.npmjs.com/package/bottlejs | bottlejs}
 * @module
 * @beta
 */
import FileHound from 'filehound';
import Bottle from "bottlejs"
import { logger } from '../logger'

/**
 * The DI Container class
 * @beta
 */
export class DIContainer {
  
  /**
   * The DI Container instance from the external module
   */
  private diContainer: any
  
  /**
   * Name of services configuration files
   */
   private servicesFilesName: string = 'services.js'
  
  /**
   * Constructor
   */
  constructor() {
    this.diContainer = new Bottle()
  }

  /**
   * Async generator that searches services configuration files
   */
  private async *searchServices() {
    //find files
    const files = await FileHound.create()
    .paths('./' + (process.env.BUILD_FOLDER ?? 'dist'))
    .match(this.servicesFilesName)
    .find()
    //build a map of promises
    const requests = files.map((file: string) => import(process.cwd() + '/' + file))
    //loop and yeld promises
    for(let request of requests) {
      yield request;
    }
  }

  /**
   * Registers all of services defined into configuration files
   */
  public async registerServices() {
    //loop files
    for await (const servicesFile of this.searchServices()) {
      //loop file services
      for(const service of servicesFile.default) {
        this.registerService(service.label, service.service)
      }
    }
    logger.info('all services registered!')
  }

  /**
   * Registers a service
   * @param label service label
   * @param constructor function or class definition
   */
  private registerService(label: string, constructor: any) {
    this.diContainer.service(label, constructor)
  }

  /**
   * Gets a service
   * @param label service label
   * @returns the service instance
   */
  public getService(label: string) {
    return this.diContainer.container[label]
  }

  /**
   * Gets a service method
   * @param label service label
   * @param method service method name
   * @returns the service method return
   */
   public getServiceMethod(label: string, method: string) {
    return this.diContainer.container[label][method]
  }
}

/**
 * The DI Container instance
 */
const dIContainer = new DIContainer()

export { dIContainer }