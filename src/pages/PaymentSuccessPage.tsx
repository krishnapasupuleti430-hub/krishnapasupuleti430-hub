import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const { user, refreshProfile } = useAuth();
  const [plan, setPlan] = useState('');

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      setPlan(planParam);
    }
    if (user) {
      refreshProfile();
    }
  }, [searchParams, user, refreshProfile]);

  return (
    <div className="min-h-screen bg-caesar-black flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="glass-strong rounded-2xl p-10 glow-gold">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-caesar-white mb-2">Payment Successful!</h1>
          <p className="text-sm text-caesar-muted mb-2">
            {plan ? `You're now on the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan!` : 'Your subscription is now active!'}
          </p>
          <p className="text-xs text-caesar-gold mb-8">Welcome to Caesar AI Premium. Your transformation starts now.</p>

          <div className="space-y-3">
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 w-full py-3.5">
              <Zap className="w-4 h-4" /> Go to Dashboard
            </Link>
            <Link to="/meal-generator" className="btn-gold flex items-center justify-center gap-2 w-full py-3.5">
              Generate My AI Diet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
