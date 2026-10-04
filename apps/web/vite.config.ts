import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readFileSync } from 'node:fs'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  // The local HTTPS cert is only needed (and only present) when running the dev server.
  server: command === 'serve' ? {
    https: existsSync('.cert/key.pem') ? {
      key: readFileSync('.cert/key.pem'),
      cert: readFileSync('.cert/cert.pem'),
    } : undefined,
    proxy: { "/api": "http://localhost:3001" },
  } : undefined,
}))
