import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    },
    ssrManifest: true
  },
  ssr: {
    noExternal: ['react-router-dom', '@reduxjs/toolkit', 'react-redux'],
    external: []
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react-router-dom']
  }
})