/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Schibsted Grotesk', 'serif'],
        secondary: ['Unica One', 'sans-serif'],
      },
      fontSize: {
        '10xl': '15rem',
      },
      letterSpacing: {
        full: '2.5vw',
      },
      margin: {
        tracking: '-2.5vw', // this is needed because some browsers add additional spacing if you use letter-spacing property in CSS
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#333533',
          secondary: '#CFDBD5',
          accent: '#F5CB5C',
        },
      },
    ],
  },
}
