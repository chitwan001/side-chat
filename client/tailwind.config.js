/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        notification: {
          '0%': {
            'left': '100%',
            'opacity': '1'
          },
          '8%': {
            'left': '78%',
            'opacity': '1'
          },
          '88%': {
            'left': '78%',
            'opacity': '1'
          },
          '100%': {
            'left': '78%',
            'opacity': '0'
          }

        },
        error: {
          '0%': {
            'top': '-70px',
            'opacity': '1'
          },
          '8%': {
            'top': '10px',
            'opacity': '1'
          },
          '88%': {
            'top': '10px',
            'opacity': '1'
          },
          '100%': {
            'top': '10px',
            'opacity': '0'
          }

        },
      },
      animation: {
        notification: 'notification 8s forwards',
        error: 'error 5s forwards',
      },
    },
  },
  plugins: [],
}

