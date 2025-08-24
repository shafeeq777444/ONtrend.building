import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // remove console.log in prod
        drop_debugger: true,  // remove debugger in prod
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // ✅ React core
          react: ['react', 'react-dom'],

          // ✅ React Query (global state & caching)
          reactQuery: ['@tanstack/react-query'],

          // ✅ i18next (translations, global use)
          i18next: ['i18next', 'react-i18next'],

          // ❌ Firebase excluded here (lazy-loaded → auto split)
          // firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
})
