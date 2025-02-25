import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['75c8-197-54-156-230.ngrok-free.app'] // إضافة المضيف هنا
  },
})
