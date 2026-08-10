// Added for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables

import {test as base} from '@playwright/test'

export type TestOptions = {
    globalsQaURL: string
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}]
})