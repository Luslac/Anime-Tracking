import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Setiap kali React manggil "/api", Vite bakal lempar ke Backend lu
      '/api': {
        target: 'http://localhost:3000', // Port Backend lu
        changeOrigin: true,
      }
    }
  }
})
