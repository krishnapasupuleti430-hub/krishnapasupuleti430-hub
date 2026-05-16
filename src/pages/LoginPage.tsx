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
  const { signIn, signInWithGoogle } = useAuth();
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-caesar-border" /></div>
            <div className="relative flex justify-center"><span className="bg-caesar-dark px-3 text-xs text-caesar-muted">or</span></div>
          </div>

          <button onClick={signInWithGoogle} className="w-full glass rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-caesar-white hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-caesar-muted mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-caesar-red hover:text-caesar-red-glow transition-colors font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
