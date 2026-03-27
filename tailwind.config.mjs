import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Offizielle Footballschland Brand-Farben (Deutschlandflagge)
        rot: {
          DEFAULT: '#e31837',
          light: '#f03050',
          dark: '#b81229',
        },
        gold: {
          DEFAULT: '#ffb81c',
          light: '#ffc94d',
          dark: '#cc9000',
          muted: '#ffb81c33',
        },
        brand: {
          black: '#231f20',
          dark: '#1a1617',
          gray: '#2d2829',
          light: '#f5f0eb',  // Creme für leseoptimierte Sektionen
        },
        // Legacy aliases (damit bestehende Klassen nicht brechen)
        crimson: {
          DEFAULT: '#e31837',
          light: '#f03050',
          dark: '#b81229',
        },
      },
      fontFamily: {
        display: ['"Antonio"', 'Impact', 'Arial Black', 'sans-serif'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}
