import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts on purpose: that one reads the local HTTPS certs (.cert/),
// which don't exist on CI or a fresh clone.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
