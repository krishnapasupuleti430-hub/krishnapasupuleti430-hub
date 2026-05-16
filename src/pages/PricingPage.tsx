import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Check, Star, Crown, Zap, Shield, Loader2 } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

const plans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    save: '',
    features: ['Basic calorie tracking', '3 AI generations/day', 'Basic home workouts', 'Community access'],
    popular: false,
    elite: false,
  },
  {
    name: 'Student',
    monthlyPrice: 99,
    yearlyPrice: 1029,
    save: '159',
    features: ['Full student mode', 'Hostel meal plans', 'Budget AI diets', 'Protein tracking', 'Home workouts', 'Daily AI suggestions', 'Basic analytics'],
    popular: true,
    elite: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 159,
    yearlyPrice: 1599,
    save: '309',
    features: ['Everything in Student', 'Advanced AI meal generation', 'Personalized transformations', 'Smart progress analytics', 'Advanced workout plans', 'AI body insights', 'Premium dashboards'],
    popular: false,
    elite: false,
  },
  {
    name: 'Elite',
    monthlyPrice: 199,
    yearlyPrice: 1899,
    save: '489',
    features: ['Everything in Pro', 'Elite AI coaching', 'Full premium transformation', 'Unlimited AI requests', 'Advanced body analytics', 'Priority AI support', 'Exclusive premium plans', 'Future premium features'],
    popular: false,
    elite: true,
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const { ref, isInView } = useInView(0.1);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    if (planName === 'Free') return;
    if (!user) {
      window.location.href = '/signup';
      return;
    }

    setLoadingPlan(planName);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
          billing,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-caesar-black pt-24 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-caesar-red/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Premium Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Invest in Your</span>
            <br />
            <span className="text-gradient-red">Transformation</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto mb-6">
            Less than a cup of coffee per day. Your body deserves the best AI coaching.
          </p>

          <div className="inline-flex items-center glass rounded-xl p-1">
            <button onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${billing === 'monthly' ? 'bg-caesar-red text-white' : 'text-caesar-muted hover:text-caesar-white'}`}>
              Monthly
            </button>
            <button onClick={() => setBilling('yearly')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${billing === 'yearly' ? 'bg-caesar-gold text-caesar-black' : 'text-caesar-muted hover:text-caesar-white'}`}>
              Yearly <span className="text-[10px] ml-1 opacity-70">Save more</span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {plans.map((plan) => {
            const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const isLoading = loadingPlan === plan.name.toLowerCase();

            return (
              <div key={plan.name}
                className={`relative glass-strong rounded-2xl p-6 lg:p-8 card-3d transition-all ${
                  plan.popular ? 'glow-red scale-[1.02] lg:scale-105 border-caesar-red/30' : ''
                } ${plan.elite ? 'glow-gold border-caesar-gold/30' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-caesar-red to-caesar-red-glow text-[10px] font-bold text-white uppercase tracking-wider animate-glow-pulse">
                    Most Popular
                  </div>
                )}
                {plan.elite && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-caesar-gold to-caesar-gold-light text-[10px] font-bold text-caesar-black uppercase tracking-wider">
                    Elite
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.elite ? <Crown className="w-5 h-5 text-caesar-gold" /> : plan.popular ? <Star className="w-5 h-5 text-caesar-red" /> : <Zap className="w-5 h-5 text-caesar-muted" />}
                    <h3 className="text-lg font-bold text-caesar-white">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl lg:text-4xl font-black text-gradient-premium">
                      {price === 0 ? 'Free' : `Rs.${price}`}
                    </span>
                    {price > 0 && <span className="text-sm text-caesar-muted">/{billing === 'monthly' ? 'mo' : 'yr'}</span>}
                  </div>
                  {plan.save && billing === 'yearly' && (
                    <p className="text-[10px] font-medium text-caesar-gold">Save Rs.{plan.save}/year</p>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-caesar-red/20' : plan.elite ? 'bg-caesar-gold/20' : 'bg-caesar-border'}`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-caesar-red' : plan.elite ? 'text-caesar-gold' : 'text-caesar-muted'}`} />
                      </div>
                      <span className="text-sm text-caesar-muted">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 ${
                    plan.popular ? 'btn-primary' : plan.elite ? 'btn-gold' : 'glass hover:bg-white/10 text-caesar-white'
                  }`}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : plan.monthlyPrice === 0 ? 'Get Started' : plan.popular ? 'Start Free Trial' : plan.elite ? 'Go Elite' : 'Subscribe'}
                </button>

                {plan.popular && (
                  <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-caesar-muted">
                    <Shield className="w-3 h-3" /> 7-day free trial. Cancel anytime.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-caesar-gold" />
              <span className="text-sm font-bold text-caesar-white">30-Day Transformation Guarantee</span>
            </div>
            <p className="text-xs text-caesar-muted">
              If you don't see measurable progress within 30 days, we'll refund your subscription in full. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
