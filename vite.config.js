import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [NaiveUiResolver()],
        dirs: ['src/components'],
      }),
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          // custom
          '@vueuse/core',
          {
            //   : [
            //     // named imports
            //     'useMouse', // import { useMouse } from '@vueuse/core',
            //     // alias
            //     ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            //   ],
            axios: [
              // default imports
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
          },
        ],
        dirs: ['src/composables/**', 'src/stores'],
        dts: './src/auto-imports.d.ts',
      }),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_BASE_URL, //目标url
          changeOrigin: true, //支持跨域
          rewrite: path => path.replace(/^\/api/, ''),
          //重写路径,替换/api
        },
      },
    },
  };
});
