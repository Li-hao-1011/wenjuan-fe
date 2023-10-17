import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [bundleAnalyzer({}), react()],
  server: {
    port: 8000, // 开发环境启动的端口
    host: '0.0.0.0',
    // open: true, // 项目启动时自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:8001', // 当遇到 /api 路径时
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // 一般情况下，配置上面两个即可
        // secure: false,      // 如果是 https 接口，需要配置这个参数
        // rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('@dnd-kit')) {
            return 'dnd-kit-chunk'
          }
          /* @ant-design/icons */
          if (id.includes('@ant-design/icons')) {
            return 'antd-icon-chunk'
          }
          if (id.includes('recharts')) {
            return 'recharts-chunk'
          }
          if (id.includes('antd')) {
            return 'antd-chunk'
          }
          if (id.includes('react-dom')) {
            return 'react-dom-chunk'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
