import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Flame, Droplets, Utensils, Save, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  instructions: string;
  ingredients: string[];
  meal_type: string;
}

const DEMO_MEALS: Meal[] = [
  {
    name: 'Protein-Packed Egg Bhurji',
    calories: 320,
    protein: 22,
    carbs: 8,
    fat: 24,
    meal_type: 'breakfast',
    ingredients: ['3 eggs', '1 onion', '1 tomato', 'green chilies', 'turmeric', 'salt'],
    instructions: 'Beat eggs with salt and turmeric. Sauté onions and tomatoes until soft. Add beaten eggs and scramble until cooked. Serve with whole wheat toast.',
  },
  {
    name: 'Budget-Friendly Dal Rice Bowl',
    calories: 450,
    protein: 18,
    carbs: 65,
    fat: 8,
    meal_type: 'lunch',
    ingredients: ['1 cup toor dal', '1 cup rice', 'onion', 'tomatoes', 'garlic', 'cumin', 'turmeric'],
    instructions: 'Cook dal with turmeric until soft. Temper with cumin, garlic, and onions. Serve over steamed rice with a side of pickle or curd.',
  },
  {
    name: 'Quick Paneer Tikka Wrap',
    calories: 380,
    protein: 24,
    carbs: 32,
    fat: 18,
    meal_type: 'dinner',
    ingredients: ['200g paneer', 'whole wheat roti', 'onion', 'capsicum', 'yogurt marinade', 'spices'],
    instructions: 'Marinate paneer cubes in yogurt and spices. Pan-fry until golden. Sauté onions and capsicum. Wrap in roti with mint chutney.',
  },
  {
    name: 'Overnight Oats with Banana',
    calories: 350,
    protein: 12,
    carbs: 55,
    fat: 8,
    meal_type: 'breakfast',
    ingredients: ['1/2 cup oats', '1 banana', '1 cup milk', '1 tbsp honey', 'chia seeds'],
    instructions: 'Mix oats with milk and chia seeds. Let sit overnight in fridge. Top with sliced banana and honey before serving.',
  },
];

export default function MealGeneratorPage() {
  const { user } = useAuth();
  const [goal, setGoal] = useState('muscle_gain');
  const [budget, setBudget] = useState('medium');
  const [isHostel, setIsHostel] = useState(false);
  const [mealType, setMealType] = useState('all');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateMeals = () => {
    setLoading(true);
    setSaved(false);

    // Simulate loading delay for demo
    setTimeout(() => {
      const filteredMeals = mealType === 'all'
        ? DEMO_MEALS
        : DEMO_MEALS.filter((m) => m.meal_type === mealType);
      setMeals(filteredMeals.length > 0 ? filteredMeals : DEMO_MEALS);
      setLoading(false);
    }, 800);
  };

  const saveMeals = async () => {
    if (!user || meals.length === 0) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);

  return (
    <div className="min-h-screen bg-caesar-black pt-24 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-caesar-white mb-2">AI Meal Generator</h1>
          <p className="text-sm text-caesar-muted">Tell Caesar your preferences. Get perfect meal plans instantly.</p>
          <p className="text-xs text-caesar-gold mt-2">Demo Mode - Showing sample meals</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 mb-6">
          <h2 className="text-base font-bold text-caesar-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-caesar-gold" /> Preferences
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors"
              >
                <option value="muscle_gain">Build Muscle</option>
                <option value="fat_loss">Lose Fat</option>
                <option value="maintain">Maintain Weight</option>
                <option value="general">General Health</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Budget Level</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors"
              >
                <option value="low">Budget (Rs.100/day)</option>
                <option value="medium">Standard (Rs.200/day)</option>
                <option value="high">Premium (Rs.300/day)</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors"
              >
                <option value="all">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snacks</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={isHostel}
                  onChange={(e) => setIsHostel(e.target.checked)}
                  className="w-4 h-4 rounded border-caesar-border bg-caesar-dark accent-caesar-red"
                />
                <span className="text-xs text-caesar-muted">Hostel/Student Mode</span>
              </label>
            </div>
          </div>

          <button
            onClick={generateMeals}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Meals
              </>
            )}
          </button>
        </div>

        {meals.length > 0 && (
          <>
            <div className="glass-strong rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-caesar-white flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Your Meal Plan
                </h2>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-caesar-red">
                    <Flame className="w-4 h-4" /> {totalCalories} kcal
                  </div>
                  <div className="flex items-center gap-1 text-caesar-gold">
                    <Droplets className="w-4 h-4" /> {totalProtein}g protein
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {meals.map((meal, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-caesar-gold font-medium">{meal.meal_type}</span>
                        <h3 className="text-sm font-bold text-caesar-white">{meal.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-caesar-red">{meal.calories} kcal</p>
                        <p className="text-[10px] text-caesar-muted">{meal.protein}g protein</p>
                      </div>
                    </div>
                    <p className="text-xs text-caesar-muted mb-2">{meal.instructions}</p>
                    <div className="flex flex-wrap gap-1">
                      {meal.ingredients.slice(0, 4).map((ing, j) => (
                        <span key={j} className="text-[10px] px-2 py-1 bg-caesar-dark rounded-full text-caesar-muted">{ing}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-caesar-border">
                <button
                  onClick={saveMeals}
                  disabled={saved}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-green-500/20 text-green-400' : 'btn-gold'}`}
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4" /> Saved to Dashboard
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Meals
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="glass rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-caesar-gold shrink-0" />
              <p className="text-xs text-caesar-muted">Demo mode: These are sample meals. AI-powered generation coming soon.</p>
            </div>
          </>
        )}

        <div className="mt-6 text-center">
          <Link to="/dashboard" className="text-xs text-caesar-muted hover:text-caesar-red transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
