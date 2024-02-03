import {
  unstable_cloudflarePreset as cloudflare,
  unstable_vitePlugin as remix,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { remixDevTools } from 'remix-development-tools/vite';
import remixConfig from './remix.config';

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      presets: [cloudflare()],
      ...remixConfig,
    }),
    tsconfigPaths(),
  ],
  ssr: {
    resolve: {
      externalConditions: ['workerd', 'worker'],
    },
  },
});
