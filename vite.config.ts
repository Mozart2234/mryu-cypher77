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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk: React core libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // QR code libraries (used in CheckIn and InvitationPass)
          'vendor-qr': ['qrcode.react', 'html5-qrcode'],
          // Supabase (used in admin and data operations)
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Increase chunk size warning limit (we're optimizing intentionally)
    chunkSizeWarningLimit: 600,
  },
})
