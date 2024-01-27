import {
  unstable_vitePlugin as remix,
  unstable_vitePluginAdapterCloudflare as cloudflare,
} from '@remix-run/dev';
import { remixDevTools } from 'remix-development-tools/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import remixConfig from './remix.config';

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      adapter: cloudflare(),
      ...remixConfig,
    }),
    tsconfigPaths(),
  ],
});
