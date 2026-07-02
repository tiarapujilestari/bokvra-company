import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2B1B12',
          50: '#F6EFE9',
          100: '#E9D8CA',
          200: '#D3B296',
          300: '#B98B67',
          400: '#8F6544',
          500: '#5F4530',
          600: '#3C2415',
          700: '#2B1B12',
          800: '#1D120B',
          900: '#120B07',
        },
        caramel: {
          DEFAULT: '#C89665',
          light: '#E4C69B',
          dark: '#A8703F',
        },
        matcha: {
          DEFAULT: '#8CA05C',
          light: '#B7C889',
          dark: '#657440',
        },
        cream: {
          DEFAULT: '#FAF4EA',
          deep: '#F2E6D3',
        },
        ink: '#211815',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        drip: {
          '0%': { transform: 'translateY(-6px)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        drip: 'drip 1.8s ease-in infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
