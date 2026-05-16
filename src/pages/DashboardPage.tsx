import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import {
  Flame, Droplets, Dumbbell, Apple, Brain, Target, Zap,
  TrendingUp, Award, Utensils, Plus, Minus, Save, LogOut, Settings,
  Crown, BarChart3, Star, ChevronRight
} from 'lucide-react';

interface DailyTracking {
  id: string;
  tracking_date: string;
  calories_consumed: number;
  protein_consumed: number;
  water_glasses: number;
  workout_completed: boolean;
  workout_duration_minutes: number;
  weight_kg: number;
}

interface SavedMeal {
  id: string;
  name: string;
  calories: number;
  protein_g: number;
  meal_type: string;
  created_at: string;
}

interface SavedWorkout {
  id: string;
  name: string;
  difficulty: string;
  target_muscle: string;
  sets: number;
  reps: number;
  created_at: string;
}

function Ring({ progress, color, size = 80, strokeWidth = 6, label, value }: {
  progress: number; color: string; size?: number; strokeWidth?: number; label: string; value: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-caesar-white">{value}</span>
        </div>
      </div>
      <span className="text-[10px] text-caesar-muted font-medium">{label}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { plan, isFree, isStudent, isPro, isElite, aiGenerationsLeft } = useSubscription();
  const [tracking, setTracking] = useState<DailyTracking | null>(null);
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'meals' | 'workouts' | 'progress' | 'settings'>('overview');
  const [weightInput, setWeightInput] = useState('');
  const [saving, setSaving] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const fetchTracking = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('daily_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('tracking_date', today)
        .maybeSingle();

      if (data) {
        setTracking(data);
      } else {
        const { data: newData } = await supabase
          .from('daily_tracking')
          .insert({
            user_id: user.id,
            tracking_date: today,
            calories_consumed: 0,
            protein_consumed: 0,
            water_glasses: 0,
            workout_completed: false,
          })
          .select()
          .maybeSingle();
        if (newData) setTracking(newData);
      }
    } catch { /* tracking fetch failed */ }
  }, [user, today]);

  const fetchSavedMeals = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('meals')
        .select('id, name, calories, protein_g, meal_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      setSavedMeals(data || []);
    } catch { setSavedMeals([]); }
  }, [user]);

  const fetchSavedWorkouts = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('workouts')
        .select('id, name, difficulty, target_muscle, sets, reps, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      setSavedWorkouts(data || []);
    } catch { setSavedWorkouts([]); }
  }, [user]);

  const fetchStreak = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('daily_tracking')
        .select('tracking_date, calories_consumed')
        .eq('user_id', user.id)
        .gt('calories_consumed', 0)
        .order('tracking_date', { ascending: false })
        .limit(30);

      if (data && data.length > 0) {
        let streak = 0;
        const d = new Date();
        for (let i = 0; i < 30; i++) {
          const dateStr = d.toISOString().split('T')[0];
          const found = data.find((t) => t.tracking_date === dateStr);
          if (found) { streak++; } else if (i > 0) { break; }
          d.setDate(d.getDate() - 1);
        }
        setStreakCount(streak);
      }
    } catch { /* streak fetch failed */ }
  }, [user]);

  useEffect(() => {
    fetchTracking();
    fetchSavedMeals();
    fetchSavedWorkouts();
    fetchStreak();
  }, [fetchTracking, fetchSavedMeals, fetchSavedWorkouts, fetchStreak]);

  const updateTracking = async (updates: Partial<DailyTracking>) => {
    if (!user || !tracking) return;
    setSaving(true);
    try {
      const { data } = await supabase
        .from('daily_tracking')
        .update(updates)
        .eq('id', tracking.id)
        .select()
        .maybeSingle();
      if (data) setTracking(data);
    } catch { /* update failed */ }
    setSaving(false);
  };

  const calorieGoal = profile?.daily_calorie_goal || 2200;
  const proteinGoal = profile?.daily_protein_goal || 120;
  const waterGoal = profile?.daily_water_goal || 8;

  const calPct = tracking ? Math.min((tracking.calories_consumed / calorieGoal) * 100, 100) : 0;
  const proPct = tracking ? Math.min((tracking.protein_consumed / proteinGoal) * 100, 100) : 0;
  const waterPct = tracking ? Math.min((tracking.water_glasses / waterGoal) * 100, 100) : 0;

  const planBadge = () => {
    if (isElite) return { label: 'Elite', color: 'text-caesar-gold', bg: 'bg-caesar-gold/20' };
    if (isPro) return { label: 'Pro', color: 'text-caesar-red', bg: 'bg-caesar-red/20' };
    if (isStudent) return { label: 'Student', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    return { label: 'Free', color: 'text-caesar-muted', bg: 'bg-caesar-border' };
  };

  const badge = planBadge();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'meals', label: 'Meals', icon: Utensils },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-caesar-black pt-20 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-caesar-white">Dashboard</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${badge.bg} ${badge.color} font-medium`}>{badge.label}</span>
            </div>
            <p className="text-sm text-caesar-muted">Welcome back, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/meal-generator" className="btn-primary flex items-center gap-2 px-4 py-2 text-xs">
              <Apple className="w-3.5 h-3.5" /> AI Meals
            </Link>
            <Link to="/workout-generator" className="btn-gold flex items-center gap-2 px-4 py-2 text-xs">
              <Dumbbell className="w-3.5 h-3.5" /> AI Workout
            </Link>
            <button onClick={signOut} className="glass rounded-xl p-2 text-caesar-muted hover:text-caesar-red transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Streak & Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="glass-strong rounded-xl p-4 text-center">
            <Flame className="w-5 h-5 text-caesar-red mx-auto mb-1" />
            <p className="text-lg font-black text-caesar-white">{streakCount}</p>
            <p className="text-[10px] text-caesar-muted">Day Streak</p>
          </div>
          <div className="glass-strong rounded-xl p-4 text-center">
            <Zap className="w-5 h-5 text-caesar-gold mx-auto mb-1" />
            <p className="text-lg font-black text-caesar-gold">{aiGenerationsLeft}</p>
            <p className="text-[10px] text-caesar-muted">AI Left Today</p>
          </div>
          <div className="glass-strong rounded-xl p-4 text-center">
            <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-lg font-black text-caesar-white">{profile?.weight_kg || '--'}</p>
            <p className="text-[10px] text-caesar-muted">Current kg</p>
          </div>
          <div className="glass-strong rounded-xl p-4 text-center">
            <Crown className="w-5 h-5 text-caesar-gold mx-auto mb-1" />
            <p className="text-lg font-black text-gradient-gold capitalize">{plan}</p>
            <p className="text-[10px] text-caesar-muted">Plan</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'glass-red text-caesar-red border border-caesar-red/30' : 'glass text-caesar-muted hover:text-caesar-white'
              }`}>
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-caesar-red" />
                <h3 className="text-sm font-bold text-caesar-white">Today's Tracking</h3>
                {saving && <div className="w-3 h-3 border border-caesar-red border-t-transparent rounded-full animate-spin" />}
              </div>

              <div className="flex justify-around mb-8">
                <Ring progress={calPct} color="#d4a843" label="Calories" value={`${tracking?.calories_consumed || 0}`} />
                <Ring progress={proPct} color="#dc2626" label="Protein" value={`${tracking?.protein_consumed || 0}g`} />
                <Ring progress={waterPct} color="#3b82f6" label="Water" value={`${tracking?.water_glasses || 0}/${waterGoal}`} />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-caesar-muted flex items-center gap-1"><Flame className="w-3 h-3" /> Calories</span>
                    <span className="text-xs font-semibold text-caesar-gold">{tracking?.calories_consumed || 0} / {calorieGoal}</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-gold-dark to-caesar-gold rounded-full transition-all duration-500" style={{ width: `${calPct}%` }} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[100, 200, 300].map((v) => (
                      <button key={v} onClick={() => updateTracking({ calories_consumed: (tracking?.calories_consumed || 0) + v })}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-caesar-gold transition-colors">
                        <Plus className="w-2.5 h-2.5" />{v}
                      </button>
                    ))}
                    <button onClick={() => updateTracking({ calories_consumed: Math.max(0, (tracking?.calories_consumed || 0) - 100) })}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-caesar-red transition-colors">
                      <Minus className="w-2.5 h-2.5" />100
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-caesar-muted flex items-center gap-1"><Target className="w-3 h-3" /> Protein</span>
                    <span className="text-xs font-semibold text-caesar-red">{tracking?.protein_consumed || 0} / {proteinGoal}g</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-caesar-red to-caesar-red-glow rounded-full transition-all duration-500" style={{ width: `${proPct}%` }} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[5, 10, 20].map((v) => (
                      <button key={v} onClick={() => updateTracking({ protein_consumed: (tracking?.protein_consumed || 0) + v })}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-caesar-red transition-colors">
                        <Plus className="w-2.5 h-2.5" />{v}g
                      </button>
                    ))}
                    <button onClick={() => updateTracking({ protein_consumed: Math.max(0, (tracking?.protein_consumed || 0) - 5) })}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-caesar-red transition-colors">
                      <Minus className="w-2.5 h-2.5" />5g
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-caesar-muted flex items-center gap-1"><Droplets className="w-3 h-3" /> Water</span>
                    <span className="text-xs font-semibold text-blue-400">{tracking?.water_glasses || 0} / {waterGoal} glasses</span>
                  </div>
                  <div className="w-full h-2 bg-caesar-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${waterPct}%` }} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => updateTracking({ water_glasses: Math.min(waterGoal, (tracking?.water_glasses || 0) + 1) })}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-blue-400 transition-colors">
                      <Plus className="w-2.5 h-2.5" />1 glass
                    </button>
                    <button onClick={() => updateTracking({ water_glasses: Math.max(0, (tracking?.water_glasses || 0) - 1) })}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-blue-400 transition-colors">
                      <Minus className="w-2.5 h-2.5" />1 glass
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between glass rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-caesar-gold" />
                    <span className="text-xs text-caesar-muted">Workout completed today?</span>
                  </div>
                  <button onClick={() => updateTracking({ workout_completed: !tracking?.workout_completed })}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                      tracking?.workout_completed ? 'bg-green-500/20 text-green-400' : 'glass text-caesar-muted hover:text-caesar-white'
                    }`}>
                    {tracking?.workout_completed ? 'Done!' : 'Mark Done'}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="glass-strong rounded-2xl p-6 glow-gold">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-caesar-gold" />
                <h3 className="text-sm font-bold text-caesar-white">AI Insights</h3>
              </div>
              <div className="space-y-3">
                {tracking && tracking.protein_consumed < proteinGoal * 0.5 && (
                  <div className="glass-red rounded-xl p-3">
                    <p className="text-xs text-caesar-red font-medium mb-0.5">Protein Alert</p>
                    <p className="text-[10px] text-caesar-muted">You need {proteinGoal - tracking.protein_consumed}g more protein today. Add eggs, paneer, or chicken to hit your target.</p>
                  </div>
                )}
                {tracking && tracking.water_glasses < waterGoal * 0.5 && (
                  <div className="glass rounded-xl p-3 border border-blue-500/20">
                    <p className="text-xs text-blue-400 font-medium mb-0.5">Hydration Reminder</p>
                    <p className="text-[10px] text-caesar-muted">Drink {waterGoal - tracking.water_glasses} more glasses of water. Hydration impacts muscle recovery.</p>
                  </div>
                )}
                {tracking && tracking.calories_consumed > 0 && (
                  <div className="glass-gold rounded-xl p-3">
                    <p className="text-xs text-caesar-gold font-medium mb-0.5">Daily Summary</p>
                    <p className="text-[10px] text-caesar-muted">Calories: {tracking.calories_consumed}/{calorieGoal} | Protein: {tracking.protein_consumed}/{proteinGoal}g | Water: {tracking.water_glasses}/{waterGoal}</p>
                  </div>
                )}
                {streakCount > 0 && (
                  <div className="glass rounded-xl p-3">
                    <p className="text-xs text-caesar-white font-medium mb-0.5 flex items-center gap-1"><Star className="w-3 h-3 text-caesar-gold" /> Streak: {streakCount} days</p>
                    <p className="text-[10px] text-caesar-muted">Keep going! Consistency is the key to transformation.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-caesar-white">Saved Meals</h3>
              <Link to="/meal-generator" className="flex items-center gap-1 text-xs text-caesar-red hover:text-caesar-red-glow transition-colors">
                Generate new <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {savedMeals.length === 0 ? (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <Utensils className="w-10 h-10 text-caesar-border mx-auto mb-3" />
                <p className="text-sm text-caesar-muted mb-2">No saved meals yet</p>
                <Link to="/meal-generator" className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs">
                  <Apple className="w-3.5 h-3.5" /> Generate AI Meals
                </Link>
              </div>
            ) : (
              savedMeals.map((meal) => (
                <div key={meal.id} className="glass-strong rounded-xl p-4 flex items-center justify-between card-3d">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-caesar-red/20 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-caesar-red" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-caesar-white">{meal.name}</p>
                      <p className="text-[10px] text-caesar-muted capitalize">{meal.meal_type} meal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-caesar-gold">{meal.calories} cal</p>
                    <p className="text-[10px] text-caesar-muted">{meal.protein_g}g protein</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-caesar-white">Saved Workouts</h3>
              <Link to="/workout-generator" className="flex items-center gap-1 text-xs text-caesar-gold hover:text-caesar-gold-light transition-colors">
                Generate new <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {savedWorkouts.length === 0 ? (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <Dumbbell className="w-10 h-10 text-caesar-border mx-auto mb-3" />
                <p className="text-sm text-caesar-muted mb-2">No saved workouts yet</p>
                <Link to="/workout-generator" className="btn-gold inline-flex items-center gap-2 px-4 py-2 text-xs">
                  <Dumbbell className="w-3.5 h-3.5" /> Generate AI Workout
                </Link>
              </div>
            ) : (
              savedWorkouts.map((w) => (
                <div key={w.id} className="glass-strong rounded-xl p-4 flex items-center justify-between card-3d">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-caesar-gold/20 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-caesar-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-caesar-white">{w.name}</p>
                      <p className="text-[10px] text-caesar-muted capitalize">{w.difficulty} | {w.target_muscle.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-caesar-gold">{w.sets} x {w.reps}</p>
                    <p className="text-[10px] text-caesar-muted">{new Date(w.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-caesar-gold" /> Log Weight</h3>
              <div className="flex gap-3">
                <input type="number" value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
                  className="flex-1 bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                  placeholder="Weight in kg" />
                <button onClick={async () => {
                  if (!weightInput) return;
                  await updateTracking({ weight_kg: parseFloat(weightInput) });
                  await updateProfile({ weight_kg: parseFloat(weightInput) });
                  setWeightInput('');
                }} className="btn-primary flex items-center gap-2 px-4 py-3 text-xs">
                  <Save className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-caesar-gold" /> Achievements</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { icon: Flame, label: '7-Day Streak', unlocked: streakCount >= 7 },
                  { icon: TrendingUp, label: 'First 5kg', unlocked: false },
                  { icon: Award, label: '30-Day Champ', unlocked: streakCount >= 30 },
                  { icon: Star, label: '100 Meals', unlocked: savedMeals.length >= 100 },
                  { icon: Flame, label: '100 Streak', unlocked: streakCount >= 100 },
                  { icon: Crown, label: 'Elite Body', unlocked: false },
                ].map((badge, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${badge.unlocked ? 'glass-gold glow-gold' : 'glass opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-caesar-gold/20' : 'bg-caesar-border'}`}>
                      <badge.icon className={`w-5 h-5 ${badge.unlocked ? 'text-caesar-gold' : 'text-caesar-muted'}`} />
                    </div>
                    <span className={`text-[9px] font-medium text-center ${badge.unlocked ? 'text-caesar-gold' : 'text-caesar-muted'}`}>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {isFree && (
              <div className="glass-strong rounded-2xl p-6 text-center glow-red">
                <Crown className="w-8 h-8 text-caesar-gold mx-auto mb-3" />
                <h3 className="text-base font-bold text-caesar-white mb-2">Unlock Advanced Analytics</h3>
                <p className="text-xs text-caesar-muted mb-4">Upgrade to Pro or Elite for weekly reports, transformation tracking, and advanced body analytics.</p>
                <Link to="/pricing" className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm">
                  <Crown className="w-4 h-4" /> Upgrade Plan
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4 flex items-center gap-2"><Settings className="w-4 h-4" /> Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Daily Calorie Goal</label>
                  <input type="number" defaultValue={calorieGoal}
                    onBlur={async (e) => { await updateProfile({ daily_calorie_goal: parseInt(e.target.value) || 2200 }); }}
                    className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Daily Protein Goal (g)</label>
                  <input type="number" defaultValue={proteinGoal}
                    onBlur={async (e) => { await updateProfile({ daily_protein_goal: parseInt(e.target.value) || 120 }); }}
                    className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Daily Water Goal (glasses)</label>
                  <input type="number" defaultValue={waterGoal}
                    onBlur={async (e) => { await updateProfile({ daily_water_goal: parseInt(e.target.value) || 8 }); }}
                    className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors" />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={profile?.is_hostel_mode}
                      onChange={async (e) => { await updateProfile({ is_hostel_mode: e.target.checked }); }}
                      className="w-3.5 h-3.5 rounded border-caesar-border bg-caesar-dark accent-caesar-red" />
                    <span className="text-xs text-caesar-muted">Hostel Mode</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4 flex items-center gap-2"><Crown className="w-4 h-4 text-caesar-gold" /> Subscription</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-caesar-white capitalize">{plan} Plan</p>
                  <p className="text-[10px] text-caesar-muted">AI generations left today: {aiGenerationsLeft === Infinity ? 'Unlimited' : aiGenerationsLeft}</p>
                </div>
                {isFree && (
                  <Link to="/pricing" className="btn-gold flex items-center gap-2 px-4 py-2 text-xs">
                    <Crown className="w-3.5 h-3.5" /> Upgrade
                  </Link>
                )}
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4">Account</h3>
              <p className="text-xs text-caesar-muted mb-3">{user?.email}</p>
              <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-xl glass-red text-xs text-caesar-red hover:glow-red transition-all">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
