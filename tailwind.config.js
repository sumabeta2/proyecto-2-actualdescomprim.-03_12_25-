/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'heartbeat-slow': 'heartbeat-slow 2s ease-in-out infinite',
        'ecg-flow': 'ecg-flow 2s linear infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'heartbeat-slow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'ecg-flow': {
          '0%': { strokeDashoffset: '500' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}