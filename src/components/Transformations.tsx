import { TrendingUp, Award, Flame, Check, ArrowRight } from 'lucide-react';
import { useInView, useCountUp } from '../hooks/useAnimations';

function TransformationCard({ name, role, duration, beforeWeight, afterWeight, budget, stats, image }: {
  name: string;
  role: string;
  duration: string;
  beforeWeight: string;
  afterWeight: string;
  budget: string;
  stats: { label: string; value: string; color: string }[];
  image: string;
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`glass-strong rounded-2xl overflow-hidden group transition-all duration-700 hover:scale-[1.02] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark via-caesar-dark/60 to-transparent" />

        {/* Before/After overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="glass rounded-xl px-3 py-2 text-center">
            <p className="text-xs text-caesar-muted font-space">Before</p>
            <p className="text-sm font-clash font-bold text-caesar-white">{beforeWeight}</p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="w-4 h-4 text-caesar-cyan" />
            <span className="text-[9px] text-caesar-cyan font-space font-medium">{duration}</span>
          </div>
          <div className="glass-cyan rounded-xl px-3 py-2 text-center">
            <p className="text-xs text-caesar-cyan font-space">After</p>
            <p className="text-sm font-clash font-bold text-caesar-cyan">{afterWeight}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-clash font-semibold text-caesar-white">{name}</h4>
            <p className="text-[10px] text-caesar-muted font-space">{role}</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-cyan/10 text-caesar-cyan font-space font-medium border border-caesar-cyan/20">{budget}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-xl p-2.5 text-center">
              <p className={`text-sm font-clash font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[9px] text-caesar-muted font-space">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({ icon: Icon, label, unlocked }: { icon: React.ElementType; label: string; unlocked: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${unlocked ? 'glass-gold' : 'glass opacity-40'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${unlocked ? 'bg-caesar-gold/20' : 'bg-caesar-border'}`}>
        <Icon className={`w-5 h-5 ${unlocked ? 'text-caesar-gold' : 'text-caesar-muted'}`} />
      </div>
      <span className={`text-[10px] font-space font-medium text-center ${unlocked ? 'text-caesar-gold' : 'text-caesar-muted'}`}>{label}</span>
    </div>
  );
}

export default function Transformations() {
  const { ref, isInView } = useInView(0.1);
  const transformed = useCountUp(15000, 2000, 0, isInView);
  const muscleGained = useCountUp(8, 2000, 0, isInView);

  const transformations = [
    {
      name: 'Rahul Sharma',
      role: 'Hostel Student, Delhi',
      duration: '5 months',
      beforeWeight: '52kg',
      afterWeight: '68kg',
      budget: 'Rs.150/day',
      image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: [
        { label: 'Muscle', value: '+16kg', color: 'text-caesar-cyan' },
        { label: 'Protein', value: '120g/d', color: 'text-caesar-blue' },
        { label: 'Budget', value: 'Rs.150/d', color: 'text-green-400' },
      ],
    },
    {
      name: 'Priya Patel',
      role: 'College Student, Mumbai',
      duration: '4 months',
      beforeWeight: '72kg',
      afterWeight: '60kg',
      budget: 'Rs.100/day',
      image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: [
        { label: 'Fat Lost', value: '-12kg', color: 'text-caesar-purple' },
        { label: 'Streak', value: '120 days', color: 'text-caesar-gold' },
        { label: 'Workout', value: 'Home only', color: 'text-caesar-cyan' },
      ],
    },
    {
      name: 'Arjun Reddy',
      role: 'B.Tech Student, Chennai',
      duration: '6 months',
      beforeWeight: '55kg',
      afterWeight: '65kg',
      budget: 'Rs.120/day',
      image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: [
        { label: 'Muscle', value: '+10kg', color: 'text-caesar-cyan' },
        { label: 'Budget', value: 'Rs.100/d', color: 'text-green-400' },
        { label: 'AI Meals', value: '540+', color: 'text-caesar-blue' },
      ],
    },
  ];

  const badges = [
    { icon: Flame, label: '7-Day Streak', unlocked: true },
    { icon: TrendingUp, label: 'First 5kg', unlocked: true },
    { icon: Award, label: '30-Day Champ', unlocked: true },
    { icon: Check, label: '100 Meals', unlocked: true },
    { icon: Flame, label: '100 Streak', unlocked: false },
    { icon: Award, label: 'Elite Body', unlocked: false },
  ];

  return (
    <section id="transformations" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-caesar-cyan/5 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-caesar-cyan" />
            <span className="text-xs font-space font-medium text-caesar-cyan uppercase tracking-wider">Real Results</span>
          </div>
          <h2 className="heading-xl mb-5">
            <span className="text-caesar-white">From Skinny to Strong.</span>
            <br />
            <span className="text-gradient-premium">On a Student Budget.</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space">
            These students transformed their bodies without expensive gyms, supplements, or meal prep services. Just AI guidance, Indian food, and discipline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {transformations.map((t, i) => (
            <TransformationCard key={i} {...t} />
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-8 mb-16">
          <h3 className="text-lg font-clash font-semibold text-center text-caesar-white mb-8">
            Stay Consistent. Unlock Achievements.
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {badges.map((badge, i) => (
              <AchievementBadge key={i} {...badge} />
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="glass-strong rounded-2xl p-8 text-center glow-blue">
            <p className="text-4xl font-clash font-bold text-gradient-premium mb-2">
              {isInView ? transformed.toLocaleString() : '0'}+
            </p>
            <p className="text-sm text-caesar-muted font-space">Students Transformed</p>
          </div>
          <div className="glass-strong rounded-2xl p-8 text-center glow-purple">
            <p className="text-4xl font-clash font-bold text-gradient-cyan mb-2">
              {isInView ? muscleGained : '0'}kg
            </p>
            <p className="text-sm text-caesar-muted font-space">Avg Muscle Gained</p>
          </div>
          <div className="glass-strong rounded-2xl p-8 text-center glow-cyan">
            <p className="text-4xl font-clash font-bold text-gradient-blue mb-2">98%</p>
            <p className="text-sm text-caesar-muted font-space">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
}
