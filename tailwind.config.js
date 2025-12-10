/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', '"DotGothic16"', 'cursive'],
      },
      colors: {
        retro: {
          bg: '#202020',
          dark: '#101010',
          light: '#f0f0f0',
          primary: '#ff004d',
          secondary: '#00e756',
          accent: '#29adff',
          yellow: '#fff024',
        }
      }
    },
  },
  plugins: [],
}
