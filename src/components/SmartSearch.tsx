import { useState } from 'react';
import { Search, Sparkles, Flame, Dumbbell, Clock } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

export default function SmartSearch() {
  const { ref, isInView } = useInView(0.1);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (query.trim()) setShowResults(true);
  };

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-caesar-gold/3 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Search className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Smart Search</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Tell Caesar What</span>
            <br />
            <span className="text-gradient-gold">You Have</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            Type your available ingredients and watch AI generate complete meal plans with calories, protein, and timing.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-strong rounded-2xl p-6 glow-gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-caesar-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-caesar-gold" />
              </div>
              <div>
                <p className="text-sm font-bold text-caesar-white">AI Smart Search</p>
                <p className="text-[10px] text-caesar-muted">Powered by Caesar AI Engine</p>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowResults(false); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="I have eggs, oats, and milk..."
                  className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-11 pr-4 py-3.5 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-gold/50 transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                className="btn-gold px-6 py-3.5 text-sm"
              >
                Generate
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['eggs + rice', 'paneer + roti', 'oats + banana', 'chicken + dal'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setQuery(suggestion); setShowResults(true); }}
                  className="px-3 py-1.5 rounded-lg glass text-xs text-caesar-muted hover:text-caesar-gold hover:border-caesar-gold/30 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {showResults && (
              <div className="space-y-3 animate-slide-up">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-caesar-gold animate-pulse" />
                  <span className="text-[10px] text-caesar-gold font-medium uppercase tracking-wider">AI Results for "{query}"</span>
                </div>

                {[
                  { name: 'High Protein Meal', cal: 520, protein: 38, time: '20 min', type: 'Muscle Gain' },
                  { name: 'Budget Balanced Meal', cal: 380, protein: 24, time: '15 min', type: 'Budget' },
                  { name: 'Quick Energy Bowl', cal: 320, protein: 18, time: '10 min', type: 'Quick' },
                ].map((meal, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex items-center justify-between group hover:glow-gold transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-caesar-gold/10 flex items-center justify-center">
                        <Flame className="w-5 h-5 text-caesar-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-caesar-white">{meal.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] text-caesar-muted">
                            <Clock className="w-3 h-3" /> {meal.time}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-caesar-muted">
                            <Dumbbell className="w-3 h-3" /> {meal.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-caesar-gold">{meal.cal} cal</p>
                      <p className="text-[10px] text-caesar-muted">{meal.protein}g protein</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
