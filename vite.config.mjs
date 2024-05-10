import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      mode: 'development',
      injectManifest: {
        globPatterns: ['**/*'],
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'firebase-messaging-sw.js',
      manifest: {
        name: 'TeleSpace',
        short_name: 'TeleSpace',
        description: 'A simple app to store unlimited data, based on telegram APIs.',
        theme_color: '#000000',
        icons: [
          {
            src: '/assets/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
