/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        caesar: {
          black: '#0a0a0a',
          dark: '#111111',
          card: '#1a1a1a',
          border: '#2a2a2a',
          red: '#dc2626',
          'red-glow': '#ef4444',
          gold: '#d4a843',
          'gold-light': '#f0d078',
          'gold-dark': '#b8922e',
          white: '#f5f5f5',
          muted: '#888888',
          'glass': 'rgba(255,255,255,0.05)',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s both',
        'slide-up-delayed-2': 'slideUp 0.8s ease-out 0.4s both',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'counter': 'counter 2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220,38,38,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(220,38,38,0.6), 0 0 80px rgba(220,38,38,0.2)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(212,168,67,0.3)' },
          '50%': { borderColor: 'rgba(212,168,67,0.8)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, #dc2626 0%, #d4a843 50%, #dc2626 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
      },
    },
  },
  plugins: [],
};
