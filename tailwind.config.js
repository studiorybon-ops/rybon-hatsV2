/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontWeight: {
        hairline: 100,
        black: 900,
      },
      colors: {
        surface: {
          DEFAULT: 'oklch(0.021 0.003 250)',
          light: 'oklch(0.045 0.005 250)',
          lighter: 'oklch(0.07 0.008 250)',
        },
        accent: {
          DEFAULT: '#ffffff',
          muted: 'oklch(0.62 0.02 260)',
        },
        zinc: {
          950: 'oklch(0.021 0.003 250)',
          900: 'oklch(0.045 0.005 250)',
          800: 'oklch(0.185 0.008 260)',
          700: 'oklch(0.28 0.012 260)',
          600: 'oklch(0.37 0.015 260)',
          500: 'oklch(0.47 0.018 260)',
          400: 'oklch(0.62 0.02 260)',
          300: 'oklch(0.8 0.015 260)',
          200: 'oklch(0.87 0.01 260)',
          100: 'oklch(0.94 0.005 260)',
          50: 'oklch(0.97 0.003 260)',
        },
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
