import vue from '@vitejs/plugin-vue';
import { BootstrapVueNextResolver } from 'bootstrap-vue-next';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vitePluginSvgsIcons from 'vite-plugin-svgs-icons';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
    base: '/Steel-Rift-Hangar/',
    build: {
        outDir: 'dist',
    },
    plugins: [
        vitePluginSvgsIcons({
            dir: path.resolve(__dirname, 'public', 'icons'),
        }),
        vue(),
        vueDevTools(),
        Components({
            dts: true,
            resolvers: [BootstrapVueNextResolver()],
        }),
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
