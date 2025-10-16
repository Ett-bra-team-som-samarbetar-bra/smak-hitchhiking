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
        name: 'småk hitchhiking',
        short_name: 'småk',
        theme_color: '#016D85',
        background_color: '#F3F2F8',
        display: 'standalone',
        orientation: 'portrait',        
        start_url: '/',
        icons: [
          {
            src: '/assets/Logo4.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/Logo5.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: true
  }
})
