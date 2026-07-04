/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Navy Blue ramp — premium, expensive feel
        navy: {
          50: '#eef2f8',
          100: '#d5dde9',
          200: '#aebfd4',
          300: '#7e96b8',
          400: '#54719c',
          500: '#3a527d',
          600: '#2b3f63',
          700: '#1e2f4a',
          800: '#11203a',
          900: '#0a192f',
          950: '#050f1e',
        },
        // Gold accent ramp — luxurious highlights
        gold: {
          50: '#fdf9ec',
          100: '#faedc8',
          200: '#f5db8d',
          300: '#f0c75e',
          400: '#ecb73c',
          500: '#d99e21',
          600: '#b87d16',
          700: '#935e15',
          800: '#7a4b17',
          900: '#683e18',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(10, 25, 47, 0.25)',
        'glass-sm': '0 4px 16px 0 rgba(10, 25, 47, 0.15)',
        'glass-lg': '0 16px 48px 0 rgba(10, 25, 47, 0.30)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'gold-glow': '0 0 20px 0 rgba(236, 183, 60, 0.35)',
        'gold-glow-lg': '0 0 40px 0 rgba(236, 183, 60, 0.45)',
        'navy-glow': '0 0 24px 0 rgba(10, 25, 47, 0.40)',
        'premium': '0 20px 60px -10px rgba(10, 25, 47, 0.35), 0 0 0 1px rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '24px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 14s ease-in-out infinite',
        'float-slowest': 'float 20s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'rise': 'rise 0.5s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.15' },
          '50%': { transform: 'translateY(-30px) rotate(8deg)', opacity: '0.30' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px 0 rgba(236, 183, 60, 0.30)' },
          '50%': { boxShadow: '0 0 40px 0 rgba(236, 183, 60, 0.50)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
