import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Dumbbell, Utensils } from 'lucide-react';
import { useCountUp, useInView } from '../hooks/useAnimations';

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const { ref, isInView } = useInView(0.3);
  const count = useCountUp(end, 2000, 0, isInView);
  return (
    <span ref={ref} className="tabular-nums font-clash">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function FloatingOrb({ color, size, style, delay = 0 }: { color: string; size: number; style: React.CSSProperties; delay?: number }) {
  return (
    <div
      className="absolute rounded-full animate-float opacity-20"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}30, ${color}08, transparent)`,
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
    }, 4000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue/30 via-caesar-purple/30 to-caesar-cyan/30 rounded-3xl blur-3xl" />

      <div className="relative glass-strong rounded-2xl p-5 lg:p-7 glow-mixed max-w-md mx-auto lg:mx-0 border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-caesar-cyan">
              <div className="absolute inset-0 rounded-full bg-caesar-cyan animate-ping opacity-50" />
            </div>
          </div>
          <span className="text-xs font-space font-medium text-caesar-muted uppercase tracking-wider">AI Dashboard Live</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-lg text-xs font-space font-medium transition-all duration-300 ${
                activeTab === i
                  ? 'bg-gradient-to-r from-caesar-blue/20 to-caesar-purple/20 text-caesar-white border border-caesar-blue/30'
                  : 'text-caesar-muted hover:text-caesar-white glass'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 0 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { name: 'Protein Oats Bowl', type: 'Breakfast', cal: 420, protein: 28, color: 'blue' },
              { name: 'Grilled Chicken Salad', type: 'Lunch', cal: 350, protein: 35, color: 'purple' },
              { name: 'Dal Rice Bowl', type: 'Dinner', cal: 450, protein: 18, color: 'cyan' },
            ].map((meal, i) => (
              <div key={i} className="flex items-center justify-between glass-blue rounded-xl p-3.5 group hover:border-caesar-blue/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-caesar-${meal.color}/20 flex items-center justify-center`}>
                    <Utensils className={`w-4 h-4 text-caesar-${meal.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-space font-medium text-caesar-white">{meal.name}</p>
                    <p className="text-[10px] text-caesar-muted font-space">{meal.type} - AI Generated</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-space font-semibold text-caesar-cyan">{meal.cal} cal</p>
                  <p className="text-[10px] text-caesar-muted font-space">{meal.protein}g protein</p>
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
              <div key={i} className="flex items-center justify-between glass-blue rounded-xl p-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-caesar-${ex.color}/20 flex items-center justify-center`}>
                    <Dumbbell className={`w-4 h-4 text-caesar-${ex.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-space font-medium text-caesar-white">{ex.name}</p>
                    <p className="text-[10px] text-caesar-muted font-space">{ex.sets} x {ex.reps}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-caesar-purple/20 text-caesar-purple font-space font-medium">{ex.target}</span>
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
              <div key={i} className="glass-blue rounded-xl p-3.5">
                <div className="flex justify-between text-xs mb-2 font-space">
                  <span className="text-caesar-muted">{stat.label}</span>
                  <span className="text-caesar-cyan font-semibold">{stat.current}/{stat.target}{stat.unit}</span>
                </div>
                <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-full transition-all duration-1000"
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
    { color: '#3B82F6', size: 400, style: { top: '5%', left: '0%' }, delay: 0 },
    { color: '#8B5CF6', size: 300, style: { top: '25%', right: '5%' }, delay: 1 },
    { color: '#06B6D4', size: 350, style: { bottom: '15%', left: '10%' }, delay: 2 },
    { color: '#3B82F6', size: 200, style: { bottom: '35%', right: '15%' }, delay: 0.5 },
    { color: '#8B5CF6', size: 250, style: { top: '45%', left: '25%' }, delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0 bg-mesh" />

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 container-premium mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 glass-purple rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-caesar-purple" />
              <span className="text-xs font-space font-medium text-caesar-purple">AI-Powered Fitness Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-display mb-6">
              <span className="text-gradient-hero">Build Muscle.</span>
              <br />
              <span className="text-gradient-premium">Eat Smarter.</span>
              <br />
              <span className="text-gradient-cyan">Transform Faster.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body max-w-xl mb-10 leading-relaxed">
              Caesar AI creates personalized diet plans, budget meals, workouts, protein tracking, and AI coaching for students, gym beginners, hostel users, and fitness lovers worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/signup" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative px-10 py-4 rounded-xl text-base font-space font-semibold text-white bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
                  Start Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/meal-generator" className="relative group">
                <div className="absolute inset-0 bg-caesar-cyan/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-10 py-4 rounded-xl text-base font-space font-semibold border-2 border-caesar-cyan/50 text-caesar-cyan hover:bg-caesar-cyan/10 flex items-center justify-center gap-2 transition-colors">
                  <Sparkles className="w-4 h-4" /> Generate AI Diet
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl lg:text-4xl font-clash font-semibold text-caesar-white">
                  {statsInView ? <AnimatedCounter end={50} suffix="K+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1 font-space">Active Users</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-clash font-semibold text-gradient-premium">
                  {statsInView ? <AnimatedCounter end={12} suffix="M+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1 font-space">Meals Generated</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-clash font-semibold text-gradient-cyan">
                  {statsInView ? <AnimatedCounter end={98} suffix="%" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1 font-space">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-caesar-black to-transparent" />
    </section>
  );
}
