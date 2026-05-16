import { useState } from 'react';
import { Check, Star, Crown, Zap, Shield } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

function PricingCard({ name, price, annual, save, features, popular, elite, delay }: {
  name: string;
  price: string;
  annual: string;
  save: string;
  features: string[];
  popular?: boolean;
  elite?: boolean;
  delay: number;
}) {
  const { ref, isInView } = useInView(0.1);
  const [annualToggle, setAnnualToggle] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative glass-strong rounded-2xl p-6 lg:p-8 transition-all duration-700 card-3d ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${popular ? 'glow-red scale-[1.02] lg:scale-105 border-caesar-red/30' : ''} ${elite ? 'glow-gold border-caesar-gold/30' : ''}`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-caesar-red to-caesar-red-glow text-[10px] font-bold text-white uppercase tracking-wider animate-glow-pulse">
          Most Popular
        </div>
      )}
      {elite && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-caesar-gold to-caesar-gold-light text-[10px] font-bold text-caesar-black uppercase tracking-wider">
          Elite
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {elite ? <Crown className="w-5 h-5 text-caesar-gold" /> : popular ? <Star className="w-5 h-5 text-caesar-red" /> : <Zap className="w-5 h-5 text-caesar-muted" />}
          <h3 className="text-lg font-bold text-caesar-white">{name}</h3>
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl lg:text-4xl font-black text-gradient-premium">
            {annualToggle ? annual : price}
          </span>
          <span className="text-sm text-caesar-muted">/{annualToggle ? 'year' : 'month'}</span>
        </div>

        {save && (
          <button
            onClick={() => setAnnualToggle(!annualToggle)}
            className="text-[10px] font-medium text-caesar-gold hover:text-caesar-gold-light transition-colors cursor-pointer"
          >
            {annualToggle ? `Switch to monthly` : `Annual: ${annual}/yr - Save ${save}`}
          </button>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${popular ? 'bg-caesar-red/20' : elite ? 'bg-caesar-gold/20' : 'bg-caesar-border'}`}>
              <Check className={`w-3 h-3 ${popular ? 'text-caesar-red' : elite ? 'text-caesar-gold' : 'text-caesar-muted'}`} />
            </div>
            <span className="text-sm text-caesar-muted">{feature}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
        popular
          ? 'btn-primary'
          : elite
          ? 'btn-gold'
          : 'glass hover:bg-white/10 text-caesar-white'
      }`}>
        {popular ? 'Start Free Trial' : elite ? 'Go Elite' : 'Get Started'}
      </button>

      {popular && (
        <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-caesar-muted">
          <Shield className="w-3 h-3" />
          7-day free trial. Cancel anytime.
        </div>
      )}
    </div>
  );
}

const plans = [
  {
    name: 'Free',
    price: 'Rs.0',
    annual: 'Rs.0',
    save: '',
    features: [
      'Basic calorie tracking',
      'Limited AI generations (3/day)',
      'Basic home workouts',
      'Community access',
    ],
  },
  {
    name: 'Student',
    price: 'Rs.99',
    annual: 'Rs.1,029',
    save: 'Rs.159',
    features: [
      'Full student mode',
      'Hostel meal plans',
      'Budget AI diets',
      'Protein tracking',
      'Home workouts',
      'Daily AI suggestions',
      'Basic transformation analytics',
    ],
    popular: true,
  },
  {
    name: 'Pro',
    price: 'Rs.159',
    annual: 'Rs.1,599',
    save: 'Rs.309',
    features: [
      'Everything in Student',
      'Advanced AI meal generation',
      'Personalized transformations',
      'Smart progress analytics',
      'Advanced workout plans',
      'AI body insights',
      'Premium dashboards',
    ],
  },
  {
    name: 'Elite',
    price: 'Rs.199',
    annual: 'Rs.1,899',
    save: 'Rs.489',
    features: [
      'Everything in Pro',
      'Elite AI coaching',
      'Full premium transformation system',
      'Unlimited AI requests',
      'Advanced body analytics',
      'Priority AI support',
      'Exclusive premium plans',
      'Future premium features',
    ],
    elite: true,
  },
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="pricing" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-caesar-red/2 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Premium Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Invest in Your</span>
            <br />
            <span className="text-gradient-red">Transformation</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto mb-2">
            Less than a cup of coffee per day. Your body deserves the best AI coaching available.
          </p>
          <p className="text-xs text-caesar-gold font-medium">
            Join 50,000+ users who already transformed their lives
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} delay={i * 100} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-caesar-gold" />
              <span className="text-sm font-bold text-caesar-white">30-Day Transformation Guarantee</span>
            </div>
            <p className="text-xs text-caesar-muted">
              If you don't see measurable progress within 30 days, we'll refund your subscription in full. No questions asked. Your transformation is our mission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
