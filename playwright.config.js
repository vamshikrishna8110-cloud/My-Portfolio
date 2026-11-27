import { defineConfig } from '@playwright/test'
import { env as runtime } from 'node:process'

const baseURL = 'http://127.0.0.1:4181/My-Portfolio/'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    reducedMotion: 'reduce',
    launchOptions: runtime.PORTFOLIO_CHROMIUM ? { executablePath: runtime.PORTFOLIO_CHROMIUM } : {},
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4181 --strictPort',
    url: baseURL,
    reuseExistingServer: false,
  },
})
