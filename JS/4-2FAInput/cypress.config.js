import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 1000,
  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
  },
});
