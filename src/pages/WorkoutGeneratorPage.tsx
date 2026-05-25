import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Flame, Clock, Save, Check, AlertCircle, Sparkles, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  target: string;
  instructions: string;
}

interface Workout {
  name: string;
  difficulty: string;
  target_muscle: string;
  duration: number;
  exercises: Exercise[];
}

const DEMO_WORKOUTS: Record<string, Workout> = {
  muscle_gain: {
    name: 'Full Body Strength Builder',
    difficulty: 'intermediate',
    target_muscle: 'full_body',
    duration: 45,
    exercises: [
      { name: 'Push-ups', sets: 4, reps: '12-15', rest: '60s', target: 'chest', instructions: 'Keep core tight, lower chest to floor, push back up.' },
      { name: 'Bodyweight Squats', sets: 4, reps: '15-20', rest: '60s', target: 'legs', instructions: 'Feet shoulder-width, sit back, keep chest up.' },
      { name: 'Plank', sets: 3, reps: '45s hold', rest: '30s', target: 'core', instructions: 'Hold straight line from head to heels.' },
      { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '45s', target: 'legs', instructions: 'Step forward, drop back knee, push through front heel.' },
      { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '45s', target: 'arms', instructions: 'Use chair or bench, lower body by bending elbows.' },
    ],
  },
  fat_loss: {
    name: 'HIIT Fat Burner',
    difficulty: 'intermediate',
    target_muscle: 'full_body',
    duration: 30,
    exercises: [
      { name: 'Jumping Jacks', sets: 4, reps: '30s', rest: '15s', target: 'cardio', instructions: 'Jump feet apart while raising arms overhead.' },
      { name: 'Mountain Climbers', sets: 4, reps: '30s', rest: '15s', target: 'core', instructions: 'Drive knees toward chest in plank position.' },
      { name: 'Burpees', sets: 3, reps: '8-10', rest: '30s', target: 'full_body', instructions: 'Squat, jump back to plank, push-up, jump forward, jump up.' },
      { name: 'High Knees', sets: 3, reps: '30s', rest: '15s', target: 'cardio', instructions: 'Run in place, bringing knees to hip height.' },
      { name: 'Bicycle Crunches', sets: 3, reps: '20 each side', rest: '20s', target: 'core', instructions: 'Alternate elbow to opposite knee.' },
    ],
  },
  beginner: {
    name: 'Beginner Foundation',
    difficulty: 'beginner',
    target_muscle: 'full_body',
    duration: 25,
    exercises: [
      { name: 'Wall Push-ups', sets: 3, reps: '10-12', rest: '45s', target: 'chest', instructions: 'Push against wall at arm length, keep body straight.' },
      { name: 'Chair Squats', sets: 3, reps: '10-12', rest: '45s', target: 'legs', instructions: 'Squat down to chair, tap seat, stand back up.' },
      { name: 'Modified Plank', sets: 2, reps: '20s hold', rest: '30s', target: 'core', instructions: 'Plank on knees, keep straight line.' },
      { name: 'Standing Marches', sets: 2, reps: '20 each leg', rest: '30s', target: 'legs', instructions: 'Alternate lifting knees to hip height.' },
      { name: 'Arm Circles', sets: 2, reps: '15 forward, 15 back', rest: '20s', target: 'shoulders', instructions: 'Extend arms, make small circles.' },
    ],
  },
};

export default function WorkoutGeneratorPage() {
  const { user } = useAuth();
  const [goal, setGoal] = useState('muscle_gain');
  const [level, setLevel] = useState('intermediate');
  const [equipment, setEquipment] = useState('none');
  const [duration, setDuration] = useState(30);
  const [targetMuscle, setTargetMuscle] = useState('full_body');
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateWorkout = () => {
    setLoading(true);
    setSaved(false);

    setTimeout(() => {
      let selectedWorkout = DEMO_WORKOUTS[goal] || DEMO_WORKOUTS.muscle_gain;

      if (level === 'beginner') {
        selectedWorkout = DEMO_WORKOUTS.beginner;
      }

      setWorkout(selectedWorkout);
      setLoading(false);
    }, 800);
  };

  const saveWorkout = async () => {
    if (!user || !workout) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-caesar-black pt-24 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-caesar-gold to-caesar-gold-light flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-caesar-black" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-caesar-white mb-2">AI Workout Generator</h1>
          <p className="text-sm text-caesar-muted">Get personalized workout plans tailored to your goals.</p>
          <p className="text-xs text-caesar-gold mt-2">Demo Mode - Showing sample workouts</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 mb-6">
          <h2 className="text-base font-bold text-caesar-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-caesar-red" /> Workout Preferences
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-gold/50 transition-colors"
              >
                <option value="muscle_gain">Build Muscle</option>
                <option value="fat_loss">Lose Fat</option>
                <option value="endurance">Improve Endurance</option>
                <option value="flexibility">Increase Flexibility</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Fitness Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-gold/50 transition-colors"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Equipment Available</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-gold/50 transition-colors"
              >
                <option value="none">No Equipment (Bodyweight)</option>
                <option value="basic">Basic (Dumbbells)</option>
                <option value="full">Full Gym</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Duration (minutes)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-gold/50 transition-colors"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Target Muscle</label>
            <select
              value={targetMuscle}
              onChange={(e) => setTargetMuscle(e.target.value)}
              className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-gold/50 transition-colors"
            >
              <option value="full_body">Full Body</option>
              <option value="upper">Upper Body</option>
              <option value="lower">Lower Body</option>
              <option value="core">Core Focus</option>
              <option value="arms">Arms & Shoulders</option>
            </select>
          </div>

          <button
            onClick={generateWorkout}
            disabled={loading}
            className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-caesar-black/30 border-t-caesar-black rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Workout
              </>
            )}
          </button>
        </div>

        {workout && (
          <>
            <div className="glass-strong rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-caesar-gold font-medium">{workout.difficulty}</span>
                  <h2 className="text-lg font-bold text-caesar-white">{workout.name}</h2>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-caesar-red">
                    <Flame className="w-4 h-4" /> ~{workout.duration} min
                  </div>
                  <div className="flex items-center gap-1 text-caesar-gold">
                    <Clock className="w-4 h-4" /> {workout.exercises.length} exercises
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {workout.exercises.map((ex, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-caesar-muted">{ex.target}</span>
                        <h3 className="text-sm font-bold text-caesar-white">{ex.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-caesar-gold">{ex.sets} x {ex.reps}</p>
                        <p className="text-[10px] text-caesar-muted">rest: {ex.rest}</p>
                      </div>
                    </div>
                    <p className="text-xs text-caesar-muted">{ex.instructions}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-caesar-border">
                <button
                  onClick={saveWorkout}
                  disabled={saved}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-green-500/20 text-green-400' : 'btn-primary'}`}
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4" /> Saved to Dashboard
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Workout
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="glass rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-caesar-gold shrink-0" />
              <p className="text-xs text-caesar-muted">Demo mode: This is a sample workout. AI-powered generation coming soon.</p>
            </div>
          </>
        )}

        <div className="mt-6 text-center">
          <Link to="/dashboard" className="text-xs text-caesar-muted hover:text-caesar-gold transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
