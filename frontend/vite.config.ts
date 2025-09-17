// Config
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    watch: {
      usePolling: true, // Améliore le hot reloading
      interval: 500,   // Fréquence de vérification des changements en milliseconde
    },
    hmr: {
      port: 7000,
      path: "/hmr",
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
