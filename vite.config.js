import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
      dts: 'src/auto-imports.d.ts',
      eslintrc: { enabled: true },
    }),

    // 自动注册组件
    Components({
      dts: 'src/components.d.ts',

      // 自动扫描的组件目录（不写默认 src/components）
      dirs: ['src/components'],

      // UI 库按需加载（不需要就删）
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 80,
  },
})
