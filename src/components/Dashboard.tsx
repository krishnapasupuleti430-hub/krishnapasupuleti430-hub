import { useState, useEffect } from 'react';
import { Flame, Droplets, Dumbbell, Apple, Brain, Target, Calendar, Zap } from 'lucide-react';
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
          <span className="text-xs font-bold text-caesar-white">{value}</span>
        </div>
      </div>
      <span className="text-[10px] text-caesar-muted font-medium">{label}</span>
    </div>
  );
}

function AIInsightCard({ icon: Icon, text, color }: { icon: React.ElementType; text: string; color: string }) {
  return (
    <div className="glass rounded-xl p-3 flex items-start gap-3 group hover:glow-blue transition-all duration-300">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-xs text-caesar-muted leading-relaxed">{text}</p>
    </div>
  );
}

function MealTimeline() {
  const meals = [
    { time: '7:00 AM', name: 'Oats + Banana Shake', cal: 350, protein: 22, done: true },
    { time: '10:00 AM', name: 'Peanut Butter Toast', cal: 180, protein: 8, done: true },
    { time: '1:00 PM', name: 'Paneer Roti Meal', cal: 520, protein: 38, done: true },
    { time: '4:00 PM', name: 'Egg Bhurji Snack', cal: 220, protein: 18, done: false },
    { time: '7:30 PM', name: 'Chicken Curry Rice', cal: 580, protein: 42, done: false },
    { time: '9:30 PM', name: 'Curd + Fruits', cal: 150, protein: 8, done: false },
  ];

  return (
    <div className="space-y-2">
      {meals.map((meal, i) => (
        <div key={i} className={`flex items-center gap-3 glass rounded-xl p-3 transition-all duration-300 ${meal.done ? 'border-l-2 border-caesar-cyan' : 'opacity-60'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${meal.done ? 'bg-caesar-cyan/20 text-caesar-cyan' : 'bg-caesar-border text-caesar-muted'}`}>
            {meal.done ? '✓' : i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-caesar-white truncate">{meal.name}</p>
            <p className="text-[10px] text-caesar-muted">{meal.time}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-semibold text-caesar-cyan">{meal.cal} cal</p>
            <p className="text-[10px] text-caesar-muted">{meal.protein}g P</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { ref, isInView } = useInView(0.1);
  const calories = useCountUp(1850, 2000, 0, isInView);
  const protein = useCountUp(92, 2000, 0, isInView);

  return (
    <section id="dashboard" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-caesar-purple/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
            <Brain className="w-4 h-4 text-caesar-purple" />
            <span className="text-xs font-medium text-caesar-purple uppercase tracking-wider">AI Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Your AI-Powered</span>
            <br />
            <span className="text-gradient-premium">Command Center</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            Track everything in one futuristic dashboard. Calories, protein, water, workouts, and AI insights - all in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Trackers */}
          <div className="space-y-6">
            <div className="glass-strong rounded-2xl p-6 glow-mixed">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-caesar-blue" />
                <h3 className="text-sm font-bold text-caesar-white">Daily Tracking</h3>
              </div>
              <div className="flex justify-around mb-6">
                <Ring progress={84} color="#3B82F6" label="Calories" value={`${calories}`} />
                <Ring progress={77} color="#8B5CF6" label="Protein" value={`${protein}g`} />
                <Ring progress={75} color="#06B6D4" label="Water" value="6/8" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-caesar-muted">Calories</span>
                    <span className="text-caesar-blue font-semibold">1,850 / 2,200</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-blue to-caesar-purple rounded-full transition-all duration-1000" style={{ width: '84%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-caesar-muted">Protein</span>
                    <span className="text-caesar-purple font-semibold">92 / 120g</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-purple to-caesar-purple-light rounded-full transition-all duration-1000" style={{ width: '77%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-caesar-muted">Water</span>
                    <span className="text-caesar-cyan font-semibold">6 / 8 glasses</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-cyan to-caesar-cyan-light rounded-full transition-all duration-1000" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-5 h-5 text-caesar-cyan" />
                <h3 className="text-sm font-bold text-caesar-white">Today's Workout</h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Push-ups', sets: '4x15', done: true },
                  { name: 'Squats', sets: '4x20', done: true },
                  { name: 'Plank', sets: '3x45s', done: false },
                  { name: 'Lunges', sets: '3x12', done: false },
                ].map((ex, i) => (
                  <div key={i} className={`flex items-center justify-between glass rounded-lg p-2.5 ${ex.done ? 'border-l-2 border-caesar-cyan' : ''}`}>
                    <span className={`text-xs ${ex.done ? 'text-caesar-white' : 'text-caesar-muted'}`}>{ex.name}</span>
                    <span className="text-[10px] text-caesar-muted">{ex.sets}</span>
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
                <h3 className="text-sm font-bold text-caesar-white">Meal Timeline</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-caesar-blue/20 text-caesar-blue font-medium">AI Generated</span>
            </div>
            <MealTimeline />
            <div className="mt-4 glass-blue rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-3.5 h-3.5 text-caesar-blue" />
                <span className="text-[10px] font-semibold text-caesar-blue">AI Suggestion</span>
              </div>
              <p className="text-[10px] text-caesar-muted">You need 28g more protein today. Add 2 boiled eggs + 1 glass milk for 26g protein.</p>
            </div>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            <div className="glass-strong rounded-2xl p-6 glow-purple">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-caesar-purple" />
                <h3 className="text-sm font-bold text-caesar-white">AI Insights</h3>
              </div>
              <div className="space-y-3">
                <AIInsightCard icon={Target} text="You're 8% ahead of your weekly protein goal. Great consistency!" color="bg-caesar-purple/20 text-caesar-purple" />
                <AIInsightCard icon={Flame} text="Calorie intake is optimal. Maintain current meal portions for best results." color="bg-caesar-blue/20 text-caesar-blue" />
                <AIInsightCard icon={Droplets} text="Drink 2 more glasses of water. Hydration impacts muscle recovery." color="bg-caesar-cyan/20 text-caesar-cyan" />
                <AIInsightCard icon={Calendar} text="Your 30-day transformation report is ready. You gained 2.1kg muscle!" color="bg-green-500/20 text-green-400" />
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-caesar-cyan" />
                <h3 className="text-sm font-bold text-caesar-white">Weekly Goals</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Workout Streak', value: '5/7 days', pct: 71 },
                  { label: 'Protein Goal', value: '6/7 days', pct: 86 },
                  { label: 'Water Goal', value: '4/7 days', pct: 57 },
                ].map((goal, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
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
