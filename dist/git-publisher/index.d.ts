#!/usr/bin/env node
/**
 * Possible contexts
 * @beta
 */
export declare enum contexts {
    gordion = 0,
    webapp = 1
}
/**
 * GIT Publisher class
 * @beta
 */
export declare class GitPublisher {
    /**
     * The context
     */
    private context;
    private gitStatus;
    private selectFilesToPublish;
    private askGitCommitMessage;
    private gitPublish;
    publishToGIT(context: keyof typeof contexts): Promise<void>;
}
/**
 * The GIT Publisher instance
 */
declare const gitPublisher: GitPublisher;
export { gitPublisher };
