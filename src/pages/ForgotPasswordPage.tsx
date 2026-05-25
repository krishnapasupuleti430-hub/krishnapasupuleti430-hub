import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await resetPassword(email);
    setLoading(false);
    if (err) { setError(err); return; }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-caesar-black flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-caesar-red/5 rounded-full blur-3xl" />
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
          <h1 className="text-2xl font-bold text-caesar-white mb-2">Reset Password</h1>
          <p className="text-sm text-caesar-muted">We'll send you a reset link</p>
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-caesar-white mb-2">Check Your Email</h2>
              <p className="text-sm text-caesar-muted mb-6">We sent a password reset link to {email}</p>
              <Link to="/login" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
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
                  <label className="text-xs text-caesar-muted font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caesar-muted" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-caesar-dark border border-caesar-border rounded-xl pl-10 pr-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                      placeholder="you@example.com" required />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                  {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>

              <Link to="/login" className="flex items-center justify-center gap-1 text-xs text-caesar-muted hover:text-caesar-white mt-6 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </Link>

              <div className="mt-4 p-3 rounded-xl bg-caesar-gold/10 border border-caesar-gold/20">
                <p className="text-xs text-caesar-gold text-center">Demo Mode: Simulated password reset</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
