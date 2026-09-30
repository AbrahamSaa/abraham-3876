import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  server: {
    https: {
      key: readFileSync('.cert/key.pem'),
      cert: readFileSync('.cert/cert.pem'),
    },
    proxy: { "/api": "http://localhost:3001" },
  },
})
