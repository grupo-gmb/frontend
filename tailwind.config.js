/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Evitar conflitos com MUI
      colors: {
        // Cores customizadas aqui
      },
    },
  },
  plugins: [],
  // Importante: configurar corePlugins para evitar conflitos com MUI
  corePlugins: {
    preflight: false,
  },
}