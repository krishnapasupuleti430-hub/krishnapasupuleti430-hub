/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        caesar: {
          black: '#0B1020',
          dark: '#111827',
          darker: '#0B1020',
          card: '#1a1f35',
          border: '#2a3050',
          blue: '#3B82F6',
          'blue-light': '#60A5FA',
          'blue-glow': '#3B82F6',
          purple: '#8B5CF6',
          'purple-light': '#A78BFA',
          'purple-glow': '#8B5CF6',
          cyan: '#06B6D4',
          'cyan-light': '#22D3EE',
          'cyan-glow': '#06B6D4',
          gold: '#EAB308',
          'gold-light': '#FACC15',
          red: '#EF4444',
          white: '#F9FAFB',
          muted: '#94A3B8',
          'glass-blue': 'rgba(59, 130, 246, 0.08)',
          'glass-purple': 'rgba(139, 92, 246, 0.08)',
          'glass-cyan': 'rgba(6, 182, 212, 0.08)',
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
        'glow-pulse-blue': 'glowPulseBlue 4s ease-in-out infinite',
        'glow-pulse-purple': 'glowPulsePurple 4s ease-in-out infinite',
        'glow-pulse-cyan': 'glowPulseCyan 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s both',
        'slide-up-delayed-2': 'slideUp 0.8s ease-out 0.4s both',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'mesh-movement': 'meshMovement 20s ease-in-out infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(6, 182, 212, 0.3)' },
        },
        glowPulseBlue: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(59, 130, 246, 0.6), 0 0 100px rgba(59, 130, 246, 0.3)' },
        },
        glowPulsePurple: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(139, 92, 246, 0.6), 0 0 100px rgba(139, 92, 246, 0.3)' },
        },
        glowPulseCyan: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 100px rgba(6, 182, 212, 0.3)' },
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
          '0%, 100%': { borderColor: 'rgba(59, 130, 246, 0.3)' },
          '50%': { borderColor: 'rgba(139, 92, 246, 0.6)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        meshMovement: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(5%, 5%) rotate(5deg)' },
          '50%': { transform: 'translate(-5%, 10%) rotate(-5deg)' },
          '75%': { transform: 'translate(10%, -5%) rotate(3deg)' },
        },
        aurora: {
          '0%, 100%': { opacity: '0.3', backgroundPosition: '0% 50%' },
          '50%': { opacity: '0.6', backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0B1020 0%, #111827 50%, #0B1020 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.1) 0px, transparent 50%)',
        'aurora-gradient': 'linear-gradient(45deg, #0B1020, #1a1f35, #0B1020, #111827)',
      },
    },
  },
  plugins: [],
};
