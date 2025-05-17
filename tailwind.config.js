/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))', // #2D2D2D
        input: 'hsl(var(--input))', // #2D2D2D (o un gris más claro para el fondo del input)
        ring: 'hsl(var(--ring))', // accent-green #72BF44
        background: 'hsl(var(--background))', // #141414
        foreground: 'hsl(var(--foreground))', // #FFFFFF
        primary: {
          DEFAULT: 'hsl(var(--primary))', // accent-green #72BF44
          foreground: 'hsl(var(--primary-foreground))', // #FFFFFF or #141414 depending on contrast
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // accent-blue #0073E6
          foreground: 'hsl(var(--secondary-foreground))', // #FFFFFF
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // #A3A3A3
          foreground: 'hsl(var(--muted-foreground))', // #141414 (para texto sobre fondo muted)
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // accent-green #72BF44
          foreground: 'hsl(var(--accent-foreground))', // #FFFFFF
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))', // #181818
          foreground: 'hsl(var(--popover-foreground))', // #FFFFFF
        },
        card: {
          DEFAULT: 'hsl(var(--card))', // #181818
          foreground: 'hsl(var(--card-foreground))', // #FFFFFF
        },
        'cuevana-green': '#72BF44',
        'cuevana-blue': '#0073E6',
        'cuevana-dark': '#141414',
        'cuevana-medium-dark': '#181818',
        'cuevana-light-gray': '#A3A3A3',
        'cuevana-border': '#2D2D2D',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['"Inter", sans-serif'], // Un ejemplo, Cuevana usa fuentes comunes de sistema
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};