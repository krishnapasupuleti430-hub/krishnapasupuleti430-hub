import { useState, useEffect } from 'react';
import { Flame, Clock, Check, Play, Dumbbell, TrendingUp, Calendar, ChevronRight, Trophy, Zap, RotateCcw, Star } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';
import { weekPlan, type Exercise, type WorkoutDay } from '../data/workouts';

// ── Day Progress State ──────────────────────────────────────────────

function useDayProgress() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const toggleExercise = (id: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completeDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const resetWeek = () => {
    setCompletedDays(new Set());
    setCompletedExercises(new Set());
  };

  const dayProgress = (day: WorkoutDay) => {
    const total = day.exercises.length;
    const done = day.exercises.filter((e) => completedExercises.has(e.id)).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const isDayComplete = (day: number) => completedDays.has(day);
  const streak = completedDays.size;
  const totalCalories = weekPlan
    .filter((d) => completedDays.has(d.day))
    .reduce((sum, d) => sum + d.calories, 0);

  return { completedDays, completedExercises, toggleExercise, completeDay, resetWeek, dayProgress, isDayComplete, streak, totalCalories };
}

// ── Streak + Progress Header ────────────────────────────────────────

function ProgressHeader({ streak, totalCalories, completedDays, onReset }: {
  streak: number;
  totalCalories: number;
  completedDays: Set<number>;
  onReset: () => void;
}) {
  const weekPct = Math.round((completedDays.size / 7) * 100);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="glass-strong rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h3 className="text-sm font-clash font-semibold text-caesar-white">Your Week</h3>
        </div>
        <button onClick={onReset} className="flex items-center gap-1.5 text-[10px] font-space text-caesar-muted hover:text-caesar-cyan transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Day dots */}
      <div className="flex items-center justify-between mb-6">
        {weekPlan.map((day, i) => {
          const done = completedDays.has(day.day);
          return (
            <div key={day.day} className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-space font-bold transition-all duration-500 ${
                done
                  ? 'bg-gradient-to-br from-caesar-cyan to-caesar-blue text-white shadow-lg shadow-caesar-cyan/20'
                  : day.isRest
                  ? 'bg-caesar-darker border border-caesar-border text-caesar-muted'
                  : 'glass text-caesar-muted'
              }`}>
                {done ? <Check className="w-4 h-4" /> : dayLabels[i]}
              </div>
              <span className="text-[9px] text-caesar-muted font-space">D{day.day}</span>
            </div>
          );
        })}
      </div>

      {/* Week progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-space mb-2">
          <span className="text-caesar-muted">Week Progress</span>
          <span className="text-caesar-cyan font-semibold">{weekPct}%</span>
        </div>
        <div className="w-full h-2.5 bg-caesar-darker rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-full transition-all duration-1000"
            style={{ width: `${weekPct}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xl font-clash font-bold text-orange-400">{streak}</p>
          <p className="text-[10px] text-caesar-muted font-space">Day Streak</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xl font-clash font-bold text-caesar-cyan">{totalCalories}</p>
          <p className="text-[10px] text-caesar-muted font-space">Cal Burned</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xl font-clash font-bold text-gradient-premium">{completedDays.size}/7</p>
          <p className="text-[10px] text-caesar-muted font-space">Days Done</p>
        </div>
      </div>
    </div>
  );
}

// ── Day Card (overview mode) ────────────────────────────────────────

function DayCard({ day, isComplete, progress, onSelect }: {
  day: WorkoutDay;
  isComplete: boolean;
  progress: number;
  onSelect: (day: WorkoutDay) => void;
}) {
  const { ref, isInView } = useInView(0.1);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (isComplete && !justCompleted) setJustCompleted(true);
  }, [isComplete]);

  const dayColors = [
    'from-caesar-blue/20 to-caesar-purple/20 border-caesar-blue/30',
    'from-caesar-purple/20 to-caesar-cyan/20 border-caesar-purple/30',
    'from-caesar-cyan/20 to-caesar-blue/20 border-caesar-cyan/30',
    'from-caesar-border/10 to-caesar-border/5 border-caesar-border/20',
    'from-caesar-blue/20 to-caesar-cyan/20 border-caesar-blue/30',
    'from-caesar-purple/20 to-caesar-red/20 border-caesar-purple/30',
    'from-caesar-border/10 to-caesar-border/5 border-caesar-border/20',
  ];

  const dayGradients = [
    'from-caesar-blue to-caesar-purple',
    'from-caesar-purple to-caesar-cyan',
    'from-caesar-cyan to-caesar-blue',
    'from-caesar-muted to-caesar-border',
    'from-caesar-blue to-caesar-cyan',
    'from-caesar-purple to-caesar-red',
    'from-caesar-muted to-caesar-border',
  ];

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <button
        onClick={() => onSelect(day)}
        className={`w-full text-left glass-strong rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
          isComplete ? 'ring-2 ring-caesar-cyan/40' : ''
        }`}
      >
        {/* Image header */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={day.image}
            alt={day.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark via-caesar-dark/70 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-r ${dayColors[day.day - 1]} opacity-40`} />

          {/* Day number */}
          <div className="absolute top-3 left-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dayGradients[day.day - 1]} flex items-center justify-center shadow-lg`}>
              <span className="text-sm font-clash font-bold text-white">{day.day}</span>
            </div>
          </div>

          {/* Completed badge */}
          {isComplete && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-caesar-cyan/30 border border-caesar-cyan/50 flex items-center justify-center animate-scale-in">
              <Check className="w-4 h-4 text-caesar-cyan" />
            </div>
          )}

          {/* Rest day badge */}
          {day.isRest && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-[10px] font-space font-medium text-caesar-muted">
              Rest Day
            </div>
          )}

          {/* Duration + Calories */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 glass rounded-lg px-2 py-1">
              <Clock className="w-3 h-3 text-caesar-cyan" />
              <span className="text-[10px] font-space font-medium text-caesar-white">{day.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 glass rounded-lg px-2 py-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-[10px] font-space font-medium text-caesar-white">{day.calories} cal</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-clash font-semibold text-caesar-white mb-1 group-hover:text-gradient-premium transition-all">
            Day {day.day}: {day.title}
          </h3>
          <p className="text-xs text-caesar-muted font-space mb-3">{day.subtitle}</p>

          {/* Target muscles */}
          <div className="flex items-center gap-1.5 mb-4">
            <Dumbbell className="w-3 h-3 text-caesar-blue" />
            <span className="text-[10px] text-caesar-muted font-space">{day.targetMuscles}</span>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[10px] font-space mb-1">
              <span className="text-caesar-muted">{day.exercises.length} exercises</span>
              <span className={isComplete ? 'text-caesar-cyan font-semibold' : 'text-caesar-muted'}>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-caesar-darker rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isComplete
                    ? 'bg-gradient-to-r from-caesar-cyan to-caesar-blue'
                    : 'bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className={`w-full py-2.5 rounded-xl text-sm font-space font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            isComplete
              ? 'bg-caesar-cyan/15 text-caesar-cyan border border-caesar-cyan/25'
              : 'bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan text-white group-hover:shadow-lg group-hover:shadow-caesar-blue/20'
          }`}>
            {isComplete ? (
              <><Trophy className="w-4 h-4" /> Day Complete</>
            ) : (
              <><Play className="w-4 h-4" /> Start Day {day.day}<ChevronRight className="w-4 h-4" /></>
            )}
          </div>
        </div>
      </button>

      {/* Completion celebration */}
      {justCompleted && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute inset-0 bg-caesar-cyan/10 rounded-2xl animate-pulse" style={{ animationDuration: '1s', animationIterationCount: '2' }} />
        </div>
      )}
    </div>
  );
}

// ── Exercise Row (in day detail view) ────────────────────────────────

function ExerciseRow({ exercise, isCompleted, onToggle }: {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isCompleted ? 'ring-1 ring-caesar-cyan/40' : ''}`}>
      <div className="flex items-stretch gap-0">
        {/* Image */}
        <div className="relative w-24 sm:w-28 shrink-0 overflow-hidden">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-caesar-dark/80" />
          {isCompleted && (
            <div className="absolute inset-0 bg-caesar-cyan/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-caesar-cyan" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="flex items-start justify-between mb-1.5">
            <h4 className="text-sm font-clash font-semibold text-caesar-white">{exercise.name}</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-caesar-blue/10 text-caesar-blue font-space font-medium border border-caesar-blue/20 shrink-0 ml-2">
              {exercise.targetMuscle}
            </span>
          </div>

          <p className="text-[10px] text-caesar-muted font-space leading-relaxed mb-2.5 line-clamp-2">
            {exercise.tip}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-space font-medium px-2 py-1 rounded-md bg-caesar-purple/10 text-caesar-purple border border-caesar-purple/15">
              {exercise.sets} sets x {exercise.reps}
            </span>
            <span className="text-[10px] font-space font-medium px-2 py-1 rounded-md bg-caesar-cyan/10 text-caesar-cyan border border-caesar-cyan/15 flex items-center gap-1">
              <Flame className="w-2.5 h-2.5" /> {exercise.caloriesPerSet * exercise.sets} cal
            </span>
            <span className="text-[10px] font-space font-medium px-2 py-1 rounded-md bg-caesar-blue/10 text-caesar-blue border border-caesar-blue/15 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {exercise.duration}
            </span>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className={`w-12 sm:w-14 flex items-center justify-center shrink-0 transition-all duration-300 ${
            isCompleted
              ? 'bg-caesar-cyan/20 hover:bg-caesar-cyan/30'
              : 'bg-caesar-darker hover:bg-gradient-to-b hover:from-caesar-blue/20 hover:to-caesar-purple/20'
          }`}
        >
          {isCompleted ? (
            <Check className="w-5 h-5 text-caesar-cyan" />
          ) : (
            <Play className="w-5 h-5 text-caesar-muted" />
          )}
        </button>
      </div>
    </div>
  );
}

// ── Day Detail View ──────────────────────────────────────────────────

function DayDetail({ day, isComplete, progress, completedExercises, onToggleExercise, onCompleteDay, onBack }: {
  day: WorkoutDay;
  isComplete: boolean;
  progress: number;
  completedExercises: Set<string>;
  onToggleExercise: (id: string) => void;
  onCompleteDay: () => void;
  onBack: () => void;
}) {
  const doneCount = day.exercises.filter((e) => completedExercises.has(e.id)).length;

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-space text-caesar-muted hover:text-caesar-white transition-colors mb-6">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Week
      </button>

      {/* Day header */}
      <div className="glass-strong rounded-2xl overflow-hidden mb-6">
        <div className="relative h-40 overflow-hidden">
          <img src={day.image} alt={day.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark via-caesar-dark/60 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-caesar-blue to-caesar-purple flex items-center justify-center">
                <span className="text-xs font-clash font-bold text-white">D{day.day}</span>
              </div>
              {day.isRest && (
                <span className="text-[10px] px-2 py-1 rounded-full glass text-caesar-muted font-space font-medium">Rest Day</span>
              )}
            </div>
            <h3 className="text-xl font-clash font-bold text-caesar-white">Day {day.day}: {day.title}</h3>
            <p className="text-xs text-caesar-muted font-space mt-1">{day.subtitle}</p>
          </div>
        </div>

        {/* Day stats */}
        <div className="p-5">
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="glass rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Clock className="w-3 h-3 text-caesar-cyan" />
              </div>
              <p className="text-sm font-clash font-bold text-caesar-white">{day.duration}</p>
              <p className="text-[9px] text-caesar-muted font-space">Duration</p>
            </div>
            <div className="glass rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Flame className="w-3 h-3 text-orange-400" />
              </div>
              <p className="text-sm font-clash font-bold text-caesar-white">{day.calories}</p>
              <p className="text-[9px] text-caesar-muted font-space">Calories</p>
            </div>
            <div className="glass rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Dumbbell className="w-3 h-3 text-caesar-purple" />
              </div>
              <p className="text-sm font-clash font-bold text-caesar-white">{day.exercises.length}</p>
              <p className="text-[9px] text-caesar-muted font-space">Exercises</p>
            </div>
            <div className="glass rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <TrendingUp className="w-3 h-3 text-caesar-blue" />
              </div>
              <p className="text-sm font-clash font-bold text-caesar-white">{progress}%</p>
              <p className="text-[9px] text-caesar-muted font-space">Done</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-caesar-darker rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isComplete ? 'bg-gradient-to-r from-caesar-cyan to-caesar-blue' : 'bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercise list */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-clash font-semibold text-caesar-white">Exercises ({doneCount}/{day.exercises.length} done)</h4>
        </div>
        {day.exercises.map((exercise) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            isCompleted={completedExercises.has(exercise.id)}
            onToggle={() => onToggleExercise(exercise.id)}
          />
        ))}
      </div>

      {/* Complete Day button */}
      <button
        onClick={() => {
          if (!isComplete) onCompleteDay();
        }}
        disabled={isComplete}
        className={`w-full py-4 rounded-xl text-base font-space font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
          isComplete
            ? 'bg-caesar-cyan/15 text-caesar-cyan border border-caesar-cyan/25'
            : 'bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan text-white hover:shadow-lg hover:shadow-caesar-blue/30 hover:scale-[1.01]'
        }`}
      >
        {isComplete ? (
          <><Trophy className="w-5 h-5" /> Day {day.day} Complete!</>
        ) : (
          <><Star className="w-5 h-5" /> Complete Day {day.day}</>
        )}
      </button>
    </div>
  );
}

// ── Main Section ────────────────────────────────────────────────────

export default function WorkoutsSection() {
  const {
    completedDays,
    completedExercises,
    toggleExercise,
    completeDay,
    resetWeek,
    dayProgress,
    isDayComplete,
    streak,
    totalCalories,
  } = useDayProgress();

  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const { ref: headerRef, isInView: headerInView } = useInView(0.1);

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
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-caesar-cyan" />
            <span className="text-xs font-space font-medium text-caesar-cyan uppercase tracking-wider">7-Day Beginner Plan</span>
          </div>
          <h2 className="heading-xl mb-4">
            <span className="text-caesar-white">One Day at a Time.</span>
            <br />
            <span className="text-gradient-premium">No Equipment. No Confusion.</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space">
            Follow this simple 7-day plan. Just 4-6 exercises per day. Home workouts only. Start Day 1 and build your transformation.
          </p>
        </div>

        {selectedDay ? (
          /* ── Day Detail View ── */
          <DayDetail
            day={selectedDay}
            isComplete={isDayComplete(selectedDay.day)}
            progress={dayProgress(selectedDay)}
            completedExercises={completedExercises}
            onToggleExercise={toggleExercise}
            onCompleteDay={() => completeDay(selectedDay.day)}
            onBack={() => setSelectedDay(null)}
          />
        ) : (
          /* ── Week Overview ── */
          <>
            {/* Progress Header */}
            <ProgressHeader
              streak={streak}
              totalCalories={totalCalories}
              completedDays={completedDays}
              onReset={resetWeek}
            />

            {/* Day Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {weekPlan.map((day) => (
                <DayCard
                  key={day.day}
                  day={day}
                  isComplete={isDayComplete(day.day)}
                  progress={dayProgress(day)}
                  onSelect={setSelectedDay}
                />
              ))}
            </div>

            {/* Motivation footer */}
            <div className="mt-12 text-center">
              <div className="glass-strong rounded-2xl p-6 max-w-lg mx-auto">
                <Zap className="w-6 h-6 text-caesar-cyan mx-auto mb-3" />
                <p className="text-sm font-clash font-semibold text-caesar-white mb-1">Tap any day to start</p>
                <p className="text-xs text-caesar-muted font-space">Complete each exercise, then mark the day done. Build your streak one day at a time.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
