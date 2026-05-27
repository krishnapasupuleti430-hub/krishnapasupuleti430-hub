import { Utensils, Wallet, Dumbbell, Bed, TrendingUp, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

function FeatureCard({ icon: Icon, title, description, stat, statLabel, color }: {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
}) {
  const { ref, isInView } = useInView(0.1);

  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    blue: { bg: 'bg-caesar-blue/15', text: 'text-caesar-blue', border: 'border-caesar-blue/20', glow: 'hover:glow-blue' },
    purple: { bg: 'bg-caesar-purple/15', text: 'text-caesar-purple', border: 'border-caesar-purple/20', glow: 'hover:glow-purple' },
    cyan: { bg: 'bg-caesar-cyan/15', text: 'text-caesar-cyan', border: 'border-caesar-cyan/20', glow: 'hover:glow-cyan' },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div
      ref={ref}
      className={`glass-strong rounded-2xl p-6 lg:p-7 group transition-all duration-700 hover:scale-[1.02] ${c.glow} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.bg}`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div className={`px-2.5 py-1 rounded-lg ${c.bg} border ${c.border}`}>
          <span className={`text-[10px] font-space font-semibold ${c.text}`}>{stat}</span>
        </div>
      </div>
      <h3 className="text-lg font-clash font-semibold text-caesar-white mb-2 group-hover:text-gradient-premium transition-all">
        {title}
      </h3>
      <p className="text-sm text-caesar-muted font-space leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-caesar-muted font-space">{statLabel}</span>
        <div className="flex items-center gap-1 text-xs font-space font-medium text-caesar-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn more <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Utensils,
    title: 'Budget Meal Plans',
    description: 'Eat 100g+ protein daily on Rs.100-150/day. Dal, eggs, paneer, curd, roti - all tracked with calories and macros.',
    stat: 'Rs.100/day',
    statLabel: 'Starting budget',
    color: 'blue',
  },
  {
    icon: Bed,
    title: 'Hostel Student Mode',
    description: 'No-cook meals, hostel mess hacks, budget protein sources, and instant food combos that actually build muscle.',
    stat: '50+ meals',
    statLabel: 'No-cook options',
    color: 'purple',
  },
  {
    icon: Dumbbell,
    title: 'Home Workouts',
    description: 'Zero equipment bodyweight workouts - push-ups, squats, dips, planks. Structured plans from beginner to advanced.',
    stat: '0 equipment',
    statLabel: 'Gym not needed',
    color: 'cyan',
  },
  {
    icon: Wallet,
    title: 'Indian Food Database',
    description: 'Dosa, idli, poha, upma, biryani, khichdi, paratha - every Indian food with accurate protein and calorie data.',
    stat: '500+ foods',
    statLabel: 'Indian foods tracked',
    color: 'blue',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Weight logs, muscle gain charts, protein streaks, weekly AI reports, and a transformation timeline that keeps you motivated.',
    stat: '+8kg avg',
    statLabel: 'Muscle gained by users',
    color: 'purple',
  },
];

export default function Features() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="features" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-caesar-blue/5 rounded-full blur-[120px]" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-space font-medium text-caesar-cyan uppercase tracking-wider">Built for Real Student Problems</span>
          </div>
          <h2 className="heading-xl mb-5">
            <span className="text-caesar-white">Fitness That Fits</span>
            <br />
            <span className="text-gradient-premium">Your Budget & Lifestyle</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space">
            No expensive supplements. No gym membership. No fancy meal prep. Caesar AI works with what you have - hostel food, home workouts, and a student budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
