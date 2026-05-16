import { Globe, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

const countries = [
  { flag: '🇮🇳', name: 'India', meals: 'Dal, Roti, Paneer, Rice, Dosa, Idli, Poha, Curd' },
  { flag: '🇺🇸', name: 'USA', meals: 'Chicken, Eggs, Oats, Salad, Steak, Sandwich' },
  { flag: '🇬🇧', name: 'UK', meals: 'Chicken, Fish, Oats, Beans, Toast, Salad' },
  { flag: '🇦🇪', name: 'UAE', meals: 'Grilled Chicken, Hummus, Rice, Kebab, Fattoush' },
  { flag: '🇨🇦', name: 'Canada', meals: 'Salmon, Eggs, Oats, Chicken, Steak, Salad' },
  { flag: '🇦🇺', name: 'Australia', meals: 'Chicken, Eggs, Oats, Beef, Salad, Fish' },
  { flag: '🇩🇪', name: 'Germany', meals: 'Chicken, Bread, Eggs, Oats, Salad, Fish' },
  { flag: '🇯🇵', name: 'Japan', meals: 'Rice, Fish, Tofu, Eggs, Miso, Noodles' },
];

export default function CountrySelector() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-caesar-gold/3 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Global Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Adapts to Your</span>
            <br />
            <span className="text-gradient-gold">Country & Cuisine</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            Select your country during signup. Caesar adapts meals, workouts, and budgets to your local foods and lifestyle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {countries.map((country, i) => (
            <div
              key={country.name}
              className={`glass-strong rounded-2xl p-5 card-3d group transition-all duration-700 cursor-pointer hover:glow-gold ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <p className="text-sm font-bold text-caesar-white">{country.name}</p>
                  <p className="text-[10px] text-caesar-gold">Local meals available</p>
                </div>
              </div>
              <p className="text-[10px] text-caesar-muted leading-relaxed mb-3">{country.meals}</p>
              <div className="flex items-center gap-1 text-[10px] text-caesar-gold opacity-0 group-hover:opacity-100 transition-opacity">
                Select country <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-caesar-muted">
            + 50 more countries supported. Caesar AI adapts to your local cuisine, budget, and lifestyle.
          </p>
        </div>
      </div>
    </section>
  );
}
