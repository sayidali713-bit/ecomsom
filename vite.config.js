import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // Use rollup (not rolldown) compatible options
    },
  },
  // Ensure react-dom/client resolves correctly
  resolve: {
    alias: {},
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client'],
  },
})

