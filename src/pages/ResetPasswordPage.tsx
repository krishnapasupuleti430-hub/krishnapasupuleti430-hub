import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const { error: err } = await updatePassword(password);
    setLoading(false);
    if (err) { setError(err); return; }
    setSuccess(true);
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-caesar-black flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-caesar-gold/5 rounded-full blur-3xl" />
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
          <h1 className="text-2xl font-bold text-caesar-white mb-2">Set New Password</h1>
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {success ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-caesar-white mb-2">Password Updated</h2>
              <p className="text-sm text-caesar-muted">Redirecting to dashboard...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="glass-red rounded-xl p-3 mb-6">
                  <p className="text-xs text-caesar-red">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">New Password</label>
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

                <div>
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="Confirm password" required />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                  {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Update Password'}
                </button>
              </form>

              <div className="mt-4 p-3 rounded-xl bg-caesar-gold/10 border border-caesar-gold/20">
                <p className="text-xs text-caesar-gold text-center">Demo Mode: Simulated password update</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
