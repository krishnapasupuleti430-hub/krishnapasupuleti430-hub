import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import { Dumbbell, Save, AlertCircle, Loader2, Target, Zap } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  target_muscle: string;
  instructions: string;
}

interface Workout {
  name: string;
  description: string;
  total_duration: number;
  calories_burned: number;
  exercises: Exercise[];
  warmup: string;
  cooldown: string;
}

export default function WorkoutGeneratorPage() {
  const { user, profile } = useAuth();
  const { consumeAIGeneration, aiGenerationsLeft, isFree } = useSubscription();
  const [goal, setGoal] = useState(profile?.fitness_goal || 'muscle_gain');
  const [level, setLevel] = useState('beginner');
  const [equipment, setEquipment] = useState('none');
  const [duration, setDuration] = useState(30);
  const [targetMuscle, setTargetMuscle] = useState('full_body');
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const goals = [
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'fat_loss', label: 'Fat Loss' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'general_fitness', label: 'General Fitness' },
  ];

  const levels = ['beginner', 'intermediate', 'advanced'];
  const equipments = [
    { value: 'none', label: 'No Equipment (Home)' },
    { value: 'dumbbells', label: 'Dumbbells Only' },
    { value: 'full_gym', label: 'Full Gym' },
  ];
  const muscles = ['full_body', 'chest', 'back', 'shoulders', 'arms', 'legs', 'core'];

  const generateWorkout = async () => {
    if (!consumeAIGeneration()) {
      setError(`Daily AI limit reached. ${isFree ? 'Upgrade for more generations.' : 'Try again tomorrow.'}`);
      return;
    }

    setLoading(true);
    setError('');
    setWorkout(null);
    setSaved(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ goal, level, equipment, duration, targetMuscle }),
      });

      const data = await response.json();
      if (data.error) { setError(data.error); return; }
      setWorkout(data.workout);
    } catch {
      setError('Failed to generate workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = async () => {
    if (!user || !workout) return;
    const inserts = workout.exercises.map((ex) => ({
      user_id: user.id,
      name: ex.name,
      description: ex.instructions,
      workout_type: equipment === 'none' ? 'home' : 'gym',
      difficulty: level,
      target_muscle: ex.target_muscle,
      sets: ex.sets,
      reps: parseInt(ex.reps) || 12,
      duration_minutes: workout.total_duration,
      equipment_required: equipment !== 'none',
    }));

    const { error: err } = await supabase.from('workouts').insert(inserts);
    if (err) { setError(err.message); return; }
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-caesar-black pt-24 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-4">
            <Dumbbell className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">AI Workout Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-caesar-white mb-2">Generate Your AI Workout</h1>
          <p className="text-sm text-caesar-muted">AI creates personalized workouts based on your goals and equipment.</p>
          {isFree && <p className="text-xs text-caesar-gold mt-2">{aiGenerationsLeft} free generations left today</p>}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-strong rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-xs text-caesar-muted font-medium mb-2 block">Goal</label>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map((g) => (
                    <button key={g.value} onClick={() => setGoal(g.value)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all ${goal === g.value ? 'glass-red text-caesar-red border border-caesar-red/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-caesar-muted font-medium mb-2 block">Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((l) => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`p-2.5 rounded-xl text-xs font-medium capitalize transition-all ${level === l ? 'glass-gold text-caesar-gold border border-caesar-gold/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-caesar-muted font-medium mb-2 block">Equipment</label>
                <div className="space-y-2">
                  {equipments.map((e) => (
                    <button key={e.value} onClick={() => setEquipment(e.value)}
                      className={`w-full p-2.5 rounded-xl text-xs font-medium text-left transition-all ${equipment === e.value ? 'glass-red text-caesar-red border border-caesar-red/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-caesar-muted font-medium mb-2 block">Duration: {duration} min</label>
                <input type="range" min={15} max={60} step={5} value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full accent-caesar-red" />
              </div>

              <div>
                <label className="text-xs text-caesar-muted font-medium mb-2 block flex items-center gap-1"><Target className="w-3 h-3" /> Target Muscle</label>
                <div className="flex flex-wrap gap-1.5">
                  {muscles.map((m) => (
                    <button key={m} onClick={() => setTargetMuscle(m)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all ${targetMuscle === m ? 'glass-red text-caesar-red border border-caesar-red/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                      {m.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={generateWorkout} disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate AI Workout</>}
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {error && (
              <div className="glass-red rounded-xl p-4 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-caesar-red shrink-0" />
                <p className="text-xs text-caesar-red">{error}</p>
              </div>
            )}

            {loading && (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-caesar-gold border-t-transparent animate-spin mx-auto mb-4" />
                <p className="text-sm text-caesar-muted">Caesar AI is designing your workout...</p>
              </div>
            )}

            {!loading && workout && (
              <div className="space-y-4">
                <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-caesar-white">{workout.name}</h3>
                    <p className="text-xs text-caesar-muted mt-0.5">{workout.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm font-bold text-caesar-gold">{workout.total_duration}m</p>
                      <p className="text-[10px] text-caesar-muted">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-caesar-red">{workout.calories_burned}</p>
                      <p className="text-[10px] text-caesar-muted">Cal Burn</p>
                    </div>
                    <button onClick={saveWorkout} disabled={saved}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${saved ? 'bg-green-500/20 text-green-400' : 'glass-gold text-caesar-gold hover:glow-gold'}`}>
                      <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save'}
                    </button>
                  </div>
                </div>

                {workout.warmup && (
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs font-semibold text-caesar-gold mb-1">Warm-up</p>
                    <p className="text-xs text-caesar-muted">{workout.warmup}</p>
                  </div>
                )}

                {workout.exercises?.map((ex, i) => (
                  <div key={i} className="glass-strong rounded-2xl p-5 card-3d">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-full bg-caesar-gold/20 flex items-center justify-center text-[10px] font-bold text-caesar-gold">{i + 1}</span>
                          <h4 className="text-sm font-bold text-caesar-white">{ex.name}</h4>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-caesar-red/20 text-caesar-red ml-8">{ex.target_muscle}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-caesar-white">{ex.sets} x {ex.reps}</p>
                        <p className="text-[10px] text-caesar-muted">{ex.rest_seconds}s rest</p>
                      </div>
                    </div>
                    {ex.instructions && (
                      <p className="text-[10px] text-caesar-muted leading-relaxed ml-8">{ex.instructions}</p>
                    )}
                  </div>
                ))}

                {workout.cooldown && (
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-400 mb-1">Cool-down</p>
                    <p className="text-xs text-caesar-muted">{workout.cooldown}</p>
                  </div>
                )}
              </div>
            )}

            {!loading && !workout && !error && (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <Dumbbell className="w-12 h-12 text-caesar-border mx-auto mb-4" />
                <p className="text-sm text-caesar-muted">Select your preferences and click Generate</p>
                <p className="text-xs text-caesar-muted mt-1">AI will create a personalized workout plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
