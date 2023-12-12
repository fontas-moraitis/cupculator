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
                            }
                        }
                    }
                ]
            }
        }),
        viteTsconfigPaths(),
    ],
});
