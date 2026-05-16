import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, User, Globe, Target, Weight } from 'lucide-react';

const countries = [
  'India', 'USA', 'UK', 'UAE', 'Canada', 'Australia', 'Germany', 'Japan', 'Singapore', 'South Africa', 'Other'
];

const goals = [
  { value: 'muscle_gain', label: 'Muscle Gain' },
  { value: 'fat_loss', label: 'Fat Loss' },
  { value: 'weight_gain', label: 'Weight Gain' },
  { value: 'general_fitness', label: 'General Fitness' },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('India');
  const [goal, setGoal] = useState('muscle_gain');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
      setStep(2);
      return;
    }

    setLoading(true);
    const { error: err } = await signUp(email, password, {
      full_name: fullName,
      country,
      fitness_goal: goal,
      weight_kg: weight,
      target_weight_kg: targetWeight,
    });
    setLoading(false);
    if (err) { setError(err); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-caesar-black flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center glow-red">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-caesar-white">Caesar</span>
              <span className="text-gradient-red ml-1">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-caesar-white mb-2">Create Your Account</h1>
          <p className="text-sm text-caesar-muted">Start your AI-powered transformation</p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-caesar-red' : 'bg-caesar-border'}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-caesar-red' : 'bg-caesar-border'}`} />
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {error && (
            <div className="glass-red rounded-xl p-3 mb-6">
              <p className="text-xs text-caesar-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="Your name" required />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="you@example.com" required />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-10 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="Min 6 characters" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-caesar-muted hover:text-caesar-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Country
                  </label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white focus:outline-none focus:border-caesar-red/50 transition-colors appearance-none">
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {country === 'India' && (
                    <p className="text-[10px] text-caesar-gold mt-1.5">Indian foods and budget plans will be prioritized for you</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Fitness Goal
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {goals.map((g) => (
                      <button key={g.value} type="button" onClick={() => setGoal(g.value)}
                        className={`p-3 rounded-xl text-xs font-medium transition-all ${goal === g.value ? 'glass-red text-caesar-red border border-caesar-red/30' : 'glass text-caesar-muted hover:text-caesar-white'}`}>
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-caesar-muted font-medium mb-1.5 block flex items-center gap-1.5">
                      <Weight className="w-3.5 h-3.5" /> Current Weight (kg)
                    </label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="65" />
                  </div>
                  <div>
                    <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Target Weight (kg)</label>
                    <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="75" />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="glass rounded-xl px-6 py-3.5 text-sm text-caesar-muted hover:text-caesar-white transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5">
                    {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </>
            )}
          </form>

          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-caesar-border" /></div>
                <div className="relative flex justify-center"><span className="bg-caesar-dark px-3 text-xs text-caesar-muted">or</span></div>
              </div>
              <button onClick={signInWithGoogle} className="w-full glass rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-caesar-white hover:bg-white/5 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            </>
          )}

          <p className="text-center text-xs text-caesar-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-caesar-red hover:text-caesar-red-glow transition-colors font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
