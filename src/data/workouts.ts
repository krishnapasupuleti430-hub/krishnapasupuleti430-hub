export type Difficulty = 'beginner' | 'intermediate';

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  difficulty: Difficulty;
  caloriesPerSet: number;
  sets: number;
  reps: string;
  duration: string;
  image: string;
  tip: string;
}

export interface WorkoutDay {
  day: number;
  title: string;
  subtitle: string;
  targetMuscles: string;
  duration: string;
  calories: number;
  difficulty: Difficulty;
  exercises: Exercise[];
  isRest?: boolean;
  image: string;
}

// ── Exercise library ──────────────────────────────────────────────────

const exerciseImages = {
  pushups: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
  squats: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
  planks: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
  lunges: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
  dips: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
  crunches: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
  jumpingjacks: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
  mountainclimbers: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
  burpees: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
  wallsit: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
  highknees: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
  legraises: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
  superman: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
  diamondpushups: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400',
  pikepushups: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
  armcircles: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
  jacks: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=400',
  stretch: 'https://images.pexels.com/photos/4056391/pexels-photo-4056391.jpeg?auto=compress&cs=tinysrgb&w=400',
};

// ── 7-Day Beginner Transformation Plan ───────────────────────────────

export const weekPlan: WorkoutDay[] = [
  {
    day: 1,
    title: 'Chest + Arms',
    subtitle: 'Build upper body strength',
    targetMuscles: 'Chest, Triceps, Shoulders',
    duration: '25 min',
    calories: 180,
    difficulty: 'beginner',
    image: exerciseImages.pushups,
    exercises: [
      { id: 'push-ups', name: 'Push-ups', targetMuscle: 'Chest', difficulty: 'beginner', caloriesPerSet: 8, sets: 4, reps: '12 reps', duration: '3 min', image: exerciseImages.pushups, tip: 'Keep your core tight. Go down slow, push up strong.' },
      { id: 'wide-push-ups', name: 'Wide Push-ups', targetMuscle: 'Outer Chest', difficulty: 'beginner', caloriesPerSet: 9, sets: 3, reps: '10 reps', duration: '3 min', image: exerciseImages.pushups, tip: 'Wider hands = more chest activation.' },
      { id: 'chair-dips', name: 'Chair Dips', targetMuscle: 'Triceps', difficulty: 'beginner', caloriesPerSet: 7, sets: 3, reps: '10 reps', duration: '3 min', image: exerciseImages.dips, tip: 'Use a chair or bed edge. Keep back close.' },
      { id: 'diamond-push-ups', name: 'Diamond Push-ups', targetMuscle: 'Inner Chest + Triceps', difficulty: 'beginner', caloriesPerSet: 8, sets: 3, reps: '8 reps', duration: '3 min', image: exerciseImages.diamondpushups, tip: 'Make a diamond shape with your hands.' },
      { id: 'arm-circles', name: 'Arm Circles', targetMuscle: 'Shoulders', difficulty: 'beginner', caloriesPerSet: 4, sets: 2, reps: '30 sec each way', duration: '2 min', image: exerciseImages.armcircles, tip: 'Small to big circles. Feel the burn.' },
    ],
  },
  {
    day: 2,
    title: 'Legs + Core',
    subtitle: 'Build lower body power',
    targetMuscles: 'Quads, Hamstrings, Glutes, Abs',
    duration: '25 min',
    calories: 200,
    difficulty: 'beginner',
    image: exerciseImages.squats,
    exercises: [
      { id: 'squats', name: 'Bodyweight Squats', targetMuscle: 'Quads + Glutes', difficulty: 'beginner', caloriesPerSet: 12, sets: 4, reps: '15 reps', duration: '4 min', image: exerciseImages.squats, tip: 'Go deep, drive through your heels.' },
      { id: 'lunges', name: 'Walking Lunges', targetMuscle: 'Legs + Balance', difficulty: 'beginner', caloriesPerSet: 10, sets: 3, reps: '10 each leg', duration: '4 min', image: exerciseImages.lunges, tip: 'Step forward, knee at 90 degrees.' },
      { id: 'wall-sit', name: 'Wall Sit', targetMuscle: 'Quads', difficulty: 'beginner', caloriesPerSet: 6, sets: 3, reps: '30 sec', duration: '3 min', image: exerciseImages.wallsit, tip: 'Thighs parallel to floor. Hold it!' },
      { id: 'plank', name: 'Plank Hold', targetMuscle: 'Core', difficulty: 'beginner', caloriesPerSet: 5, sets: 3, reps: '30 sec', duration: '3 min', image: exerciseImages.planks, tip: 'Straight line from head to heels.' },
      { id: 'crunches', name: 'Crunches', targetMuscle: 'Upper Abs', difficulty: 'beginner', caloriesPerSet: 6, sets: 3, reps: '15 reps', duration: '3 min', image: exerciseImages.crunches, tip: 'Lift shoulders slightly, don\'t pull neck.' },
    ],
  },
  {
    day: 3,
    title: 'Full Body',
    subtitle: 'Total body conditioning',
    targetMuscles: 'Chest, Legs, Core, Shoulders',
    duration: '30 min',
    calories: 250,
    difficulty: 'beginner',
    image: exerciseImages.mountainclimbers,
    exercises: [
      { id: 'push-ups-fb', name: 'Push-ups', targetMuscle: 'Chest', difficulty: 'beginner', caloriesPerSet: 8, sets: 3, reps: '12 reps', duration: '3 min', image: exerciseImages.pushups, tip: 'Foundation move. Keep form strict.' },
      { id: 'squats-fb', name: 'Squats', targetMuscle: 'Legs', difficulty: 'beginner', caloriesPerSet: 12, sets: 3, reps: '15 reps', duration: '3 min', image: exerciseImages.squats, tip: 'Full range of motion every rep.' },
      { id: 'mountain-climbers', name: 'Mountain Climbers', targetMuscle: 'Full Body + Core', difficulty: 'beginner', caloriesPerSet: 12, sets: 3, reps: '15 each leg', duration: '4 min', image: exerciseImages.mountainclimbers, tip: 'Drive knees to chest. Stay fast.' },
      { id: 'plank-fb', name: 'Plank Hold', targetMuscle: 'Core', difficulty: 'beginner', caloriesPerSet: 5, sets: 2, reps: '40 sec', duration: '2 min', image: exerciseImages.planks, tip: 'Breathe steady. Don\'t sag your hips.' },
      { id: 'superman', name: 'Superman Hold', targetMuscle: 'Back + Glutes', difficulty: 'beginner', caloriesPerSet: 4, sets: 3, reps: '20 sec', duration: '3 min', image: exerciseImages.superman, tip: 'Lift arms and legs together. Squeeze.' },
      { id: 'jumping-jacks-fb', name: 'Jumping Jacks', targetMuscle: 'Full Body', difficulty: 'beginner', caloriesPerSet: 8, sets: 2, reps: '25 reps', duration: '2 min', image: exerciseImages.jumpingjacks, tip: 'Get your heart rate up!' },
    ],
  },
  {
    day: 4,
    title: 'Rest + Light Cardio',
    subtitle: 'Recovery and mobility',
    targetMuscles: 'Recovery',
    duration: '15 min',
    calories: 80,
    difficulty: 'beginner',
    image: exerciseImages.stretch,
    isRest: true,
    exercises: [
      { id: 'stretch-1', name: 'Jumping Jacks', targetMuscle: 'Full Body', difficulty: 'beginner', caloriesPerSet: 6, sets: 2, reps: '20 reps', duration: '2 min', image: exerciseImages.jacks, tip: 'Light warm-up to keep blood flowing.' },
      { id: 'stretch-2', name: 'Arm Circles', targetMuscle: 'Shoulders', difficulty: 'beginner', caloriesPerSet: 3, sets: 2, reps: '20 sec each way', duration: '2 min', image: exerciseImages.armcircles, tip: 'Loosen up shoulder joints.' },
      { id: 'stretch-3', name: 'Wall Sit', targetMuscle: 'Quads', difficulty: 'beginner', caloriesPerSet: 4, sets: 2, reps: '20 sec', duration: '2 min', image: exerciseImages.wallsit, tip: 'Easy hold, not max effort today.' },
      { id: 'stretch-4', name: 'Plank', targetMuscle: 'Core', difficulty: 'beginner', caloriesPerSet: 4, sets: 2, reps: '20 sec', duration: '2 min', image: exerciseImages.planks, tip: 'Short hold just to stay active.' },
    ],
  },
  {
    day: 5,
    title: 'Shoulders + Abs',
    subtitle: 'Build definition and strength',
    targetMuscles: 'Shoulders, Deltoids, Abs, Obliques',
    duration: '25 min',
    calories: 170,
    difficulty: 'beginner',
    image: exerciseImages.pikepushups,
    exercises: [
      { id: 'pike-push-ups', name: 'Pike Push-ups', targetMuscle: 'Shoulders', difficulty: 'beginner', caloriesPerSet: 9, sets: 3, reps: '8 reps', duration: '3 min', image: exerciseImages.pikepushups, tip: 'Hips high, push your body up.' },
      { id: 'arm-circles-s', name: 'Arm Circles', targetMuscle: 'Shoulders', difficulty: 'beginner', caloriesPerSet: 4, sets: 3, reps: '30 sec each way', duration: '3 min', image: exerciseImages.armcircles, tip: 'Small fast circles, then big slow ones.' },
      { id: 'plank-s', name: 'Plank Hold', targetMuscle: 'Core', difficulty: 'beginner', caloriesPerSet: 5, sets: 3, reps: '35 sec', duration: '3 min', image: exerciseImages.planks, tip: 'Engage everything. Stay rigid.' },
      { id: 'crunches-s', name: 'Crunches', targetMuscle: 'Upper Abs', difficulty: 'beginner', caloriesPerSet: 6, sets: 3, reps: '15 reps', duration: '3 min', image: exerciseImages.crunches, tip: 'Controlled movement. No rushing.' },
      { id: 'leg-raises', name: 'Lying Leg Raises', targetMuscle: 'Lower Abs', difficulty: 'beginner', caloriesPerSet: 6, sets: 3, reps: '12 reps', duration: '3 min', image: exerciseImages.legraises, tip: 'Press lower back into the floor.' },
    ],
  },
  {
    day: 6,
    title: 'Fat Burn',
    subtitle: 'High calorie burn day',
    targetMuscles: 'Full Body, Cardio',
    duration: '30 min',
    calories: 300,
    difficulty: 'beginner',
    image: exerciseImages.burpees,
    exercises: [
      { id: 'jumping-jacks-fat', name: 'Jumping Jacks', targetMuscle: 'Full Body', difficulty: 'beginner', caloriesPerSet: 8, sets: 3, reps: '30 reps', duration: '3 min', image: exerciseImages.jumpingjacks, tip: 'Get that heart rate up!' },
      { id: 'mountain-climbers-fat', name: 'Mountain Climbers', targetMuscle: 'Core + Cardio', difficulty: 'beginner', caloriesPerSet: 12, sets: 3, reps: '20 each leg', duration: '4 min', image: exerciseImages.mountainclimbers, tip: 'Fast pace. Burn those calories.' },
      { id: 'burpees', name: 'Burpees', targetMuscle: 'Full Body', difficulty: 'beginner', caloriesPerSet: 15, sets: 3, reps: '8 reps', duration: '5 min', image: exerciseImages.burpees, tip: 'Best calorie burner. Push through!' },
      { id: 'high-knees', name: 'High Knees', targetMuscle: 'Legs + Cardio', difficulty: 'beginner', caloriesPerSet: 10, sets: 3, reps: '25 sec', duration: '3 min', image: exerciseImages.highknees, tip: 'Drive those knees up high.' },
      { id: 'squats-fat', name: 'Jump Squats', targetMuscle: 'Legs', difficulty: 'beginner', caloriesPerSet: 13, sets: 3, reps: '10 reps', duration: '4 min', image: exerciseImages.squats, tip: 'Explode up from the bottom.' },
    ],
  },
  {
    day: 7,
    title: 'Recovery',
    subtitle: 'Stretch and prepare for next week',
    targetMuscles: 'Recovery, Mobility',
    duration: '15 min',
    calories: 60,
    difficulty: 'beginner',
    image: exerciseImages.stretch,
    isRest: true,
    exercises: [
      { id: 'rec-1', name: 'Jumping Jacks', targetMuscle: 'Full Body', difficulty: 'beginner', caloriesPerSet: 5, sets: 2, reps: '15 reps', duration: '2 min', image: exerciseImages.jacks, tip: 'Very light. Just get moving.' },
      { id: 'rec-2', name: 'Arm Circles', targetMuscle: 'Shoulders', difficulty: 'beginner', caloriesPerSet: 2, sets: 2, reps: '15 sec each way', duration: '2 min', image: exerciseImages.armcircles, tip: 'Gentle shoulder mobility.' },
      { id: 'rec-3', name: 'Superman Hold', targetMuscle: 'Back', difficulty: 'beginner', caloriesPerSet: 3, sets: 2, reps: '15 sec', duration: '2 min', image: exerciseImages.superman, tip: 'Easy activation for your back.' },
      { id: 'rec-4', name: 'Plank', targetMuscle: 'Core', difficulty: 'beginner', caloriesPerSet: 3, sets: 2, reps: '15 sec', duration: '2 min', image: exerciseImages.planks, tip: 'Just a quick hold. Rest is priority.' },
    ],
  },
];

// Keep for backward compatibility with program modal imports
export const workoutPrograms: any[] = [];
export function getExerciseById(_id: string): Exercise | undefined { return undefined; }
export function getExercisesByGoal(_goal: string): Exercise[] { return []; }
export const categoryLabels: Record<string, string> = {};
export type WorkoutGoal = string;
