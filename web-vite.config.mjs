import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const requireFromWeb = createRequire(path.join(here, 'app/web/package.json'));
const tailwindcss = requireFromWeb('@tailwindcss/vite').default;
const react = requireFromWeb('@vitejs/plugin-react').default;

export default {
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.join(here, 'app/app/src'),
    },
  },
  build: {
    outDir: 'dist',
  },
};
