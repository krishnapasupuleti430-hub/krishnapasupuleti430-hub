export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type MuscleGroup = 'chest' | 'arms' | 'shoulders' | 'legs' | 'abs' | 'full-body' | 'back';
export type WorkoutGoal = 'muscle-gain' | 'fat-loss' | 'full-body' | 'abs-core' | 'chest' | 'arms' | 'shoulders' | 'legs' | 'beginner-transform';

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: MuscleGroup;
  difficulty: Difficulty;
  caloriesPerSet: number;
  sets: number;
  reps: string;
  duration: string;
  image: string;
  description: string;
}

export interface WorkoutDay {
  day: number;
  title: string;
  exercises: string[];
  duration: string;
  calories: number;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  goal: WorkoutGoal;
  duration: string;
  days: number;
  difficulty: Difficulty;
  image: string;
  schedule: WorkoutDay[];
}

export const categoryLabels: Record<WorkoutGoal, string> = {
  'muscle-gain': 'Muscle Gain',
  'fat-loss': 'Fat Loss',
  'full-body': 'Full Body',
  'abs-core': 'Abs & Core',
  'chest': 'Chest',
  'arms': 'Arms',
  'shoulders': 'Shoulders',
  'legs': 'Legs',
  'beginner-transform': 'Beginner Transform',
};

export const exercises: Exercise[] = [
  {
    id: 'push-ups',
    name: 'Push-ups',
    targetMuscle: 'chest',
    difficulty: 'beginner',
    caloriesPerSet: 8,
    sets: 4,
    reps: '15 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Classic bodyweight chest builder. Keep core tight and lower with control.',
  },
  {
    id: 'wide-push-ups',
    name: 'Wide Push-ups',
    targetMuscle: 'chest',
    difficulty: 'beginner',
    caloriesPerSet: 9,
    sets: 3,
    reps: '12 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Wider hand placement targets outer chest for broader pectorals.',
  },
  {
    id: 'diamond-push-ups',
    name: 'Diamond Push-ups',
    targetMuscle: 'arms',
    difficulty: 'intermediate',
    caloriesPerSet: 10,
    sets: 3,
    reps: '10 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Close-grip push-ups targeting triceps and inner chest.',
  },
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    targetMuscle: 'legs',
    difficulty: 'beginner',
    caloriesPerSet: 12,
    sets: 4,
    reps: '20 reps',
    duration: '4 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Foundation leg exercise. Go deep and drive through heels.',
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    targetMuscle: 'legs',
    difficulty: 'beginner',
    caloriesPerSet: 11,
    sets: 3,
    reps: '12 each leg',
    duration: '4 min',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Unilateral leg builder with balance and stability benefits.',
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    targetMuscle: 'abs',
    difficulty: 'beginner',
    caloriesPerSet: 6,
    sets: 3,
    reps: '45 sec',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Isometric core stabilizer. Keep body in a straight line.',
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    targetMuscle: 'full-body',
    difficulty: 'intermediate',
    caloriesPerSet: 14,
    sets: 4,
    reps: '20 each leg',
    duration: '4 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cardio and core combo. Drive knees to chest with speed.',
  },
  {
    id: 'burpees',
    name: 'Burpees',
    targetMuscle: 'full-body',
    difficulty: 'intermediate',
    caloriesPerSet: 18,
    sets: 3,
    reps: '10 reps',
    duration: '5 min',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Ultimate fat-burning bodyweight exercise. Explosive full-body movement.',
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    targetMuscle: 'full-body',
    difficulty: 'beginner',
    caloriesPerSet: 10,
    sets: 4,
    reps: '30 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Classic cardio warm-up. Great for heart rate and calorie burn.',
  },
  {
    id: 'chair-dips',
    name: 'Chair Dips',
    targetMuscle: 'arms',
    difficulty: 'beginner',
    caloriesPerSet: 8,
    sets: 3,
    reps: '12 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Triceps builder using a chair or bed edge. Keep back close to surface.',
  },
  {
    id: 'pike-push-ups',
    name: 'Pike Push-ups',
    targetMuscle: 'shoulders',
    difficulty: 'intermediate',
    caloriesPerSet: 10,
    sets: 3,
    reps: '10 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hips raised push-up variant targeting shoulders and upper chest.',
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    targetMuscle: 'legs',
    difficulty: 'beginner',
    caloriesPerSet: 7,
    sets: 3,
    reps: '45 sec',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Isometric leg burner. Thighs parallel to floor, back against wall.',
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    targetMuscle: 'abs',
    difficulty: 'intermediate',
    caloriesPerSet: 9,
    sets: 3,
    reps: '20 each side',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Rotational core exercise hitting obliques and upper abs.',
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    targetMuscle: 'legs',
    difficulty: 'intermediate',
    caloriesPerSet: 15,
    sets: 3,
    reps: '12 reps',
    duration: '4 min',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Explosive squat variant for leg power and fat burning.',
  },
  {
    id: 'decline-push-ups',
    name: 'Decline Push-ups',
    targetMuscle: 'chest',
    difficulty: 'intermediate',
    caloriesPerSet: 11,
    sets: 3,
    reps: '12 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Feet elevated on chair or bed targeting upper chest.',
  },
  {
    id: 'superman-hold',
    name: 'Superman Hold',
    targetMuscle: 'back',
    difficulty: 'beginner',
    caloriesPerSet: 5,
    sets: 3,
    reps: '30 sec',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Back and glute strengthener. Lift arms and legs off the floor simultaneously.',
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    targetMuscle: 'full-body',
    difficulty: 'beginner',
    caloriesPerSet: 13,
    sets: 3,
    reps: '30 sec',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cardio exercise driving knees high. Great warm-up or fat burn finisher.',
  },
  {
    id: 'arm-circles',
    name: 'Arm Circles',
    targetMuscle: 'shoulders',
    difficulty: 'beginner',
    caloriesPerSet: 4,
    sets: 3,
    reps: '30 sec each direction',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Shoulder endurance exercise. Small to large circles for full deltoid burn.',
  },
  {
    id: 'leg-raises',
    name: 'Lying Leg Raises',
    targetMuscle: 'abs',
    difficulty: 'beginner',
    caloriesPerSet: 7,
    sets: 3,
    reps: '15 reps',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Lower ab target. Keep lower back pressed into the floor.',
  },
  {
    id: 'pike-hold',
    name: 'Pike Hold',
    targetMuscle: 'shoulders',
    difficulty: 'intermediate',
    caloriesPerSet: 7,
    sets: 3,
    reps: '30 sec',
    duration: '3 min',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Isometric shoulder builder. Hold pike position with hips high.',
  },
];

const exerciseMap = Object.fromEntries(exercises.map((e) => [e.id, e]));

export const workoutPrograms: WorkoutProgram[] = [
  {
    id: '7-day-beginner',
    name: '7-Day Beginner Plan',
    description: 'Perfect starting point for your fitness journey. Build habits and foundational strength in just one week.',
    goal: 'beginner-transform',
    duration: '1 Week',
    days: 7,
    difficulty: 'beginner',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=600',
    schedule: [
      { day: 1, title: 'Upper Body Foundation', exercises: ['push-ups', 'diamond-push-ups', 'chair-dips', 'arm-circles'], duration: '25 min', calories: 180 },
      { day: 2, title: 'Lower Body Power', exercises: ['squats', 'lunges', 'wall-sit', 'jumping-jacks'], duration: '25 min', calories: 200 },
      { day: 3, title: 'Core & Abs', exercises: ['plank', 'bicycle-crunches', 'leg-raises', 'mountain-climbers'], duration: '20 min', calories: 150 },
      { day: 4, title: 'Rest & Stretch', exercises: [], duration: '15 min', calories: 50 },
      { day: 5, title: 'Full Body Burn', exercises: ['burpees', 'mountain-climbers', 'squats', 'push-ups'], duration: '30 min', calories: 280 },
      { day: 6, title: 'Shoulders & Arms', exercises: ['pike-push-ups', 'pike-hold', 'chair-dips', 'diamond-push-ups'], duration: '25 min', calories: 170 },
      { day: 7, title: 'Active Recovery', exercises: ['jumping-jacks', 'arm-circles', 'superman-hold', 'plank'], duration: '20 min', calories: 100 },
    ],
  },
  {
    id: '30-day-transform',
    name: '30-Day Transformation',
    description: 'Complete body transformation program. Progressive overload from beginner to intermediate over 30 days.',
    goal: 'muscle-gain',
    duration: '30 Days',
    days: 30,
    difficulty: 'intermediate',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=600',
    schedule: [
      { day: 1, title: 'Chest & Triceps', exercises: ['push-ups', 'wide-push-ups', 'decline-push-ups', 'diamond-push-ups', 'chair-dips'], duration: '35 min', calories: 300 },
      { day: 2, title: 'Legs & Glutes', exercises: ['squats', 'lunges', 'jump-squats', 'wall-sit'], duration: '30 min', calories: 280 },
      { day: 3, title: 'Core & Abs', exercises: ['plank', 'bicycle-crunches', 'leg-raises', 'mountain-climbers'], duration: '25 min', calories: 180 },
      { day: 4, title: 'Back & Shoulders', exercises: ['pike-push-ups', 'superman-hold', 'pike-hold', 'arm-circles'], duration: '30 min', calories: 200 },
      { day: 5, title: 'Full Body HIIT', exercises: ['burpees', 'mountain-climbers', 'jump-squats', 'high-knees'], duration: '35 min', calories: 350 },
      { day: 6, title: 'Arms Focus', exercises: ['chair-dips', 'diamond-push-ups', 'pike-push-ups', 'pike-hold'], duration: '25 min', calories: 200 },
      { day: 7, title: 'Recovery', exercises: ['jumping-jacks', 'arm-circles', 'plank', 'superman-hold'], duration: '20 min', calories: 100 },
    ],
  },
  {
    id: 'hostel-student',
    name: 'Hostel Student Plan',
    description: 'Minimal space, zero equipment, maximum results. Designed for hostel rooms and small spaces.',
    goal: 'full-body',
    duration: '2 Weeks',
    days: 14,
    difficulty: 'beginner',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=600',
    schedule: [
      { day: 1, title: 'Room Workout A', exercises: ['push-ups', 'squats', 'plank', 'jumping-jacks'], duration: '20 min', calories: 160 },
      { day: 2, title: 'Room Workout B', exercises: ['chair-dips', 'lunges', 'bicycle-crunches', 'mountain-climbers'], duration: '20 min', calories: 180 },
      { day: 3, title: 'Rest Day', exercises: [], duration: '10 min', calories: 40 },
    ],
  },
  {
    id: 'skinny-muscle-gain',
    name: 'Skinny to Muscle',
    description: 'Progressive muscle building for skinny guys. Focus on compound movements and caloric surplus exercises.',
    goal: 'muscle-gain',
    duration: '8 Weeks',
    days: 56,
    difficulty: 'intermediate',
    image: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=600',
    schedule: [
      { day: 1, title: 'Push Day', exercises: ['push-ups', 'decline-push-ups', 'pike-push-ups', 'diamond-push-ups', 'chair-dips'], duration: '40 min', calories: 320 },
      { day: 2, title: 'Pull & Core', exercises: ['superman-hold', 'plank', 'bicycle-crunches', 'leg-raises'], duration: '30 min', calories: 180 },
      { day: 3, title: 'Leg Day', exercises: ['squats', 'lunges', 'jump-squats', 'wall-sit'], duration: '35 min', calories: 300 },
      { day: 4, title: 'Rest', exercises: [], duration: '10 min', calories: 40 },
    ],
  },
  {
    id: 'fat-loss-challenge',
    name: 'Fat Loss Challenge',
    description: 'High-intensity program designed for maximum calorie burn. HIIT-style workouts for rapid fat loss.',
    goal: 'fat-loss',
    duration: '4 Weeks',
    days: 28,
    difficulty: 'intermediate',
    image: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=600',
    schedule: [
      { day: 1, title: 'HIIT Burn A', exercises: ['burpees', 'mountain-climbers', 'jump-squats', 'high-knees'], duration: '30 min', calories: 380 },
      { day: 2, title: 'HIIT Burn B', exercises: ['jumping-jacks', 'burpees', 'push-ups', 'bicycle-crunches'], duration: '30 min', calories: 340 },
      { day: 3, title: 'Active Recovery', exercises: ['plank', 'superman-hold', 'arm-circles', 'wall-sit'], duration: '20 min', calories: 100 },
    ],
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return exerciseMap[id];
}

export function getExercisesByGoal(goal: WorkoutGoal): Exercise[] {
  const muscleMap: Record<WorkoutGoal, MuscleGroup[]> = {
    'muscle-gain': ['chest', 'arms', 'shoulders', 'back', 'legs'],
    'fat-loss': ['full-body', 'legs'],
    'full-body': ['full-body'],
    'abs-core': ['abs'],
    'chest': ['chest'],
    'arms': ['arms'],
    'shoulders': ['shoulders'],
    'legs': ['legs', 'back'],
    'beginner-transform': ['chest', 'arms', 'legs', 'abs', 'shoulders', 'back', 'full-body'],
  };
  const muscles = muscleMap[goal];
  return exercises.filter((e) => muscles.includes(e.targetMuscle));
}
