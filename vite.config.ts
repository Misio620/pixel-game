import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative path for assets to work in any subdirectory (GitHub Pages safe)
  base: './',
})
