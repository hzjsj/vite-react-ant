import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,  //注意，这一句是在less对象中，写在外边不起作用
        // modifyVars: { //在这里进行主题的修改，参考官方配置属性
        //   '@primary-color': '#1DA57A',
        // },
      }
    }
  },
})
