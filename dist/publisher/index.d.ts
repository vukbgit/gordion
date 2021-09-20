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
     * The current context
     */
    private context;
    /**
     * Possible contexts
     */
    private contexts;
    /**
     * Gets git status
     */
    private gitStatus;
    /**
     * Lets choosing files to be published
     */
    private gitSelectFilesToPublish;
    /**
     * Asks for GIT commit message
     */
    private gitAskCommitMessage;
    /**
     * Adds, commits and push to GIT repository
     * @param filesToPublish - messages
     * @param message
     */
    private gitPublish;
    /**
     * Handles publication to a GIT repository
     * @param context
     */
    publishToGIT(context: keyof typeof contexts): Promise<void>;
    /**
     * Lets choosing and bumps NPM version
     */
    private npmVersion;
    /**
     * Handles publication to NPM
     * @param context
     */
    publishToNPM(context: keyof typeof contexts): Promise<void>;
}
/**
 * The Publisher instance
 */
declare const publisher: Publisher;
export { publisher };
