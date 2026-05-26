/**
 * Caesar AI Logo Component
 *
 * Design Philosophy:
 * - Futuristic "C" emblem representing transformation
 * - Subtle crown/laurel inspiration from Roman Empire
 * - AI-inspired geometric lines extending from the C
 * - Premium metallic silver with electric blue glow
 * - Minimalist luxury aesthetic like Tesla/Apple
 *
 * Symbol Elements:
 * 1. Stylized "C" - Main focal point, represents "Caesar" and "Change"
 * 2. Crown peaks - Subtle Roman emperor authority
 * 3. AI geometric lines - Technology and intelligence
 * 4. Inner core - Neural network / transformation center
 * 5. Outer ring segments - Evolution and progress
 */

export default function CaesarLogo({ size = 44, className = '', animated = true }: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow effect */}
      <div
        className="absolute rounded-2xl blur-lg transition-opacity duration-300"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
          opacity: animated ? 0.4 : 0.3,
        }}
      />

      {/* Main logo container */}
      <div
        className="relative rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          width: size * 0.88,
          height: size * 0.88,
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 4px 20px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Inner gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1), rgba(6,182,212,0.05))',
          }}
        />

        {/* Main SVG Logo */}
        <svg
          viewBox="0 0 120 120"
          className="relative z-10"
          style={{ width: size * 0.58, height: size * 0.58 }}
        >
          <defs>
            {/* Metallic silver gradient */}
            <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="25%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="75%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            {/* Electric blue glow gradient */}
            <linearGradient id="electricBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Purple accent gradient */}
            <linearGradient id="purpleAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Cyan tech gradient */}
            <linearGradient id="cyanTech" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft glow filter */}
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main "C" emblem - Futuristic geometric design */}
          <g filter="url(#glow)">
            <path
              d="M85 32
                 C68 18, 42 18, 28 38
                 C14 58, 14 62, 28 82
                 C42 102, 68 102, 85 88
                 L78 76
                 C66 88, 48 88, 38 76
                 C28 64, 28 56, 38 44
                 C48 32, 66 32, 78 44
                 Z"
              fill="url(#metallicSilver)"
              stroke="url(#electricBlue)"
              strokeWidth="2"
            />
          </g>

          {/* Crown peaks - Roman emperor authority */}
          <g filter="url(#softGlow)">
            {/* Center crown peak */}
            <path
              d="M42 24 L56 10 L70 24"
              fill="none"
              stroke="url(#metallicSilver)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Crown accent lines */}
            <path
              d="M38 28 L50 16"
              fill="none"
              stroke="url(#electricBlue)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M62 16 L74 28"
              fill="none"
              stroke="url(#electricBlue)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* AI geometric extension lines */}
          <g filter="url(#softGlow)">
            {/* Upper right AI line */}
            <line
              x1="88"
              y1="36"
              x2="105"
              y2="20"
              stroke="url(#electricBlue)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Lower right AI line */}
            <line
              x1="88"
              y1="84"
              x2="105"
              y2="100"
              stroke="url(#cyanTech)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Secondary tech lines */}
            <line
              x1="92"
              y1="40"
              x2="102"
              y2="30"
              stroke="url(#purpleAccent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <line
              x1="92"
              y1="80"
              x2="102"
              y2="90"
              stroke="url(#purpleAccent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Inner core / transformation center */}
          <g>
            {/* Outer ring */}
            <circle
              cx="56"
              cy="60"
              r="14"
              fill="none"
              stroke="url(#electricBlue)"
              strokeWidth="1.5"
              opacity="0.4"
            />
            {/* Inner ring */}
            <circle
              cx="56"
              cy="60"
              r="8"
              fill="none"
              stroke="url(#metallicSilver)"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Core */}
            <circle
              cx="56"
              cy="60"
              r="4"
              fill="url(#electricBlue)"
              filter="url(#softGlow)"
            />
            {/* Pulse dot */}
            <circle
              cx="56"
              cy="60"
              r="2"
              fill="#ffffff"
              opacity="0.8"
            />
          </g>

          {/* Empire laurel hints - subtle curved lines */}
          <g opacity="0.4">
            <path
              d="M20 50 Q14 60, 20 70"
              fill="none"
              stroke="url(#metallicSilver)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M22 46 Q12 60, 22 74"
              fill="none"
              stroke="url(#purpleAccent)"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* Animated shimmer effect */}
        {animated && (
          <div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
              style={{
                transform: 'translateX(-100%)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Caesar Logo Mark - Simplified version for favicons/app icons
 * Just the iconic "C" emblem with crown
 */
export function CaesarLogoMark({ size = 32, className = '' }: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        className="relative z-10"
        style={{ width: size, height: size }}
      >
        <defs>
          <linearGradient id="markGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="markMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="markGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main C emblem */}
        <path
          d="M85 32
             C68 18, 42 18, 28 38
             C14 58, 14 62, 28 82
             C42 102, 68 102, 85 88
             L78 76
             C66 88, 48 88, 38 76
             C28 64, 28 56, 38 44
             C48 32, 66 32, 78 44
             Z"
          fill="url(#markGradient)"
          filter="url(#markGlow)"
        />

        {/* Crown peaks */}
        <path
          d="M42 24 L56 10 L70 24"
          fill="none"
          stroke="url(#markMetallic)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* AI extension lines */}
        <line x1="88" y1="36" x2="105" y2="20" stroke="url(#markGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="88" y1="84" x2="105" y2="100" stroke="url(#markGradient)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Core */}
        <circle cx="56" cy="60" r="6" fill="url(#markMetallic)" opacity="0.9" />
      </svg>
    </div>
  );
}

/**
 * Caesar Logo Icon - Minimal version for very small sizes
 */
export function CaesarLogoIcon({ size = 16, className = '' }: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 16 16"
        className="relative z-10"
        style={{ width: size, height: size }}
      >
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Simplified C */}
        <path
          d="M11 4
             C9 2.5, 5.5 2.5, 4 5
             C2.5 7.5, 2.5 8.5, 4 11
             C5.5 13.5, 9 13.5, 11 12
             L10 10.5
             C8.5 11.5, 6.5 11.5, 5.5 10
             C4.5 8.5, 4.5 7.5, 5.5 6
             C6.5 4.5, 8.5 4.5, 10 6
             Z"
          fill="url(#iconGradient)"
        />
        {/* Crown hint */}
        <path
          d="M5.5 3.5 L8 1.5 L10.5 3.5"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Animated Caesar Logo - With entrance animation
 */
export function CaesarLogoAnimated({ size = 44, className = '' }: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <CaesarLogo size={size} animated={true} />
    </div>
  );
}
