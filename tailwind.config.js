/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf6',
          100: '#c5d0e8',
          200: '#9fb1d8',
          300: '#7892c8',
          400: '#587bbd',
          500: '#3864b1',
          600: '#2e559d',
          700: '#214282',
          800: '#152f67',
          900: '#0A0F1E',
          950: '#060a14',
        },
        brand: {
          blue: '#0F172A',
          teal: '#0EA5E9',
          purple: '#7C3AED',
          orange: '#F97316',
          'orange-light': '#FB923C',
          'teal-light': '#38BDF8',
          'purple-light': '#A78BFA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
        'gradient-orange': 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0F172A 0%, #0A0F1E 50%, #1a0533 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(124,58,237,0.1) 100%)',
      },
      animation: {
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'dash-travel': 'dashTravel 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'counter': 'counterUp 1s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '70%': { transform: 'scale(2)', opacity: '0' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        dashTravel: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(14,165,233,0.4), 0 0 10px rgba(14,165,233,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(14,165,233,0.8), 0 0 40px rgba(14,165,233,0.4), 0 0 60px rgba(124,58,237,0.3)' },
        },
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
