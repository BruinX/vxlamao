import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

// UI 库示例（可选）
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // 自动导入 API（ref、computed...）
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      dirs: ['src/api'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: { enabled: true },
    }),

    // 自动注册组件
    Components({
      // UI 库按需加载（不需要就删）
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',

      // 自动扫描的组件目录（不写默认 src/components）
      dirs: ['src/components'],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 80,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'), // 顺手留一个
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "~/assets/element.scss" as *;`,
  //     },
  //   },
  // },
})
