import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    root: "./src",
    base: "./",
    build: {
        outDir: "../dist",
        lib: {
            entry: './index.ts',
            name: 'Bootstrap Tabs',
            formats: ['es'],
            fileName: 'bootstrap-tabs'
        }
    },
    plugins: [
        dts()
    ],
    esbuild: {
        minifyIdentifiers: false,
        keepNames: true,
    },
});
