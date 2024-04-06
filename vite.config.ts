import path from 'path'
import { UserConfigExport, ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import ElementPlus from 'unplugin-element-plus/dist/vite.js'

const pathSrc = path.resolve(__dirname, 'src')

// import { ElementPlusResolver } from 'unplugin-vue-components'
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  // eslint-disable-next-line
  const isBuild = command === 'build'
  return defineConfig({
    plugins: [
      vue(),
      vueJsx({}),
      Icons({
        autoInstall: true
      }),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        eslintrc: {
          enabled: false // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        }
      }),
      ElementPlus({}),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],

        dts: path.resolve(pathSrc, 'components.d.ts')
      })
    ],
    // @ts-ignore
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        additionalData: `@use "@/styles/mixin.scss" as *;`
      }
    },
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types'
      }
    }
    // server: {
    //   proxy: {
    //     '/test-api': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/test-api/, '')
    //     }
    //   }
    // }
  })
}
