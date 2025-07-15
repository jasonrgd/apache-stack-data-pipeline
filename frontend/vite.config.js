import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/druid': 'http://router:8888'
    }
  },
  plugins: [vue()],
})
