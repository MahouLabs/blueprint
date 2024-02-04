import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { remixDevTools } from 'remix-development-tools/vite';
import remixConfig from './remix.config';

export default defineConfig({
  plugins: [remixDevTools(), remix({ ...remixConfig }), tsconfigPaths()],
});
