import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, '/src'), '~@': path.resolve(__dirname, '/src') },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3001,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
