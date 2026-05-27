import { useState, useRef } from 'react';
import { Flame, Clock, Target, Trophy, Zap, ChevronRight, Check, Play, Dumbbell, TrendingUp, Calendar, Star, X, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';
import {
  type WorkoutGoal,
  type Exercise,
  type WorkoutProgram,
  categoryLabels,
  getExercisesByGoal,
  workoutPrograms,
  getExerciseById,
} from '../data/workouts';

// ── Category Tabs ──────────────────────────────────────────────────

const categories: WorkoutGoal[] = [
  'beginner-transform',
  'muscle-gain',
  'fat-loss',
  'full-body',
  'abs-core',
  'chest',
  'arms',
  'shoulders',
  'legs',
];

function CategoryNav({ active, onChange }: { active: WorkoutGoal; onChange: (g: WorkoutGoal) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`relative shrink-0 px-5 py-2.5 rounded-xl text-sm font-space font-medium transition-all duration-300 ${
              active === cat
                ? 'bg-gradient-to-r from-caesar-blue/20 via-caesar-purple/20 to-caesar-cyan/20 text-caesar-white border border-caesar-blue/30 shadow-lg shadow-caesar-blue/10'
                : 'glass text-caesar-muted hover:text-caesar-white hover:border-caesar-border/50'
            }`}
          >
            {active === cat && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-caesar-blue/10 via-caesar-purple/10 to-caesar-cyan/10" />
            )}
            <span className="relative">{categoryLabels[cat]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Exercise Card ──────────────────────────────────────────────────

function ExerciseCard({ exercise, onAction }: { exercise: Exercise; onAction: (e: Exercise) => void }) {
  const [completed, setCompleted] = useState(false);

  const difficultyColor = {
    beginner: 'text-caesar-cyan',
    intermediate: 'text-caesar-purple',
    advanced: 'text-caesar-blue',
  };

  const difficultyBg = {
    beginner: 'bg-caesar-cyan/10 border-caesar-cyan/20',
    intermediate: 'bg-caesar-purple/10 border-caesar-purple/20',
    advanced: 'bg-caesar-blue/10 border-caesar-blue/20',
  };

  const muscleColor: Record<string, string> = {
    chest: 'text-caesar-blue',
    arms: 'text-caesar-purple',
    shoulders: 'text-caesar-cyan',
    legs: 'text-caesar-blue',
    abs: 'text-caesar-purple',
    'full-body': 'text-caesar-cyan',
    back: 'text-caesar-blue',
  };

  return (
    <div className={`group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${completed ? 'ring-2 ring-caesar-cyan/50' : ''}`}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark via-caesar-dark/50 to-transparent" />

        {/* Difficulty badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-space font-semibold uppercase border ${difficultyBg[exercise.difficulty]}`}>
          <span className={difficultyColor[exercise.difficulty]}>{exercise.difficulty}</span>
        </div>

        {/* Calories overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass rounded-lg px-2.5 py-1.5">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-space font-medium text-caesar-white">{exercise.caloriesPerSet * exercise.sets} cal</span>
        </div>

        {/* Duration overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 glass rounded-lg px-2.5 py-1.5">
          <Clock className="w-3.5 h-3.5 text-caesar-cyan" />
          <span className="text-xs font-space font-medium text-caesar-white">{exercise.duration}</span>
        </div>

        {/* Completed overlay */}
        {completed && (
          <div className="absolute inset-0 bg-caesar-cyan/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-caesar-cyan/30 flex items-center justify-center">
              <Check className="w-6 h-6 text-caesar-cyan" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-clash font-semibold text-caesar-white group-hover:text-gradient-premium transition-colors leading-tight">
            {exercise.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Target className={`w-3.5 h-3.5 ${muscleColor[exercise.targetMuscle] || 'text-caesar-blue'}`} />
          <span className="text-xs font-space text-caesar-muted capitalize">{exercise.targetMuscle.replace('-', ' ')}</span>
        </div>

        <p className="text-xs text-caesar-muted font-space leading-relaxed mb-4 line-clamp-2">
          {exercise.description}
        </p>

        {/* Sets & Reps */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 glass rounded-lg px-2.5 py-1.5">
            <Dumbbell className="w-3 h-3 text-caesar-purple" />
            <span className="text-[11px] font-space font-medium text-caesar-muted">{exercise.sets} sets</span>
          </div>
          <div className="flex items-center gap-1.5 glass rounded-lg px-2.5 py-1.5">
            <Zap className="w-3 h-3 text-caesar-blue" />
            <span className="text-[11px] font-space font-medium text-caesar-muted">{exercise.reps}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            setCompleted(!completed);
            onAction(exercise);
          }}
          className={`w-full py-3 rounded-xl text-sm font-space font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            completed
              ? 'bg-caesar-cyan/20 text-caesar-cyan border border-caesar-cyan/30'
              : 'bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan text-white hover:shadow-lg hover:shadow-caesar-blue/20'
          }`}
        >
          {completed ? (
            <><Check className="w-4 h-4" /> Completed</>
          ) : (
            <><Play className="w-4 h-4" /> Start Exercise</>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Program Card ───────────────────────────────────────────────────

function ProgramCard({ program, onSelect }: { program: WorkoutProgram; onSelect: (p: WorkoutProgram) => void }) {
  const { ref, isInView } = useInView(0.1);

  const goalColor: Record<string, string> = {
    'beginner-transform': 'from-caesar-cyan/20 to-caesar-blue/20 border-caesar-cyan/30',
    'muscle-gain': 'from-caesar-blue/20 to-caesar-purple/20 border-caesar-blue/30',
    'fat-loss': 'from-caesar-purple/20 to-caesar-cyan/20 border-caesar-purple/30',
    'full-body': 'from-caesar-cyan/20 to-caesar-purple/20 border-caesar-cyan/30',
  };

  const diffBadge = {
    beginner: 'bg-caesar-cyan/10 text-caesar-cyan border-caesar-cyan/20',
    intermediate: 'bg-caesar-purple/10 text-caesar-purple border-caesar-purple/20',
    advanced: 'bg-caesar-blue/10 text-caesar-blue border-caesar-blue/20',
  };

  return (
    <div
      ref={ref}
      className={`group relative glass rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark via-caesar-dark/60 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-r ${goalColor[program.goal] || ''} opacity-50`} />

        {/* Duration badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 glass rounded-lg px-3 py-1.5">
          <Calendar className="w-3.5 h-3.5 text-caesar-cyan" />
          <span className="text-xs font-space font-medium text-caesar-white">{program.duration}</span>
        </div>

        {/* Difficulty badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-space font-semibold uppercase border ${diffBadge[program.difficulty]}`}>
          {program.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-clash font-semibold text-caesar-white mb-2 group-hover:text-gradient-premium transition-colors">
          {program.name}
        </h3>
        <p className="text-xs text-caesar-muted font-space leading-relaxed mb-4 line-clamp-2">
          {program.description}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="glass rounded-lg p-2.5 text-center">
            <p className="text-lg font-clash font-bold text-caesar-cyan">{program.days}</p>
            <p className="text-[10px] text-caesar-muted font-space">Days</p>
          </div>
          <div className="glass rounded-lg p-2.5 text-center">
            <p className="text-lg font-clash font-bold text-caesar-purple">{program.schedule[0]?.calories || 0}+</p>
            <p className="text-[10px] text-caesar-muted font-space">Cal/Day</p>
          </div>
          <div className="glass rounded-lg p-2.5 text-center">
            <p className="text-lg font-clash font-bold text-caesar-blue">{program.schedule[0]?.duration || '0'}</p>
            <p className="text-[10px] text-caesar-muted font-space">Min/Day</p>
          </div>
        </div>

        <button
          onClick={() => onSelect(program)}
          className="w-full py-3 rounded-xl text-sm font-space font-semibold bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-caesar-blue/20 transition-all duration-300 group/btn"
        >
          View Plan <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// ── Program Detail Modal ───────────────────────────────────────────

function ProgramModal({ program, onClose }: { program: WorkoutProgram | null; onClose: () => void }) {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-caesar-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative glass-strong rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-caesar-border/50 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-caesar-border/30 transition-colors z-10">
          <X className="w-5 h-5 text-caesar-muted" />
        </button>

        {/* Header */}
        <div className="relative h-44 overflow-hidden rounded-t-3xl">
          <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark via-caesar-dark/50 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <h3 className="text-2xl font-clash font-bold text-caesar-white">{program.name}</h3>
            <p className="text-sm text-caesar-muted font-space mt-1">{program.description}</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-caesar-cyan" />
            <h4 className="text-lg font-clash font-semibold text-caesar-white">Weekly Schedule</h4>
          </div>

          <div className="space-y-3">
            {program.schedule.map((day) => {
              const dayExercises = day.exercises.map((id) => getExerciseById(id)).filter(Boolean) as Exercise[];
              return (
                <div key={day.day} className="glass rounded-xl p-4 group/day hover:border-caesar-blue/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-caesar-blue/20 to-caesar-purple/20 flex items-center justify-center">
                        <span className="text-xs font-clash font-bold text-caesar-blue">D{day.day}</span>
                      </div>
                      <div>
                        <h5 className="text-sm font-clash font-semibold text-caesar-white">{day.title}</h5>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-space text-caesar-muted flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {day.duration}
                          </span>
                          <span className="text-[10px] font-space text-caesar-cyan flex items-center gap-1">
                            <Flame className="w-3 h-3" /> {day.calories} cal
                          </span>
                        </div>
                      </div>
                    </div>
                    {day.exercises.length === 0 && (
                      <span className="text-xs font-space text-caesar-muted glass rounded-lg px-2.5 py-1">Rest Day</span>
                    )}
                  </div>

                  {dayExercises.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {dayExercises.map((ex) => (
                        <span key={ex.id} className="text-[10px] font-space font-medium px-2.5 py-1 rounded-lg bg-caesar-blue/10 text-caesar-blue border border-caesar-blue/20">
                          {ex.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3.5 rounded-xl text-sm font-space font-semibold bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-caesar-blue/20 transition-all"
          >
            <Play className="w-4 h-4" /> Start Program <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Progress Tracker ───────────────────────────────────────────────

function ProgressTracker({ completedCount, totalExercises }: { completedCount: number; totalExercises: number }) {
  const streak = 5;
  const weeklyGoal = 5;
  const weeklyDone = 3;
  const totalCalories = completedCount * 85;
  const pct = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const completed = [true, true, true, false, false, false, false];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Streak */}
      <div className="glass-strong rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-caesar-cyan/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-xs font-space font-medium text-caesar-muted uppercase tracking-wider">Streak</span>
          </div>
          <div className="text-3xl font-clash font-bold text-caesar-white mb-1">{streak} Days</div>
          <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-1000" style={{ width: `${(streak / 7) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Weekly Consistency */}
      <div className="glass-strong rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-caesar-blue/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-caesar-blue" />
            <span className="text-xs font-space font-medium text-caesar-muted uppercase tracking-wider">This Week</span>
          </div>
          <div className="text-3xl font-clash font-bold text-caesar-white mb-2">{weeklyDone}/{weeklyGoal}</div>
          <div className="flex gap-1.5">
            {days.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-space font-bold ${completed[i] ? 'bg-caesar-blue/30 text-caesar-blue' : 'bg-caesar-darker text-caesar-muted'}`}>
                  {completed[i] ? <Check className="w-3 h-3" /> : d[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calories Burned */}
      <div className="glass-strong rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-caesar-purple/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-caesar-purple" />
            <span className="text-xs font-space font-medium text-caesar-muted uppercase tracking-wider">Calories</span>
          </div>
          <div className="text-3xl font-clash font-bold text-gradient-premium">{totalCalories}</div>
          <p className="text-[10px] text-caesar-muted font-space mt-1">Estimated from completed exercises</p>
        </div>
      </div>

      {/* Progress */}
      <div className="glass-strong rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-caesar-cyan/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-caesar-cyan" />
            <span className="text-xs font-space font-medium text-caesar-muted uppercase tracking-wider">Progress</span>
          </div>
          <div className="text-3xl font-clash font-bold text-caesar-cyan mb-2">{pct}%</div>
          <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────────────

export default function WorkoutsSection() {
  const [activeCategory, setActiveCategory] = useState<WorkoutGoal>('beginner-transform');
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const { ref: headerRef, isInView: headerInView } = useInView(0.1);
  const { ref: progRef, isInView: progInView } = useInView(0.1);

  const filteredExercises = getExercisesByGoal(activeCategory);

  const handleExerciseAction = (exercise: Exercise) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(exercise.id)) {
        next.delete(exercise.id);
      } else {
        next.add(exercise.id);
      }
      return next;
    });
  };

  return (
    <section id="workouts" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-caesar-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-caesar-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-6">
            <Dumbbell className="w-4 h-4 text-caesar-blue" />
            <span className="text-xs font-space font-medium text-caesar-blue uppercase tracking-wider">Home Workouts</span>
          </div>
          <h2 className="heading-xl mb-4">
            <span className="text-caesar-white">Transform at Home.</span>
            <br />
            <span className="text-gradient-premium">Zero Equipment Needed.</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space">
            Bodyweight workouts designed for students, hostel users, and anyone who wants to build muscle and burn fat without a gym.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <ProgressTracker completedCount={completedExercises.size} totalExercises={filteredExercises.length} />
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <CategoryNav active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Exercise Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} onAction={handleExerciseAction} />
          ))}
        </div>

        {/* Divider */}
        <div className="divider mb-20" />

        {/* Workout Programs */}
        <div ref={progRef} className={`transition-all duration-700 ${progInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
              <Trophy className="w-4 h-4 text-caesar-purple" />
              <span className="text-xs font-space font-medium text-caesar-purple uppercase tracking-wider">Workout Programs</span>
            </div>
            <h2 className="heading-lg mb-4">
              <span className="text-caesar-white">Structured </span>
              <span className="text-gradient-premium">Transformation Plans</span>
            </h2>
            <p className="text-body max-w-xl mx-auto font-space">
              Follow proven programs designed to take you from beginner to transformed. Pick your goal and start today.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} onSelect={setSelectedProgram} />
            ))}
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
    </section>
  );
}
