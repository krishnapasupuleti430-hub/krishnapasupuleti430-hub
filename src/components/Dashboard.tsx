import { useState, useEffect } from 'react';
import { Flame, Dumbbell, Apple, Brain, Target, Zap, TrendingUp, Check, Wallet } from 'lucide-react';
import { useInView, useCountUp } from '../hooks/useAnimations';

function Ring({ progress, color, size = 80, strokeWidth = 6, label, value }: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  label: string;
  value: string;
}) {
  const { ref, isInView } = useInView(0.3);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [isInView, progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-caesar-white font-space">{value}</span>
        </div>
      </div>
      <span className="text-[10px] text-caesar-muted font-space font-medium">{label}</span>
    </div>
  );
}

function MealTimeline() {
  const meals = [
    { time: '7 AM', name: 'Banana Shake + Oats', cal: 350, protein: 22, cost: 'Rs.25', done: true },
    { time: '10 AM', name: 'Peanut Butter Toast', cal: 180, protein: 8, cost: 'Rs.15', done: true },
    { time: '1 PM', name: 'Dal Roti + Curd', cal: 520, protein: 28, cost: 'Rs.35', done: true },
    { time: '4 PM', name: 'Egg Bhurji', cal: 220, protein: 18, cost: 'Rs.20', done: false },
    { time: '7:30 PM', name: 'Paneer Rice Bowl', cal: 580, protein: 32, cost: 'Rs.45', done: false },
    { time: '9:30 PM', name: 'Milk + Almonds', cal: 150, protein: 10, cost: 'Rs.10', done: false },
  ];

  const totalCost = meals.reduce((a, m) => a + parseInt(m.cost.replace('Rs.', '')), 0);
  const totalProtein = meals.reduce((a, m) => a + m.protein, 0);

  return (
    <div className="space-y-2">
      {meals.map((meal, i) => (
        <div key={i} className={`flex items-center gap-3 glass rounded-xl p-3 transition-all duration-300 ${meal.done ? 'border-l-2 border-caesar-cyan' : 'opacity-60'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${meal.done ? 'bg-caesar-cyan/20 text-caesar-cyan' : 'bg-caesar-border text-caesar-muted'}`}>
            {meal.done ? <Check className="w-3 h-3" /> : i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-space font-medium text-caesar-white truncate">{meal.name}</p>
            <p className="text-[10px] text-caesar-muted font-space">{meal.time} | {meal.cost}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-semibold text-caesar-cyan font-space">{meal.protein}g P</p>
          </div>
        </div>
      ))}
      <div className="glass-cyan rounded-xl p-3 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-space font-medium text-caesar-cyan flex items-center gap-1.5">
            <Wallet className="w-3 h-3" /> Total: Rs.{totalCost}/day
          </span>
          <span className="text-[10px] font-space font-semibold text-caesar-white">{totalProtein}g protein</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { ref, isInView } = useInView(0.1);
  const calories = useCountUp(1850, 2000, 0, isInView);
  const protein = useCountUp(82, 2000, 0, isInView);

  return (
    <section id="dashboard" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-caesar-purple/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
            <Brain className="w-4 h-4 text-caesar-purple" />
            <span className="text-xs font-space font-medium text-caesar-purple uppercase tracking-wider">Your Fitness Dashboard</span>
          </div>
          <h2 className="heading-xl mb-4">
            <span className="text-caesar-white">Track Everything.</span>
            <br />
            <span className="text-gradient-premium">Spend Nothing.</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space">
            Calories, protein, water, workouts, budget - all tracked in one dashboard. See your progress in real-time with AI-powered insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Trackers */}
          <div className="space-y-6">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-caesar-blue" />
                  <h3 className="text-sm font-clash font-semibold text-caesar-white">Daily Tracking</h3>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-blue/10 text-caesar-blue font-space font-medium border border-caesar-blue/20">Budget Day</span>
              </div>
              <div className="flex justify-around mb-6">
                <Ring progress={84} color="#3B82F6" label="Calories" value={`${calories}`} />
                <Ring progress={82} color="#8B5CF6" label="Protein" value={`${protein}g`} />
                <Ring progress={75} color="#06B6D4" label="Water" value="6/8" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-space">
                    <span className="text-caesar-muted">Calories</span>
                    <span className="text-caesar-blue font-semibold">1,850 / 2,200</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-blue to-caesar-purple rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-space">
                    <span className="text-caesar-muted">Protein</span>
                    <span className="text-caesar-purple font-semibold">82 / 100g</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-purple to-caesar-cyan rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-space">
                    <span className="text-caesar-muted">Budget</span>
                    <span className="text-caesar-cyan font-semibold">Rs.100 / Rs.150</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-cyan to-caesar-blue rounded-full" style={{ width: '66%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-caesar-cyan" />
                  <h3 className="text-sm font-clash font-semibold text-caesar-white">Today's Workout</h3>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-cyan/10 text-caesar-cyan font-space font-medium border border-caesar-cyan/20">No Equipment</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Push-ups', sets: '4x15', done: true },
                  { name: 'Squats', sets: '4x20', done: true },
                  { name: 'Chair Dips', sets: '3x12', done: false },
                  { name: 'Plank', sets: '3x45s', done: false },
                ].map((ex, i) => (
                  <div key={i} className={`flex items-center justify-between glass rounded-lg p-2.5 ${ex.done ? 'border-l-2 border-caesar-cyan' : ''}`}>
                    <span className={`text-xs font-space ${ex.done ? 'text-caesar-white' : 'text-caesar-muted'}`}>{ex.name}</span>
                    <span className="text-[10px] text-caesar-muted font-space">{ex.sets}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Meal Timeline */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-caesar-blue" />
                <h3 className="text-sm font-clash font-semibold text-caesar-white">Budget Meal Plan</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-blue/10 text-caesar-blue font-space font-medium border border-caesar-blue/20">Rs.150/day</span>
            </div>
            <MealTimeline />
            <div className="mt-4 glass-blue rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-3.5 h-3.5 text-caesar-blue" />
                <span className="text-[10px] font-semibold text-caesar-blue font-space">AI Suggestion</span>
              </div>
              <p className="text-[10px] text-caesar-muted font-space">You need 18g more protein. Add 2 boiled eggs (Rs.10) for 12g protein + 1 glass milk (Rs.10) for 8g.</p>
            </div>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-caesar-purple" />
                  <h3 className="text-sm font-clash font-semibold text-caesar-white">AI Insights</h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="glass rounded-xl p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-caesar-purple/15 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-caesar-purple" />
                  </div>
                  <p className="text-xs text-caesar-muted font-space leading-relaxed">You're 8% ahead of your weekly protein goal. Great consistency!</p>
                </div>
                <div className="glass rounded-xl p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-caesar-blue/15 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 text-caesar-blue" />
                  </div>
                  <p className="text-xs text-caesar-muted font-space leading-relaxed">Calorie intake is optimal for muscle gain. Maintain current portions.</p>
                </div>
                <div className="glass rounded-xl p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-caesar-cyan/15 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-caesar-cyan" />
                  </div>
                  <p className="text-xs text-caesar-muted font-space leading-relaxed">Your 30-day report: +2.1kg muscle gained on a Rs.150/day budget.</p>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-caesar-cyan" />
                <h3 className="text-sm font-clash font-semibold text-caesar-white">Weekly Consistency</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Workout Streak', value: '5/7 days', pct: 71 },
                  { label: 'Protein Goal', value: '6/7 days', pct: 86 },
                  { label: 'Budget Maintained', value: '7/7 days', pct: 100 },
                ].map((goal, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1 font-space">
                      <span className="text-caesar-muted">{goal.label}</span>
                      <span className="text-caesar-white font-medium">{goal.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-caesar-darker rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-full transition-all duration-1000"
                        style={{ width: `${goal.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
