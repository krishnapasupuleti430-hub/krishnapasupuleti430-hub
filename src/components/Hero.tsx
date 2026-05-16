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

function FloatingFood({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-3xl lg:text-4xl animate-float opacity-60 select-none"
      style={style}
    >
      {emoji}
    </div>
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
    <div className="glass-strong rounded-2xl p-4 lg:p-6 glow-red max-w-md mx-auto lg:mx-0">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-caesar-red animate-pulse" />
        <span className="text-xs text-caesar-muted font-medium uppercase tracking-wider">AI Dashboard Live</span>
      </div>

      <div className="flex gap-2 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
              activeTab === i
                ? 'bg-caesar-red/20 text-caesar-red border border-caesar-red/30'
                : 'text-caesar-muted hover:text-caesar-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between glass rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-caesar-red/20 flex items-center justify-center">
                <Utensils className="w-4 h-4 text-caesar-red" />
              </div>
              <div>
                <p className="text-xs font-medium">Paneer Roti Meal</p>
                <p className="text-[10px] text-caesar-muted">Lunch - AI Generated</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-caesar-gold">520 cal</p>
              <p className="text-[10px] text-caesar-muted">38g protein</p>
            </div>
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-caesar-gold/20 flex items-center justify-center">
                <Utensils className="w-4 h-4 text-caesar-gold" />
              </div>
              <div>
                <p className="text-xs font-medium">Egg Rice Bowl</p>
                <p className="text-[10px] text-caesar-muted">Dinner - Budget Plan</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-caesar-gold">480 cal</p>
              <p className="text-[10px] text-caesar-muted">32g protein</p>
            </div>
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Utensils className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs font-medium">Oats Banana Shake</p>
                <p className="text-[10px] text-caesar-muted">Breakfast - Quick</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-caesar-gold">350 cal</p>
              <p className="text-[10px] text-caesar-muted">22g protein</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between glass rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-caesar-red/20 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-caesar-red" />
              </div>
              <div>
                <p className="text-xs font-medium">Push-ups</p>
                <p className="text-[10px] text-caesar-muted">4 sets x 15 reps</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-red/20 text-caesar-red">Chest</span>
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-caesar-gold/20 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-caesar-gold" />
              </div>
              <div>
                <p className="text-xs font-medium">Squats</p>
                <p className="text-[10px] text-caesar-muted">4 sets x 20 reps</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-gold/20 text-caesar-gold">Legs</span>
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium">Plank Hold</p>
                <p className="text-[10px] text-caesar-muted">3 sets x 45 sec</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">Core</span>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-3 animate-fade-in">
          <div className="glass rounded-xl p-3">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-caesar-muted">Daily Protein</span>
              <span className="text-caesar-gold font-semibold">92/120g</span>
            </div>
            <div className="w-full h-2 bg-caesar-dark rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-caesar-red to-caesar-gold rounded-full" style={{ width: '77%' }} />
            </div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-caesar-muted">Calories</span>
              <span className="text-caesar-gold font-semibold">1,850/2,200</span>
            </div>
            <div className="w-full h-2 bg-caesar-dark rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-caesar-gold to-caesar-gold-light rounded-full" style={{ width: '84%' }} />
            </div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-caesar-muted">Water</span>
              <span className="text-blue-400 font-semibold">6/8 glasses</span>
            </div>
            <div className="w-full h-2 bg-caesar-dark rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { ref: statsRef, isInView: statsInView } = useInView(0.2);

  useEffect(() => {
    setMounted(true);
  }, []);

  const foods = [
    { emoji: '🍛', style: { top: '15%', left: '5%', animationDelay: '0s' } },
    { emoji: '🥚', style: { top: '25%', right: '8%', animationDelay: '1s' } },
    { emoji: '🍚', style: { top: '60%', left: '3%', animationDelay: '2s' } },
    { emoji: '🥛', style: { bottom: '20%', right: '5%', animationDelay: '0.5s' } },
    { emoji: '🍌', style: { top: '40%', left: '8%', animationDelay: '1.5s' } },
    { emoji: '🍗', style: { bottom: '35%', right: '10%', animationDelay: '2.5s' } },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {foods.map((food, i) => (
        <FloatingFood key={i} emoji={food.emoji} style={food.style} />
      ))}

      <div className="relative z-10 container-premium mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-caesar-red" />
              <span className="text-xs font-medium text-caesar-red">AI-Powered Fitness Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6">
              <span className="text-caesar-white">Build Muscle.</span>
              <br />
              <span className="text-gradient-gold">Eat Smarter.</span>
              <br />
              <span className="text-gradient-red">Transform Faster.</span>
            </h1>

            <p className="text-base lg:text-lg text-caesar-muted max-w-xl mb-8 leading-relaxed">
              Caesar AI creates personalized diet plans, budget meals, workouts, protein tracking, and AI coaching for students, gym beginners, hostel users, and fitness lovers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 text-base">
                Start Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/meal-generator" className="btn-gold flex items-center justify-center gap-2 text-base">
                <Sparkles className="w-4 h-4" />
                Generate My AI Diet
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
                <div className="text-2xl lg:text-3xl font-black text-gradient-gold">
                  {statsInView ? <AnimatedCounter end={12} suffix="M+" /> : '0'}
                </div>
                <div className="text-xs text-caesar-muted mt-1">Meals Generated</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gradient-red">
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
