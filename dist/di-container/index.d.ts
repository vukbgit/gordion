/**
 * The DI Container class
 * @beta
 */
export declare class DIContainer {
    /**
     * The DI Container instance from the external module
     */
    private diContainer;
    /**
     * Name of services configuration files
     */
    private servicesFilesName;
    /**
     * Constructor
     */
    constructor();
    /**
     * Async generator that searches services configuration files
     */
    private searchServices;
    /**
     * Registers all of services defined into configuration files
     */
    registerServices(): Promise<void>;
    /**
     * Registers a service
     * @param label service label
     * @param constructor function or class definition
     */
    private registerService;
    /**
     * Gets a service
     * @param label service label
     * @returns the service instance
     */
    getService(label: string): any;
}
/**
 * The DI Container instance
 */
declare const dIContainer: DIContainer;
export { dIContainer };
