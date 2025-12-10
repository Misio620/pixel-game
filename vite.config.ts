import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path must match the repository name for GitHub Pages assets to load correctly
  base: '/pixel-game/',
})
