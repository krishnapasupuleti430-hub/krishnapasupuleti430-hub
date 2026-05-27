import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Zap } from 'lucide-react';
import { useInView, useCountUp } from '../hooks/useAnimations';

export default function CTA() {
  const { ref, isInView } = useInView(0.2);
  const users = useCountUp(50000, 2000, 0, isInView);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-caesar-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-caesar-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        <div
          ref={ref}
          className={`glass-strong rounded-3xl p-8 sm:p-12 lg:p-16 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)',
                animation: 'spin 20s linear infinite',
              }}
            />
            <div className="absolute inset-[1px] rounded-3xl bg-caesar-dark" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-caesar-blue" />
              <span className="text-xs font-space font-medium text-caesar-blue uppercase tracking-wider">Start Today - It's Free</span>
            </div>

            <h2 className="heading-xl mb-4">
              <span className="text-caesar-white">Your Transformation</span>
              <br />
              <span className="text-gradient-premium">Starts Right Now</span>
            </h2>

            <p className="text-body max-w-xl mx-auto mb-4 font-space">
              Join {isInView ? users.toLocaleString() : '50,000'}+ Indian students who are building muscle and losing fat on a student budget. No gym. No coach. No excuses.
            </p>

            {/* Trust points */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8">
              {[
                'Free forever plan',
                'No credit card needed',
                'Works on any budget',
                'No gym required',
              ].map((point) => (
                <div key={point} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-caesar-cyan" />
                  <span className="text-xs font-space text-caesar-muted">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link to="/signup" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-10 py-4 rounded-xl text-base font-space font-semibold text-white bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
                  Start Your Transformation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/workouts" className="relative group">
                <div className="absolute inset-0 bg-caesar-cyan/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-10 py-4 rounded-xl text-base font-space font-semibold border-2 border-caesar-cyan/50 text-caesar-cyan hover:bg-caesar-cyan/10 flex items-center justify-center gap-2 transition-colors">
                  Try Home Workouts
                </div>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-caesar-muted font-space">
              <Shield className="w-3.5 h-3.5" />
              <span>Your data is safe. Cancel anytime. No hidden fees.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
