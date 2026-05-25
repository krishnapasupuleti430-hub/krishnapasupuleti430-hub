import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isLanding = location.pathname === '/';

  const landingLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Transformations', href: '#transformations' },
  ];

  const appLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'AI Meals', to: '/meal-generator' },
    { label: 'AI Workouts', to: '/workout-generator' },
    { label: 'Pricing', to: '/pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-blue-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-caesar-blue via-caesar-purple to-caesar-cyan flex items-center justify-center glow-mixed group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none">
                <span className="text-caesar-white">Caesar</span>
                <span className="text-gradient-premium ml-1">AI</span>
              </span>
              <span className="text-[8px] text-caesar-muted tracking-widest uppercase">AI Fitness Platform</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isLanding
              ? landingLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm text-caesar-muted hover:text-caesar-white transition-colors duration-300 relative group"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-caesar-blue to-caesar-purple group-hover:w-full transition-all duration-300" />
                  </a>
                ))
              : appLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className={`text-sm transition-colors duration-300 relative group ${
                      location.pathname === l.to ? 'text-caesar-blue' : 'text-caesar-muted hover:text-caesar-white'
                    }`}
                  >
                    {l.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-caesar-blue to-caesar-purple transition-all duration-300 ${
                      location.pathname === l.to ? 'w-full' : 'group-hover:w-full'
                    }`} />
                  </Link>
                ))
            }
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-1.5 px-4 py-2 rounded-lg glass text-sm text-caesar-muted hover:text-caesar-white transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={signOut} className="flex items-center gap-1.5 px-4 py-2 rounded-lg glass-purple text-sm text-caesar-purple hover:bg-caesar-purple/20 transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-caesar-muted hover:text-caesar-white transition-colors px-4 py-2">
                  Log In
                </Link>
                <Link to="/signup" className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative btn-primary text-sm px-6 py-2.5 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan rounded-xl">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Start Free
                  </div>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-caesar-muted hover:text-caesar-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-caesar-border animate-slide-up">
          <div className="px-4 py-6 space-y-4">
            {isLanding
              ? landingLinks.map((l) => (
                  <a key={l.label} href={l.href} className="block text-caesar-muted hover:text-caesar-white transition-colors py-2">
                    {l.label}
                  </a>
                ))
              : appLinks.map((l) => (
                  <Link key={l.label} to={l.to} className="block text-caesar-muted hover:text-caesar-white transition-colors py-2">
                    {l.label}
                  </Link>
                ))
            }
            <div className="h-px bg-gradient-to-r from-transparent via-caesar-border to-transparent my-4" />
            {user ? (
              <>
                <Link to="/dashboard" className="block text-caesar-muted hover:text-caesar-white transition-colors py-2">
                  Dashboard
                </Link>
                <button onClick={signOut} className="w-full glass-purple rounded-xl py-3 text-sm text-caesar-purple hover:bg-caesar-purple/20 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-caesar-muted hover:text-caesar-white transition-colors py-2">
                  Log In
                </Link>
                <Link to="/signup" className="btn-primary block text-center text-sm py-3 mt-4 bg-gradient-to-r from-caesar-blue via-caesar-purple to-caesar-cyan">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
