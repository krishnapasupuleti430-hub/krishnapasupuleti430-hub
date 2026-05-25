import { Crown, Zap, Shield } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

export default function PricingPage() {
  const { ref, isInView } = useInView(0.1);

  return (
    <div className="min-h-screen bg-caesar-black pt-24 pb-16 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-caesar-red/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Free Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Caesar AI is</span>
            <br />
            <span className="text-gradient-red">100% Free</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto mb-6">
            All features are currently free during our beta period. Enjoy unlimited AI meal generation, workouts, and progress tracking at no cost.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="glass-strong rounded-2xl p-8 text-center glow-gold">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-caesar-gold to-caesar-gold-light flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-caesar-black" />
            </div>
            <h3 className="text-2xl font-bold text-caesar-white mb-2">Full Access</h3>
            <p className="text-4xl font-black text-caesar-gold mb-4">Free</p>
            <p className="text-sm text-caesar-muted mb-6">No payment required. No credit card needed.</p>

            <div className="space-y-3 text-left mb-6">
              {[
                'Unlimited AI meal generation',
                'Unlimited AI workout plans',
                'Full progress tracking',
                'Protein & calorie tracking',
                'Dashboard analytics',
                'Hostel student mode',
                'Indian foods database',
                'Global localization',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-caesar-gold/20 flex items-center justify-center shrink-0">
                    <Zap className="w-3 h-3 text-caesar-gold" />
                  </div>
                  <span className="text-sm text-caesar-muted">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-caesar-muted">
              Subscription plans coming soon. Enjoy all features free during beta.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-caesar-gold" />
              <span className="text-sm font-bold text-caesar-white">Beta Period</span>
            </div>
            <p className="text-xs text-caesar-muted">
              Caesar AI is currently in public beta. All features are free for early users. Subscription options will be introduced later for premium features and priority support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
