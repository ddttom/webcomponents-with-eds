import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment configuration
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['cloudflare-worker.js'],
      exclude: ['**/*.test.js', 'node_modules/**'],
    },
    // Timeout for integration tests
    testTimeout: 10000,
  },
});
