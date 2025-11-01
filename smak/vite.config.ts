import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Småk',
        short_name: 'Småk',
        description: 'Småk är en mobil applikation som gör liftande säkrare och enklare för alla',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        lang: 'sv',
        categories: ['travel', 'social'],
        icons: [
          {
            src: '/assets/Logo_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/Logo_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false
      },
      '/media': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false
      }
    }

  }
})
