#!/usr/bin/env node
/**
 * Possible contexts
 * @beta
 */
declare enum contexts {
    gordion = 0,
    webapp = 1
}
/**
 * Publisher class for GIT and NPM
 * @beta
 */
export declare class Publisher {
    /**
     * The context
     */
    private context;
    private contexts;
    private gitStatus;
    private gitSelectFilesToPublish;
    private gitAskCommitMessage;
    private gitPublish;
    publishToGIT(context: keyof typeof contexts): Promise<void>;
}
/**
 * The Publisher instance
 */
declare const publisher: any;
export { publisher };
