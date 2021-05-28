/// <reference types="Cypress" />

type CypressOptions = Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.ScreenshotOptions>;

interface Options extends CypressOptions {
    failureThreshold?: number;
    failureThresholdType?: 'percent' | 'pixel';
    customDiffConfig?: CustomDiffConfig;
}

interface CustomDiffConfig {
    threshold: number;
}

declare module 'cypress-image-snapshot/command' {
    export const addMatchImageSnapshotCommand: (options: Options) => void;
}

declare namespace Cypress {
    type ImageSnapshotOptions = Options;

    interface Chainable {
        matchImageSnapshot(name?: string, options?: Options): void;
    }
}
