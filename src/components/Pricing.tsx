import { Link } from 'react-router-dom';
import { Check, Zap, Crown } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

const features = [
  'Unlimited AI meal generation',
  'Unlimited AI workout plans',
  'Full progress tracking',
  'Protein & calorie tracking',
  'Dashboard analytics',
  'Hostel student mode',
  'Indian foods database',
  'Global localization',
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="pricing" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-caesar-red/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Free Beta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">100%</span>
            <br />
            <span className="text-gradient-red">Free Forever</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            Caesar AI is completely free during our beta period. No credit card needed. No hidden fees.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div
            className={`glass-strong rounded-3xl p-8 lg:p-10 card-3d glow-gold transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-caesar-gold to-caesar-gold-light flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-caesar-black" />
              </div>
              <h3 className="text-xl font-bold text-caesar-white mb-2">Full Access</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-caesar-gold">Free</span>
              </div>
              <p className="text-xs text-caesar-muted mt-2">All features unlocked during beta</p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-caesar-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-caesar-gold" />
                  </div>
                  <span className="text-sm text-caesar-muted">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/signup"
              className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base"
            >
              <Zap className="w-5 h-5" />
              Get Started Free
            </Link>

            <p className="text-center text-xs text-caesar-muted mt-4">
              Subscription plans coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
