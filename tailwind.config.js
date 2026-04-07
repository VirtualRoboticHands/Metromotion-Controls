/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        off: '#f7f6f3',
        off2: '#f0ede8',
        ink: '#181714',
        ink2: '#3a3733',
        muted: '#7a7671',
        muted2: '#b0aca6',
        border: '#e8e4de',
        border2: '#d4cfc8',
        red: '#c8281e',
        'red-dark': '#a8201a',
        'red-light': '#f7ecea',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(48px, 5.2vw, 72px)',
        'section': 'clamp(34px, 3.8vw, 52px)',
      },
      letterSpacing: {
        'label': '0.14em',
        'tag': '0.06em',
        'nav': '0.07em',
      },
    },
  },
  plugins: [],
}
