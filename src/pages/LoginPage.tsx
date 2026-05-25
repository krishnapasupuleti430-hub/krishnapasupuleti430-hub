import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) { setError(err); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-caesar-black flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
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
          <h1 className="text-2xl font-bold text-caesar-white mb-2">Welcome Back</h1>
          <p className="text-sm text-caesar-muted">Log in to continue your transformation</p>
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {error && (
            <div className="glass-red rounded-xl p-3 mb-6">
              <p className="text-xs text-caesar-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                  placeholder="you@example.com" required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-10 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                  placeholder="Enter password" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-caesar-muted hover:text-caesar-white">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-caesar-border bg-caesar-dark accent-caesar-red" />
                <span className="text-xs text-caesar-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-caesar-red hover:text-caesar-red-glow transition-colors">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Log In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-xs text-caesar-muted mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-caesar-red hover:text-caesar-red-glow transition-colors font-medium">Sign up free</Link>
          </p>

          <div className="mt-4 p-3 rounded-xl bg-caesar-gold/10 border border-caesar-gold/20">
            <p className="text-xs text-caesar-gold text-center">Demo Mode: Enter any email/password to login</p>
          </div>
        </div>
      </div>
    </div>
  );
}
