import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => url.pathname.includes('api'),
                        handler: "CacheFirst" as const,
                        options: {
                            cacheName: "api",
                            cacheableResponse: {
                                statuses: [0, 200]
                            },
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:svg)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                            }
                        },
                    }
                ]
            }
        }),
        viteTsconfigPaths(),
    ],
});
