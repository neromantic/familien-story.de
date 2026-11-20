import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5173";

export default defineConfig({
  testDir: "./tests/smoke",
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    launchOptions: {
      args: ["--no-proxy-server"],
    },
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "yarn dev",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});
