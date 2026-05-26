export default function CaesarLogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-caesar-blue via-caesar-purple to-caesar-cyan blur-lg opacity-40"
        style={{ width: size, height: size }}
      />

      {/* Main logo container */}
      <div
        className="relative rounded-xl bg-gradient-to-br from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center justify-center overflow-hidden"
        style={{ width: size * 0.85, height: size * 0.85 }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
        />

        {/* The futuristic C */}
        <svg
          viewBox="0 0 100 100"
          className="relative z-10"
          style={{ width: size * 0.5, height: size * 0.5 }}
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#e0e7ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* The stylized C - combining Roman laurel with futuristic geometry */}
          <path
            d="M70 25
               C55 15, 35 15, 25 30
               C15 45, 15 55, 25 70
               C35 85, 55 85, 70 75
               L65 65
               C55 72, 42 72, 35 65
               C28 58, 28 42, 35 35
               C42 28, 55 28, 65 35
               Z"
            fill="url(#logoGradient)"
            stroke="none"
          />

          {/* AI accent - geometric lines */}
          <line x1="72" y1="28" x2="85" y2="15" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="72" y1="72" x2="85" y2="85" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

          {/* Crown accent */}
          <path
            d="M40 18 L50 10 L60 18"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Inner circuit pattern */}
          <circle cx="50" cy="50" r="8" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
          <circle cx="50" cy="50" r="3" fill="white" opacity="0.5" />
        </svg>

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
          style={{
            transform: 'translateX(-100%)',
            animation: 'shimmer 3s linear infinite'
          }}
        />
      </div>
    </div>
  );
}

export function CaesarLogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="relative z-10"
        style={{ width: size, height: size }}
      >
        <defs>
          <linearGradient id="logoMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The stylized C */}
        <path
          d="M70 25
             C55 15, 35 15, 25 30
             C15 45, 15 55, 25 70
             C35 85, 55 85, 70 75
             L65 65
             C55 72, 42 72, 35 65
             C28 58, 28 42, 35 35
             C42 28, 55 28, 65 35
             Z"
          fill="url(#logoMarkGradient)"
          filter="url(#glow)"
        />

        {/* AI accent lines */}
        <line x1="72" y1="28" x2="85" y2="15" stroke="url(#logoMarkGradient)" strokeWidth="3" strokeLinecap="round" />
        <line x1="72" y1="72" x2="85" y2="85" stroke="url(#logoMarkGradient)" strokeWidth="3" strokeLinecap="round" />

        {/* Crown */}
        <path
          d="M40 18 L50 10 L60 18"
          fill="none"
          stroke="url(#logoMarkGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
