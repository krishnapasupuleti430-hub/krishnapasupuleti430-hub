import { TrendingUp, Award, Flame, Heart, ArrowRight } from 'lucide-react';
import { useInView, useCountUp } from '../hooks/useAnimations';

function TransformationCard({ from, to, name, duration, stats }: {
  from: string;
  to: string;
  name: string;
  duration: string;
  stats: { label: string; value: string; color: string }[];
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`glass-strong rounded-2xl p-6 card-3d group transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-caesar-border to-caesar-dark flex items-center justify-center text-2xl mb-2 border border-caesar-border">
            {from}
          </div>
          <p className="text-[10px] text-caesar-muted uppercase tracking-wider">Before</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="w-5 h-5 text-caesar-red" />
          <span className="text-[10px] text-caesar-gold font-medium">{duration}</span>
        </div>
        <div className="flex-1 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-caesar-red/20 to-caesar-gold/20 flex items-center justify-center text-2xl mb-2 border border-caesar-gold/30 glow-gold">
            {to}
          </div>
          <p className="text-[10px] text-caesar-gold uppercase tracking-wider">After</p>
        </div>
      </div>

      <h4 className="text-sm font-bold text-caesar-white mb-4">{name}</h4>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-xl p-3 text-center">
            <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-caesar-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementBadge({ icon: Icon, label, unlocked }: { icon: React.ElementType; label: string; unlocked: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${unlocked ? 'glass-gold glow-gold' : 'glass opacity-40'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked ? 'bg-caesar-gold/20' : 'bg-caesar-border'}`}>
        <Icon className={`w-6 h-6 ${unlocked ? 'text-caesar-gold' : 'text-caesar-muted'}`} />
      </div>
      <span className={`text-[10px] font-medium text-center ${unlocked ? 'text-caesar-gold' : 'text-caesar-muted'}`}>{label}</span>
    </div>
  );
}

export default function Transformations() {
  const { ref, isInView } = useInView(0.1);
  const transformed = useCountUp(15000, 2000, 0, isInView);
  const muscleGained = useCountUp(8, 2000, 0, isInView);

  const transformations = [
    {
      from: '🧑‍🦱',
      to: '💪',
      name: 'Rahul - Skinny to Muscular',
      duration: '5 months',
      stats: [
        { label: 'Weight', value: '+16kg', color: 'text-caesar-gold' },
        { label: 'Protein', value: '120g/day', color: 'text-caesar-red' },
        { label: 'Budget', value: 'Rs.150/d', color: 'text-green-400' },
      ],
    },
    {
      from: '🧑',
      to: '🏃',
      name: 'Priya - Fat Loss Journey',
      duration: '4 months',
      stats: [
        { label: 'Fat Lost', value: '-12kg', color: 'text-caesar-red' },
        { label: 'Streak', value: '120 days', color: 'text-caesar-gold' },
        { label: 'Confidence', value: 'Max', color: 'text-blue-400' },
      ],
    },
    {
      from: '🧑‍🎓',
      to: '🏋️',
      name: 'Arjun - Hostel Transformation',
      duration: '6 months',
      stats: [
        { label: 'Muscle', value: '+10kg', color: 'text-caesar-gold' },
        { label: 'Budget', value: 'Rs.100/d', color: 'text-green-400' },
        { label: 'AI Meals', value: '540+', color: 'text-caesar-red' },
      ],
    },
  ];

  const badges = [
    { icon: Flame, label: '7-Day Streak', unlocked: true },
    { icon: TrendingUp, label: 'First 5kg', unlocked: true },
    { icon: Award, label: '30-Day Champ', unlocked: true },
    { icon: Heart, label: '100 Meals', unlocked: true },
    { icon: Flame, label: '100 Streak', unlocked: false },
    { icon: Award, label: 'Elite Body', unlocked: false },
  ];

  return (
    <section id="transformations" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-caesar-red/3 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-caesar-red" />
            <span className="text-xs font-medium text-caesar-red uppercase tracking-wider">Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Your Journey</span>
            <br />
            <span className="text-gradient-red">Starts Here</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            Real transformations powered by AI. From skinny to muscular, from fat to fit - Caesar makes it possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {transformations.map((t, i) => (
            <TransformationCard key={i} {...t} />
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-bold text-center text-caesar-white mb-8">
            Achievement Badges & Gamification
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {badges.map((badge, i) => (
              <AchievementBadge key={i} {...badge} />
            ))}
          </div>
          <p className="text-center text-xs text-caesar-muted mt-6">
            Earn badges by staying consistent. Unlock achievements as you transform. AI tracks every milestone.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="glass-strong rounded-2xl p-8 text-center glow-red">
            <p className="text-4xl font-black text-gradient-red mb-2">
              {isInView ? transformed.toLocaleString() : '0'}+
            </p>
            <p className="text-sm text-caesar-muted">Lives Transformed</p>
          </div>
          <div className="glass-strong rounded-2xl p-8 text-center glow-gold">
            <p className="text-4xl font-black text-gradient-gold mb-2">
              {isInView ? muscleGained : '0'}kg
            </p>
            <p className="text-sm text-caesar-muted">Avg Muscle Gained</p>
          </div>
          <div className="glass-strong rounded-2xl p-8 text-center">
            <p className="text-4xl font-black text-gradient-premium mb-2">98%</p>
            <p className="text-sm text-caesar-muted">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
}
