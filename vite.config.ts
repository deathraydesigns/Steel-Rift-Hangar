import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
    base: '/Steel-Rift-Hangar/',
    build: {
        outDir: 'dist',
    },
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [
                path.resolve(__dirname, 'public', 'icons'),
            ],
        }),
        vue(),
        vueDevTools(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                importers: [
                    // ...
                ],
            },
        },
    },
});
