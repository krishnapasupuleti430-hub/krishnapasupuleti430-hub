import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Flame, Droplets, Dumbbell, Apple, Target, Zap,
  TrendingUp, Award, Utensils, Plus, Save, LogOut, Settings,
  BarChart3, Star
} from 'lucide-react';

interface DailyTracking {
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

const STORAGE_KEY_TRACKING = 'caesar_ai_demo_tracking';
const STORAGE_KEY_MEALS = 'caesar_ai_demo_meals';
const STORAGE_KEY_WORKOUTS = 'caesar_ai_demo_workouts';
const STORAGE_KEY_STREAK = 'caesar_ai_demo_streak';

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

const DEMO_MEALS: SavedMeal[] = [
  { id: '1', name: 'Protein Oats Bowl', calories: 420, protein_g: 28, meal_type: 'breakfast', created_at: new Date().toISOString() },
  { id: '2', name: 'Grilled Chicken Salad', calories: 350, protein_g: 35, meal_type: 'lunch', created_at: new Date().toISOString() },
  { id: '3', name: 'Dal Rice Bowl', calories: 450, protein_g: 18, meal_type: 'dinner', created_at: new Date().toISOString() },
];

const DEMO_WORKOUTS: SavedWorkout[] = [
  { id: '1', name: 'Full Body HIIT', difficulty: 'intermediate', target_muscle: 'full_body', sets: 5, reps: 12, created_at: new Date().toISOString() },
  { id: '2', name: 'Push Day', difficulty: 'intermediate', target_muscle: 'upper', sets: 4, reps: 10, created_at: new Date(Date.now() - 86400000).toISOString() },
];

export default function DashboardPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [tracking, setTracking] = useState<DailyTracking | null>(null);
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'meals' | 'workouts' | 'progress' | 'settings'>('overview');
  const [weightInput, setWeightInput] = useState('');
  const [saving] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const storedTracking = localStorage.getItem(STORAGE_KEY_TRACKING);
    const storedMeals = localStorage.getItem(STORAGE_KEY_MEALS);
    const storedWorkouts = localStorage.getItem(STORAGE_KEY_WORKOUTS);
    const storedStreak = localStorage.getItem(STORAGE_KEY_STREAK);

    if (storedTracking) setTracking(JSON.parse(storedTracking));
    else {
      const defaultTracking: DailyTracking = {
        tracking_date: today,
        calories_consumed: 850,
        protein_consumed: 72,
        water_glasses: 5,
        workout_completed: false,
        workout_duration_minutes: 0,
        weight_kg: profile?.weight_kg || 70,
      };
      localStorage.setItem(STORAGE_KEY_TRACKING, JSON.stringify(defaultTracking));
      setTracking(defaultTracking);
    }

    if (storedMeals) setSavedMeals(JSON.parse(storedMeals));
    else {
      localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(DEMO_MEALS));
      setSavedMeals(DEMO_MEALS);
    }

    if (storedWorkouts) setSavedWorkouts(JSON.parse(storedWorkouts));
    else {
      localStorage.setItem(STORAGE_KEY_WORKOUTS, JSON.stringify(DEMO_WORKOUTS));
      setSavedWorkouts(DEMO_WORKOUTS);
    }

    if (storedStreak) setStreakCount(parseInt(storedStreak, 10));
    else {
      localStorage.setItem(STORAGE_KEY_STREAK, '3');
      setStreakCount(3);
    }
  }, [today, profile?.weight_kg]);

  const updateTracking = useCallback((updates: Partial<DailyTracking>) => {
    if (!tracking) return;
    const newTracking = { ...tracking, ...updates };
    localStorage.setItem(STORAGE_KEY_TRACKING, JSON.stringify(newTracking));
    setTracking(newTracking);
  }, [tracking]);

  const calorieGoal = profile?.daily_calorie_goal || 2200;
  const proteinGoal = profile?.daily_protein_goal || 150;
  const waterGoal = profile?.daily_water_goal || 8;

  const calPct = tracking ? Math.min((tracking.calories_consumed / calorieGoal) * 100, 100) : 0;
  const proPct = tracking ? Math.min((tracking.protein_consumed / proteinGoal) * 100, 100) : 0;
  const waterPct = tracking ? Math.min((tracking.water_glasses / waterGoal) * 100, 100) : 0;

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
            <h1 className="text-2xl font-black text-caesar-white mb-1">Dashboard</h1>
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
            <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-lg font-black text-caesar-white">{tracking?.water_glasses || 0}</p>
            <p className="text-[10px] text-caesar-muted">Water Glasses</p>
          </div>
          <div className="glass-strong rounded-xl p-4 text-center">
            <Dumbbell className="w-5 h-5 text-caesar-gold mx-auto mb-1" />
            <p className="text-lg font-black text-caesar-white">{savedWorkouts.length}</p>
            <p className="text-[10px] text-caesar-muted">Workouts</p>
          </div>
          <div className="glass-strong rounded-xl p-4 text-center">
            <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-lg font-black text-caesar-white">{profile?.target_weight_kg || '--'}</p>
            <p className="text-[10px] text-caesar-muted">Target kg</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'glass-red text-caesar-red' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4">Today's Progress</h3>
              <div className="flex justify-around">
                <Ring progress={calPct} color="#dc2626" label="Calories" value={`${tracking?.calories_consumed || 0}`} />
                <Ring progress={proPct} color="#d4a843" label="Protein" value={`${tracking?.protein_consumed || 0}g`} />
                <Ring progress={waterPct} color="#3b82f6" label="Water" value={`${tracking?.water_glasses || 0}`} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-caesar-white flex items-center gap-2">
                    <Utensils className="w-4 h-4" /> Recent Meals
                  </h3>
                  <span className="text-xs text-caesar-muted">{savedMeals.length} total</span>
                </div>
                <div className="space-y-2">
                  {savedMeals.slice(0, 3).map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between p-2 rounded-lg glass">
                      <div>
                        <p className="text-xs font-medium text-caesar-white">{meal.name}</p>
                        <p className="text-[10px] text-caesar-muted">{meal.meal_type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-caesar-red">{meal.calories} kcal</p>
                        <p className="text-[10px] text-caesar-gold">{meal.protein_g}g protein</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/meal-generator" className="btn-primary w-full flex items-center justify-center gap-2 mt-4 py-2 text-xs">
                  <Plus className="w-3 h-3" /> Add Meal
                </Link>
              </div>

              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-caesar-white flex items-center gap-2">
                    <Dumbbell className="w-4 h-4" /> Workouts
                  </h3>
                  <span className="text-xs text-caesar-muted">{savedWorkouts.length} total</span>
                </div>
                <div className="space-y-2">
                  {savedWorkouts.slice(0, 3).map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-2 rounded-lg glass">
                      <div>
                        <p className="text-xs font-medium text-caesar-white">{workout.name}</p>
                        <p className="text-[10px] text-caesar-muted">{workout.target_muscle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-caesar-gold">{workout.sets}x{workout.reps}</p>
                        <p className="text-[10px] text-caesar-muted">{workout.difficulty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/workout-generator" className="btn-gold w-full flex items-center justify-center gap-2 mt-4 py-2 text-xs">
                  <Plus className="w-3 h-3" /> Generate Workout
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-strong rounded-2xl p-4">
              <h3 className="text-xs font-bold text-caesar-white mb-3">Quick Update</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => updateTracking({ water_glasses: (tracking?.water_glasses || 0) + 1 })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass text-xs text-caesar-muted hover:text-blue-400 transition-colors">
                  <Plus className="w-3 h-3" /> Water
                </button>
                <button onClick={() => updateTracking({ workout_completed: true, workout_duration_minutes: 45 })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass text-xs text-caesar-muted hover:text-caesar-gold transition-colors">
                  <Dumbbell className="w-3 h-3" /> Log Workout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="animate-fade-in">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-caesar-white flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Saved Meals
                </h3>
                <Link to="/meal-generator" className="btn-primary flex items-center gap-2 px-4 py-2 text-xs">
                  <Plus className="w-3 h-3" /> Add Meal
                </Link>
              </div>
              <div className="space-y-3">
                {savedMeals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between p-4 rounded-xl glass">
                    <div>
                      <p className="text-sm font-medium text-caesar-white">{meal.name}</p>
                      <p className="text-[10px] text-caesar-muted">{meal.meal_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-caesar-red">{meal.calories} kcal</p>
                      <p className="text-xs text-caesar-gold">{meal.protein_g}g protein</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <div className="animate-fade-in">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-caesar-white flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> Saved Workouts
                </h3>
                <Link to="/workout-generator" className="btn-gold flex items-center gap-2 px-4 py-2 text-xs">
                  <Plus className="w-3 h-3" /> Generate Workout
                </Link>
              </div>
              <div className="space-y-3">
                {savedWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 rounded-xl glass">
                    <div>
                      <p className="text-sm font-medium text-caesar-white">{workout.name}</p>
                      <p className="text-[10px] text-caesar-muted">{workout.target_muscle} | {workout.difficulty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-caesar-gold">{workout.sets}x{workout.reps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="animate-fade-in space-y-6">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Progress Tracking
              </h3>

              <div className="mb-6">
                <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Log Today's Weight (kg)</label>
                <div className="flex gap-2">
                  <input type="number" value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
                    className="flex-1 bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors"
                    placeholder="70" />
                  <button onClick={() => { if (weightInput) { updateTracking({ weight_kg: parseFloat(weightInput) }); setWeightInput(''); } }}
                    disabled={saving || !weightInput}
                    className="btn-primary flex items-center gap-2 px-4">
                    {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-center py-8 text-caesar-muted">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Progress charts will appear here as you log your weight</p>
                <p className="text-xs mt-1">Demo Mode: Data stored locally</p>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" /> Achievements
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { icon: Flame, label: '7-Day Streak', unlocked: streakCount >= 7 },
                  { icon: TrendingUp, label: 'First 5kg', unlocked: false },
                  { icon: Award, label: '30-Day Champ', unlocked: streakCount >= 30 },
                  { icon: Star, label: '100 Meals', unlocked: savedMeals.length >= 100 },
                  { icon: Flame, label: '100 Streak', unlocked: streakCount >= 100 },
                  { icon: Zap, label: 'Elite Body', unlocked: false },
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
                    onBlur={async (e) => { await updateProfile({ daily_protein_goal: parseInt(e.target.value) || 150 }); }}
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
              <h3 className="text-sm font-bold text-caesar-white mb-4">Account</h3>
              <p className="text-xs text-caesar-muted mb-3">{user?.email}</p>
              <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-xl glass-red text-xs text-caesar-red hover:glow-red transition-all">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>

            <div className="glass rounded-xl p-4 flex items-center gap-3">
              <Zap className="w-5 h-5 text-caesar-gold shrink-0" />
              <p className="text-xs text-caesar-muted">Demo Mode: All data is stored locally in your browser. No backend connection.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
