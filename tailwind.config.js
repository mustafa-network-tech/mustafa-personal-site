/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#1E2228',
        secondary: '#242933',
        card: '#2B313D',
        primary: '#F2F4F8',
        sub: '#C6CCD8',
        muted: '#9CA3B0',
        accent: '#4F7CFF',
        divider: '#3A4150',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
