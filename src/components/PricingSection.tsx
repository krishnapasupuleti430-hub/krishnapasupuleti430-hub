import { useState } from 'react';
import { Check, Sparkles, Crown, Zap, Star, X, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

type BillingCycle = 'monthly' | 'yearly';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted: boolean;
  cta: string;
  popular?: boolean;
  color: string;
  icon: React.ElementType;
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Limited meal plans',
      'Basic workouts',
      'Demo dashboard',
      'Limited tracking',
      'Community access',
    ],
    highlighted: false,
    cta: 'Start Free',
    color: 'muted',
    icon: Zap,
  },
  {
    name: 'Student',
    description: 'For students and hostel users',
    monthlyPrice: 99,
    yearlyPrice: 1029,
    features: [
      'Budget meal plans',
      'Indian hostel food suggestions',
      'Home workouts',
      'Basic AI recommendations',
      'Progress tracking',
      'Hostel student mode',
    ],
    highlighted: false,
    cta: 'Upgrade Now',
    popular: false,
    color: 'cyan',
    icon: Sparkles,
  },
  {
    name: 'Advanced',
    description: 'For serious fitness goals',
    monthlyPrice: 159,
    yearlyPrice: 1599,
    features: [
      'Personalized meal system',
      'Advanced workout plans',
      'Better analytics',
      'More AI recommendations',
      'Priority features',
      'Custom diet goals',
      'Weekly AI reports',
    ],
    highlighted: true,
    cta: 'Get Advanced',
    popular: true,
    color: 'purple',
    icon: Star,
  },
  {
    name: 'Premium',
    description: 'The full Caesar AI experience',
    monthlyPrice: 199,
    yearlyPrice: 1899,
    features: [
      'Elite transformation dashboard',
      'Unlimited AI recommendations',
      'Advanced progress tracking',
      'Premium UI features',
      'Full experience access',
      'Priority support',
      'Exclusive features',
      'Early access updates',
    ],
    highlighted: false,
    cta: 'Get Premium',
    color: 'blue',
    icon: Crown,
  },
];

function PricingToggle({ value, onChange }: { value: BillingCycle; onChange: (v: BillingCycle) => void }) {
  return (
    <div className="relative inline-flex items-center glass-strong rounded-full p-1.5">
      <div
        className={`absolute h-[calc(100%-12px)] rounded-full transition-all duration-500 ease-out ${
          value === 'yearly'
            ? 'left-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan'
            : 'left-1.5 w-[calc(50%-6px)] bg-caesar-muted/20'
        }`}
        style={{ width: value === 'yearly' ? 'calc(50% - 6px)' : 'calc(50% - 6px)' }}
      />
      <button
        onClick={() => onChange('monthly')}
        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-space font-medium transition-colors duration-300 ${
          value === 'monthly' ? 'text-caesar-white' : 'text-caesar-muted'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-space font-medium transition-colors duration-300 flex items-center gap-2 ${
          value === 'yearly' ? 'text-caesar-white' : 'text-caesar-muted'
        }`}
      >
        Yearly
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-colors duration-300 ${
          value === 'yearly'
            ? 'bg-caesar-gold/30 text-caesar-gold'
            : 'bg-caesar-muted/20 text-caesar-muted'
        }`}>
          Save 15%
        </span>
      </button>
    </div>
  );
}

function PricingCard({ plan, billingCycle, onUpgrade }: {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  onUpgrade: (plan: PricingPlan) => void;
}) {
  const { ref, isInView } = useInView(0.1);
  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const monthlyEquivalent = plan.monthlyPrice > 0 && billingCycle === 'yearly'
    ? Math.round(plan.yearlyPrice / 12)
    : null;
  const savings = billingCycle === 'yearly' && plan.monthlyPrice > 0
    ? plan.monthlyPrice * 12 - plan.yearlyPrice
    : 0;

  const glowClasses = {
    muted: '',
    cyan: 'hover:glow-cyan',
    purple: 'hover:glow-purple',
    blue: 'hover:glow-blue',
  };

  const borderClasses = {
    muted: 'border-caesar-border/30',
    cyan: 'border-caesar-cyan/30',
    purple: 'border-caesar-purple/30',
    blue: 'border-caesar-blue/30',
  };

  const Icon = plan.icon;

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-full blur-lg opacity-80" />
            <span className="relative px-4 py-1.5 rounded-full text-[10px] font-space font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center gap-1.5">
              <Star className="w-3 h-3" /> Most Popular
            </span>
          </div>
        </div>
      )}

      {/* Featured glow */}
      {plan.popular && (
        <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue/20 via-caesar-purple/20 to-caesar-cyan/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
      )}

      {/* Card */}
      <div
        className={`relative glass-strong rounded-3xl p-6 lg:p-8 transition-all duration-500 ${
          plan.popular
            ? 'border-2 border-caesar-purple/50 bg-caesar-purple/5'
            : `border ${borderClasses[plan.color as keyof typeof borderClasses]} hover:border-opacity-60`
        } ${glowClasses[plan.color as keyof typeof glowClasses]} ${plan.popular ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
      >
        {/* Animated border for popular */}
        {plan.popular && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)',
                animation: 'spin 8s linear infinite',
              }}
            />
            <div className="absolute inset-[2px] rounded-3xl bg-caesar-dark" />
          </div>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular
                    ? 'bg-gradient-to-br from-caesar-blue via-caesar-purple to-caesar-cyan'
                    : plan.color === 'muted'
                    ? 'bg-caesar-muted/20'
                    : `bg-caesar-${plan.color}/20`
                }`}
              >
                <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : plan.color === 'muted' ? 'text-caesar-muted' : `text-caesar-${plan.color}`}`} />
              </div>
              <div>
                <h3 className="text-lg font-clash font-semibold text-caesar-white">{plan.name}</h3>
                <p className="text-xs text-caesar-muted font-space">{plan.description}</p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-clash font-bold text-caesar-white">
                {price === 0 ? 'Free' : `₹${price}`}
              </span>
              {price > 0 && (
                <span className="text-sm text-caesar-muted font-space">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              )}
            </div>
            {monthlyEquivalent && (
              <p className="text-xs text-caesar-cyan font-space mt-1">
                ₹{monthlyEquivalent}/month when billed yearly
              </p>
            )}
            {savings > 0 && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-caesar-cyan/10 border border-caesar-cyan/20">
                <span className="text-xs font-space font-medium text-caesar-cyan">
                  Save ₹{savings}/year
                </span>
              </div>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-caesar-blue to-caesar-purple'
                      : plan.color === 'muted'
                      ? 'bg-caesar-muted/20'
                      : `bg-caesar-${plan.color}/20`
                  }`}
                >
                  <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : plan.color === 'muted' ? 'text-caesar-muted' : `text-caesar-${plan.color}`}`} />
                </div>
                <span className="text-sm text-caesar-muted font-space">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => onUpgrade(plan)}
            className={`relative w-full group overflow-hidden px-6 py-3.5 rounded-xl text-sm font-space font-semibold transition-all duration-300 ${
              plan.popular
                ? 'text-white'
                : plan.color === 'muted'
                ? 'text-caesar-white bg-caesar-muted/20 hover:bg-caesar-muted/30 border border-caesar-border/50'
                : `text-white`
            }`}
          >
            {plan.popular ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan" />
                <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  {plan.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {plan.cta}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function UpgradeModal({ plan, billingCycle, onClose }: {
  plan: PricingPlan | null;
  billingCycle: BillingCycle;
  onClose: () => void;
}) {
  if (!plan) return null;

  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-caesar-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-strong rounded-3xl p-8 max-w-md w-full border border-caesar-border/50 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-caesar-border/30 transition-colors"
        >
          <X className="w-5 h-5 text-caesar-muted" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-clash font-semibold text-caesar-white mb-2">
            Upgrade to {plan.name}
          </h3>
          <p className="text-sm text-caesar-muted font-space">
            {plan.description}
          </p>
        </div>

        {/* Price summary */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-caesar-muted font-space">Plan</span>
            <span className="text-sm font-medium text-caesar-white font-space">{plan.name}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-caesar-muted font-space">Billing</span>
            <span className="text-sm font-medium text-caesar-white font-space capitalize">{billingCycle}</span>
          </div>
          <div className="border-t border-caesar-border/50 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-caesar-muted font-space">Total</span>
              <span className="text-2xl font-clash font-bold text-caesar-white">
                {price === 0 ? 'Free' : `₹${price}`}
              </span>
            </div>
          </div>
        </div>

        {/* Demo notice */}
        <div className="glass-blue rounded-xl p-4 mb-6 border border-caesar-blue/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-caesar-blue shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-space font-medium text-caesar-blue mb-1">Demo Mode</p>
              <p className="text-xs text-caesar-muted font-space">
                This is a frontend demo. Payment integration coming soon. Click below to see the animated checkout experience.
              </p>
            </div>
          </div>
        </div>

        {/* Demo payment button */}
        <button
          onClick={() => {
            alert(`🎉 Demo Checkout!\n\nPlan: ${plan.name}\nPrice: ₹${price}/${billingCycle}\n\nPayment integration coming soon!`);
          }}
          className="relative w-full group overflow-hidden px-6 py-4 rounded-xl text-sm font-space font-semibold text-white transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan" />
          <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Continue to Checkout
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <p className="text-center text-xs text-caesar-muted font-space mt-4">
          No payment required in demo mode
        </p>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="pricing" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-caesar-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-caesar-purple/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-caesar-cyan/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-caesar-purple" />
            <span className="text-xs font-space font-medium text-caesar-purple uppercase tracking-wider">Pricing Plans</span>
          </div>
          <h2 className="heading-xl mb-5">
            <span className="text-caesar-white">Choose Your</span>
            <br />
            <span className="text-gradient-premium">Transformation Plan</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space mb-10">
            From free trials to premium features, find the perfect plan for your fitness journey.
          </p>

          {/* Toggle */}
          <PricingToggle value={billingCycle} onChange={setBillingCycle} />
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
              onUpgrade={setSelectedPlan}
            />
          ))}
        </div>

        {/* Trust badges */}
        <div className={`mt-16 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-caesar-muted">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-caesar-cyan" />
              <span className="text-sm font-space">No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-caesar-cyan" />
              <span className="text-sm font-space">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-caesar-cyan" />
              <span className="text-sm font-space">Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-caesar-cyan" />
              <span className="text-sm font-space">Money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        plan={selectedPlan}
        billingCycle={billingCycle}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  );
}
