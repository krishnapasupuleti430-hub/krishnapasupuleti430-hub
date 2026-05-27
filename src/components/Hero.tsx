import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Utensils, Dumbbell, TrendingUp, Check, Shield } from 'lucide-react';
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

function ProblemCard({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 group hover:border-caesar-blue/30 transition-all duration-300">
      <div className="w-8 h-8 rounded-lg bg-caesar-blue/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-caesar-blue" />
      </div>
      <span className="text-xs font-space text-caesar-muted group-hover:text-caesar-white transition-colors">{text}</span>
    </div>
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
      <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue/20 via-caesar-purple/20 to-caesar-cyan/20 rounded-3xl blur-3xl" />

      <div className="relative glass-strong rounded-2xl p-5 lg:p-6 max-w-md mx-auto lg:mx-0 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-caesar-cyan">
                <div className="absolute inset-0 rounded-full bg-caesar-cyan animate-ping opacity-50" />
              </div>
            </div>
            <span className="text-xs font-space font-medium text-caesar-muted uppercase tracking-wider">Live Dashboard</span>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-cyan/10 text-caesar-cyan border border-caesar-cyan/20 font-space font-medium">Budget: Rs.150/day</span>
        </div>

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

        {activeTab === 0 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { name: 'Oats + Banana Shake', type: 'Breakfast', cal: 350, protein: 22, cost: 'Rs.25', color: 'blue' },
              { name: 'Dal Rice + Curd', type: 'Lunch', cal: 520, protein: 28, cost: 'Rs.40', color: 'purple' },
              { name: 'Egg Bhurji + Roti', type: 'Dinner', cal: 450, protein: 32, cost: 'Rs.35', color: 'cyan' },
            ].map((meal, i) => (
              <div key={i} className="flex items-center justify-between glass rounded-xl p-3.5 group hover:border-caesar-blue/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-caesar-${meal.color}/20 flex items-center justify-center`}>
                    <Utensils className={`w-4 h-4 text-caesar-${meal.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-space font-medium text-caesar-white">{meal.name}</p>
                    <p className="text-[10px] text-caesar-muted font-space">{meal.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-space font-semibold text-caesar-cyan">{meal.cost}</p>
                  <p className="text-[10px] text-caesar-muted font-space">{meal.protein}g protein</p>
                </div>
              </div>
            ))}
            <div className="glass-cyan rounded-xl p-3 mt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-caesar-cyan" />
                <span className="text-[10px] font-space font-medium text-caesar-cyan">Total: Rs.100/day | 82g protein | 1,320 cal</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { name: 'Push-ups', sets: '4x15', target: 'Chest', done: true, color: 'blue' },
              { name: 'Bodyweight Squats', sets: '4x20', target: 'Legs', done: true, color: 'purple' },
              { name: 'Plank Hold', sets: '3x45s', target: 'Core', done: false, color: 'cyan' },
            ].map((ex, i) => (
              <div key={i} className={`flex items-center justify-between glass rounded-xl p-3.5 ${ex.done ? 'border-l-2 border-caesar-cyan' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-caesar-${ex.color}/20 flex items-center justify-center`}>
                    <Dumbbell className={`w-4 h-4 text-caesar-${ex.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-space font-medium text-caesar-white">{ex.name}</p>
                    <p className="text-[10px] text-caesar-muted font-space">{ex.sets} | No equipment</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-caesar-cyan/10 text-caesar-cyan font-space font-medium border border-caesar-cyan/20">{ex.target}</span>
              </div>
            ))}
            <div className="glass-cyan rounded-xl p-3 mt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-caesar-cyan" />
                <span className="text-[10px] font-space font-medium text-caesar-cyan">Home workout | 25 min | 180 cal burned</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-3 animate-fade-in">
            {[
              { label: 'Protein Today', current: 82, target: 100, unit: 'g', color: 'blue' },
              { label: 'Workout Streak', current: 5, target: 7, unit: ' days', color: 'purple' },
              { label: 'Monthly Budget', current: 3000, target: 4500, unit: ' Rs', color: 'cyan' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-xl p-3.5">
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
            <div className="glass-blue rounded-xl p-3 mt-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-caesar-blue" />
                <span className="text-[10px] font-space font-medium text-caesar-blue">+2.1kg muscle this month | On track!</span>
              </div>
            </div>
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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 container-premium mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-8">
              <Shield className="w-3.5 h-3.5 text-caesar-blue" />
              <span className="text-xs font-space font-medium text-caesar-blue">Trusted by 50,000+ Indian students</span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-display mb-6">
              <span className="text-caesar-white">Build Muscle.</span>
              <br />
              <span className="text-gradient-premium">No Gym. No Coach.</span>
              <br />
              <span className="text-caesar-white">Just </span>
              <span className="text-gradient-cyan">Results.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body max-w-xl mb-4 leading-relaxed">
              Transform your body on a student budget. AI-powered diet plans with Indian hostel food, home workouts with zero equipment, and a personal coach that understands your reality.
            </p>

            {/* Problem cards */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              <ProblemCard icon={Utensils} text="Gym food too expensive?" />
              <ProblemCard icon={Dumbbell} text="No gym access?" />
              <ProblemCard icon={Flame} text="Not gaining muscle?" />
              <ProblemCard icon={TrendingUp} text="Tired of being skinny?" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/signup" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative px-10 py-4 rounded-xl text-base font-space font-semibold text-white bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
                  Start Your Transformation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/workouts" className="relative group">
                <div className="absolute inset-0 bg-caesar-cyan/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-10 py-4 rounded-xl text-base font-space font-semibold border-2 border-caesar-cyan/50 text-caesar-cyan hover:bg-caesar-cyan/10 flex items-center justify-center gap-2 transition-colors">
                  View Home Workouts
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl lg:text-4xl font-clash font-semibold text-caesar-white">
                  {statsInView ? <AnimatedCounter end={50} suffix="K+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1 font-space">Students Transformed</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-clash font-semibold text-gradient-premium">
                  {statsInView ? <AnimatedCounter end={12} suffix="M+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1 font-space">Budget Meals Created</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-clash font-semibold text-gradient-cyan">
                  {statsInView ? <AnimatedCounter end={98} suffix="%" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1 font-space">Would Recommend</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <DashboardPreview />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-caesar-black to-transparent" />
    </section>
  );
}
