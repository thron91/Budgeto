/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#baddff',
          300: '#8bcafe',
          400: '#54adfa',
          500: '#2e8af4',
          600: '#1c6de8',
          700: '#1957d2',
          800: '#1b48aa',
          900: '#1c3e85',
          950: '#152759',
        },
        mint: {
          50: '#effef7',
          100: '#dafeef',
          200: '#b8fae0',
          300: '#82f5cb',
          400: '#48e7b0',
          500: '#22d095',
          600: '#15af7a',
          700: '#138563',
          800: '#146950',
          900: '#135644',
          950: '#07312a',
        },
        coral: {
          50: '#fff2f0',
          100: '#ffe4df',
          200: '#ffcdc4',
          300: '#ffab9c',
          400: '#ff7c65',
          500: '#fe5138',
          600: '#ea3820',
          700: '#c42a17',
          800: '#9f2518',
          900: '#82231a',
          950: '#460e09',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde58a',
          300: '#fbd24e',
          400: '#fab317',
          500: '#ea9708',
          600: '#c97305',
          700: '#a55308',
          800: '#87420d',
          900: '#723910',
          950: '#3e1d08',
        },
        lavender: {
          50: '#f4f3ff',
          100: '#ebebfe',
          200: '#d9d8fd',
          300: '#bcb8fc',
          400: '#9e8ff8',
          500: '#8163f2',
          600: '#6c45e7',
          700: '#5c34cf',
          800: '#4c2daa',
          900: '#402789',
          950: '#271a55',
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'medium': '0 6px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};