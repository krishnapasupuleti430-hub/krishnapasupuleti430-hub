import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Dumbbell, Utensils } from 'lucide-react';
import { useCountUp, useInView } from '../hooks/useAnimations';

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const { ref, isInView } = useInView(0.3);
  const count = useCountUp(end, 2000, 0, isInView);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function FloatingOrb({ color, size, style, delay = 0 }: { color: string; size: number; style: React.CSSProperties; delay?: number }) {
  return (
    <div
      className="absolute rounded-full animate-float opacity-30"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40, ${color}10, transparent)`,
        filter: 'blur(1px)',
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  );
}

function DashboardPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Meals', 'Workout', 'Progress'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue/20 via-caesar-purple/20 to-caesar-cyan/20 rounded-3xl blur-2xl" />
      <div className="relative glass-strong rounded-2xl p-4 lg:p-6 glow-mixed max-w-md mx-auto lg:mx-0 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-caesar-cyan animate-pulse" />
          <span className="text-xs text-caesar-muted font-medium uppercase tracking-wider">AI Dashboard Live</span>
        </div>

        <div className="flex gap-2 mb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                activeTab === i
                  ? 'bg-gradient-to-r from-caesar-blue/30 to-caesar-purple/30 text-caesar-white border border-caesar-blue/30'
                  : 'text-caesar-muted hover:text-caesar-white glass'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { name: 'Protein Oats Bowl', type: 'Breakfast', cal: 420, protein: 28, color: 'blue' },
              { name: 'Grilled Chicken Salad', type: 'Lunch', cal: 350, protein: 35, color: 'purple' },
              { name: 'Dal Rice Bowl', type: 'Dinner', cal: 450, protein: 18, color: 'cyan' },
            ].map((meal, i) => (
              <div key={i} className="flex items-center justify-between glass-blue rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-caesar-${meal.color}/20 flex items-center justify-center`}>
                    <Utensils className={`w-4 h-4 text-caesar-${meal.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-caesar-white">{meal.name}</p>
                    <p className="text-[10px] text-caesar-muted">{meal.type} - AI Generated</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-caesar-cyan">{meal.cal} cal</p>
                  <p className="text-[10px] text-caesar-muted">{meal.protein}g protein</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { name: 'Push-ups', sets: '4 sets', reps: '15 reps', target: 'Chest', color: 'blue' },
              { name: 'Squats', sets: '4 sets', reps: '20 reps', target: 'Legs', color: 'purple' },
              { name: 'Plank', sets: '3 sets', reps: '45 sec', target: 'Core', color: 'cyan' },
            ].map((ex, i) => (
              <div key={i} className="flex items-center justify-between glass-blue rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-caesar-${ex.color}/20 flex items-center justify-center`}>
                    <Dumbbell className={`w-4 h-4 text-caesar-${ex.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-caesar-white">{ex.name}</p>
                    <p className="text-[10px] text-caesar-muted">{ex.sets} x {ex.reps}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-purple/20 text-caesar-purple">{ex.target}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { label: 'Daily Protein', current: 92, target: 120, unit: 'g', color: 'blue' },
              { label: 'Calories', current: 1850, target: 2200, unit: '', color: 'purple' },
              { label: 'Water', current: 6, target: 8, unit: ' glasses', color: 'cyan' },
            ].map((stat, i) => (
              <div key={i} className="glass-blue rounded-xl p-3">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-caesar-muted">{stat.label}</span>
                  <span className="text-caesar-cyan font-semibold">{stat.current}/{stat.target}{stat.unit}</span>
                </div>
                <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-full"
                    style={{ width: `${(stat.current / stat.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { ref: statsRef, isInView: statsInView } = useInView(0.2);

  useEffect(() => {
    setMounted(true);
  }, []);

  const orbs = [
    { color: '#3B82F6', size: 300, style: { top: '10%', left: '5%' }, delay: 0 },
    { color: '#8B5CF6', size: 200, style: { top: '30%', right: '10%' }, delay: 1 },
    { color: '#06B6D4', size: 250, style: { bottom: '20%', left: '15%' }, delay: 2 },
    { color: '#3B82F6', size: 150, style: { bottom: '30%', right: '20%' }, delay: 0.5 },
    { color: '#8B5CF6', size: 180, style: { top: '50%', left: '30%' }, delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0 bg-mesh animate-aurora" />

      {orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}

      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 container-premium mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-caesar-purple" />
              <span className="text-xs font-medium text-caesar-purple">AI-Powered Fitness Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6">
              <span className="text-caesar-white">Build Muscle.</span>
              <br />
              <span className="text-gradient-premium">Eat Smarter.</span>
              <br />
              <span className="text-gradient-cyan">Transform Faster.</span>
            </h1>

            <p className="text-base lg:text-lg text-caesar-muted max-w-xl mb-8 leading-relaxed">
              Caesar AI creates personalized diet plans, budget meals, workouts, protein tracking, and AI coaching for students, gym beginners, hostel users, and fitness lovers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/signup" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative btn-primary text-base px-8 py-4 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl flex items-center justify-center gap-2">
                  Start Free <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
              <Link to="/meal-generator" className="relative group">
                <div className="absolute inset-0 bg-caesar-cyan/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative btn-outline text-base px-8 py-4 rounded-xl flex items-center justify-center gap-2 border-caesar-cyan/50 text-caesar-cyan hover:bg-caesar-cyan/10">
                  <Sparkles className="w-4 h-4" /> Generate AI Diet
                </div>
              </Link>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-caesar-white">
                  {statsInView ? <AnimatedCounter end={50} suffix="K+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gradient-premium">
                  {statsInView ? <AnimatedCounter end={12} suffix="M+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1">Meals Generated</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gradient-cyan">
                  {statsInView ? <AnimatedCounter end={98} suffix="%" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <DashboardPreview />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-caesar-black to-transparent" />
    </section>
  );
}
