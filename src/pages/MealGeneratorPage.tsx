import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import { Sparkles, Clock, Utensils, Save, AlertCircle, Loader2 } from 'lucide-react';

interface Meal {
  name: string;
  type: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string;
  budget_cost: number;
}

const indianFoods = ['Rice', 'Dal', 'Roti', 'Paneer', 'Eggs', 'Chicken', 'Curd', 'Oats', 'Milk', 'Banana', 'Potato', 'Onion', 'Tomato', 'Poha', 'Idli', 'Dosa', 'Peanut Butter', 'Bread'];

export default function MealGeneratorPage() {
  const { user, profile } = useAuth();
  const {} = useSubscription();
  const [ingredients, setIngredients] = useState('');
  const [goal, setGoal] = useState(profile?.fitness_goal || 'muscle_gain');
  const [budget, setBudget] = useState(profile?.budget_level || '200');
  const [isHostel, setIsHostel] = useState(profile?.is_hostel_mode || false);
  const [mealType, setMealType] = useState('full_day');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const goals = [
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'fat_loss', label: 'Fat Loss' },
    { value: 'weight_gain', label: 'Weight Gain' },
    { value: 'maintenance', label: 'Maintenance' },
  ];

  const generateMeals = async () => {
    setLoading(true);
    setError('');
    setMeals([]);
    setSaved(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          ingredients,
          goal,
          budget,
          country: profile?.country || 'India',
          isHostel,
          mealType,
        }),
      });

      const data = await response.json();
      if (data.error) { setError(data.error); return; }
      setMeals(data.meals || []);
    } catch {
      setError('Failed to generate meals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveMeals = async () => {
    if (!user || meals.length === 0) return;
    const inserts = meals.map((m) => ({
      user_id: user.id,
      name: m.name,
      description: m.instructions,
      calories: m.calories,
      protein_g: m.protein,
      carbs_g: m.carbs,
      fats_g: m.fats,
      meal_type: m.type,
      budget_cost: m.budget_cost,
      is_hostel_friendly: isHostel,
      country: profile?.country || 'India',
      ingredients: m.ingredients,
    }));

    try {
      const { error: err } = await supabase.from('meals').insert(inserts);
      if (err) { setError(err.message); return; }
      setSaved(true);
    } catch { setError('Failed to save meals'); }
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);

  return (
    <div className="min-h-screen bg-caesar-black pt-24 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-caesar-red" />
            <span className="text-xs font-medium text-caesar-red uppercase tracking-wider">AI Meal Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-caesar-white mb-2">Generate Your AI Diet Plan</h1>
          <p className="text-sm text-caesar-muted">Tell Caesar what you have. AI creates the perfect meal plan.</p>
          <p className="text-xs text-caesar-gold mt-2">Unlimited AI generations during beta</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-sm font-bold text-caesar-white mb-4">Your Ingredients</h3>
              <textarea
                value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors resize-none"
                rows={3}
                placeholder="e.g., eggs, oats, milk, rice, dal, paneer..."
              />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {indianFoods.slice(0, 10).map((food) => (
                  <button key={food} onClick={() => setIngredients(prev => prev ? `${prev}, ${food.toLowerCase()}` : food.toLowerCase())}
                    className="px-2.5 py-1 rounded-lg glass text-[10px] text-caesar-muted hover:text-caesar-gold hover:border-caesar-gold/30 transition-all">
                    {food}
                  </button>
                ))}
              </div>
            </div>

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
                <label className="text-xs text-caesar-muted font-medium mb-2 block">Daily Budget (INR)</label>
                <div className="grid grid-cols-3 gap-2">
                  {['100', '200', '300'].map((b) => (
                    <button key={b} onClick={() => setBudget(b)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all ${budget === b ? 'glass-gold text-caesar-gold border border-caesar-gold/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                      Rs.{b}/day
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-caesar-muted font-medium mb-2 block">Meal Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'full_day', label: 'Full Day' },
                    { value: 'breakfast', label: 'Breakfast' },
                    { value: 'lunch', label: 'Lunch' },
                    { value: 'dinner', label: 'Dinner' },
                  ].map((m) => (
                    <button key={m.value} onClick={() => setMealType(m.value)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all ${mealType === m.value ? 'glass-red text-caesar-red border border-caesar-red/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isHostel} onChange={(e) => setIsHostel(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-caesar-border bg-caesar-dark accent-caesar-red" />
                <span className="text-xs text-caesar-muted">Hostel Mode (no-cook meals)</span>
              </label>

              <button onClick={generateMeals} disabled={loading || !ingredients.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate AI Meals</>}
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
                <div className="w-12 h-12 rounded-full border-2 border-caesar-red border-t-transparent animate-spin mx-auto mb-4" />
                <p className="text-sm text-caesar-muted">Caesar AI is crafting your perfect meal plan...</p>
              </div>
            )}

            {!loading && meals.length > 0 && (
              <div className="space-y-4">
                <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-lg font-black text-caesar-gold">{totalCalories}</p>
                      <p className="text-[10px] text-caesar-muted">Total Cal</p>
                    </div>
                    <div className="w-px h-8 bg-caesar-border" />
                    <div className="text-center">
                      <p className="text-lg font-black text-caesar-red">{totalProtein}g</p>
                      <p className="text-[10px] text-caesar-muted">Total Protein</p>
                    </div>
                  </div>
                  <button onClick={saveMeals} disabled={saved}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${saved ? 'bg-green-500/20 text-green-400' : 'glass-gold text-caesar-gold hover:glow-gold'}`}>
                    <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save to Dashboard'}
                  </button>
                </div>

                {meals.map((meal, i) => (
                  <div key={i} className="glass-strong rounded-2xl p-5 card-3d group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-caesar-red/20 text-caesar-red font-medium uppercase">{meal.type}</span>
                          <span className="flex items-center gap-1 text-[10px] text-caesar-muted"><Clock className="w-3 h-3" />{meal.time}</span>
                        </div>
                        <h3 className="text-base font-bold text-caesar-white">{meal.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-caesar-gold">{meal.calories} cal</p>
                        {meal.budget_cost > 0 && <p className="text-[10px] text-caesar-muted">Rs.{meal.budget_cost}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="glass rounded-lg p-2 text-center">
                        <p className="text-sm font-bold text-caesar-red">{meal.protein}g</p>
                        <p className="text-[10px] text-caesar-muted">Protein</p>
                      </div>
                      <div className="glass rounded-lg p-2 text-center">
                        <p className="text-sm font-bold text-caesar-gold">{meal.carbs}g</p>
                        <p className="text-[10px] text-caesar-muted">Carbs</p>
                      </div>
                      <div className="glass rounded-lg p-2 text-center">
                        <p className="text-sm font-bold text-blue-400">{meal.fats}g</p>
                        <p className="text-[10px] text-caesar-muted">Fats</p>
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-[10px] text-caesar-muted font-medium mb-1">Ingredients</p>
                      <div className="flex flex-wrap gap-1">
                        {meal.ingredients?.map((ing, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-md glass text-[10px] text-caesar-muted">{ing}</span>
                        ))}
                      </div>
                    </div>

                    {meal.instructions && (
                      <p className="text-[10px] text-caesar-muted leading-relaxed mt-2">{meal.instructions}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!loading && meals.length === 0 && !error && (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <Utensils className="w-12 h-12 text-caesar-border mx-auto mb-4" />
                <p className="text-sm text-caesar-muted">Enter your available ingredients and click Generate</p>
                <p className="text-xs text-caesar-muted mt-1">AI will create a personalized meal plan instantly</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
