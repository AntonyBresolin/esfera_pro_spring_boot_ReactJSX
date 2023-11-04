/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          highlight: '#6502D4',
          contrast: '#3D0053'
        },
        amber: '#F7BD2E',
        fiels: '#F0F0F7',
      },
      fontFamily: {
        body: ['Roboto']
      }
    },
  },
  plugins: [],
}