import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useInView, useCountUp } from '../hooks/useAnimations';

export default function CTA() {
  const { ref, isInView } = useInView(0.2);
  const users = useCountUp(50000, 2000, 0, isInView);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-caesar-red/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-premium mx-auto">
        <div
          ref={ref}
          className={`glass-strong rounded-3xl p-8 sm:p-12 lg:p-16 text-center glow-red-strong transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-caesar-red" />
            <span className="text-xs font-medium text-caesar-red uppercase tracking-wider">Start Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Your Transformation</span>
            <br />
            <span className="text-gradient-red">Begins Now</span>
          </h2>

          <p className="text-caesar-muted max-w-xl mx-auto mb-8">
            Join {isInView ? users.toLocaleString() : '50,000'}+ users who are building muscle, eating smarter, and transforming faster with Caesar AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 text-base px-10 py-4">
              Start Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/meal-generator" className="btn-gold flex items-center justify-center gap-2 text-base px-10 py-4">
              <Sparkles className="w-4 h-4" />
              Generate My AI Diet
            </Link>
          </div>

          <p className="text-xs text-caesar-muted">
            No credit card required. Free forever plan available.
          </p>
        </div>
      </div>
    </section>
  );
}
