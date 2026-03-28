import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      // Source lives under symlink → real path outside root; force deps from this project
      'pdfjs-dist': path.resolve(dirname, 'node_modules/pdfjs-dist'),
      mammoth: path.resolve(dirname, 'node_modules/mammoth'),
    },
  },
  server: {
    port: 5173,
    open: false,
    fs: {
      allow: [dirname, path.resolve(dirname, '..', 'career-compass-demo-main')],
    },
  },
  // pdfjs-dist + ?url worker breaks Vite 4 pre-bundle ("optimized info should be defined")
  optimizeDeps: {
    include: ['mammoth'],
    exclude: ['pdfjs-dist'],
  },
  build: {
    target: 'esnext',
  },
});
