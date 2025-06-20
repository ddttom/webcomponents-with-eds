import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5174,
    strictPort: true,
    open: true,
    host: true,
    proxy: {
      '/slides': {
        target: 'https://allabout.network',
        changeOrigin: true,
        secure: true
      },
      '/media': {
        target: 'https://allabout.network',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    lib: {
      entry: 'shoelace-card.js',
      name: 'ShoelaceCard',
      fileName: () => 'shoelace-card.js',
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      external: [], // Bundle everything, no externals
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined // Single file output
      }
    },
    minify: 'esbuild',
    target: 'es2020',
    emptyOutDir: true
  }
});
