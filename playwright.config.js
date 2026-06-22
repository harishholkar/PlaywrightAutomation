// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  // testMatch: 'Raw.spec.js',
  /* To run specific test*/
  timeout: 30000,
  /* To override the default wait*/
  expect: {
    timeout: 5000
  },
  /* Assertion timeout*/
 // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: 1,
  /* Opt out of parallel tests on CI. */
  //workers: 50,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on', //on, off, retain-on-failure
        //viewport:{width:450,height:670},
        //...devices['iPhone 11'],
        //ignoreHttpsErros:true,
        //permissions:['geolocation'],
        //video:'retain-on-failure'
      }
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     headless: false,
    //     screenshot: 'on',
    //     trace: 'on', //on, off, retain-on-failure
    //   }
    // },

    // {
    //   name: 'safari',
    //   use: {
    //     browserName: 'webkit',
    //     headless: false,
    //     screenshot: 'on',
    //     trace: 'on', //on, off, retain-on-failure
    //   }
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

