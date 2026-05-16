import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, LogOut, LayoutDashboard } from 'lucide-react';
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
          ? 'glass-strong shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center glow-red group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-caesar-white">Caesar</span>
              <span className="text-gradient-red ml-1">AI</span>
            </span>
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
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-caesar-red group-hover:w-full transition-all duration-300" />
                  </a>
                ))
              : appLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className={`text-sm transition-colors duration-300 relative group ${
                      location.pathname === l.to ? 'text-caesar-red' : 'text-caesar-muted hover:text-caesar-white'
                    }`}
                  >
                    {l.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-caesar-red transition-all duration-300 ${
                      location.pathname === l.to ? 'w-full' : 'group-hover:w-full'
                    }`} />
                  </Link>
                ))
            }
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-caesar-muted hover:text-caesar-white transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-caesar-muted hover:text-caesar-red transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-caesar-muted hover:text-caesar-white transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="btn-primary text-sm px-6 py-2.5">
                  Start Free
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-caesar-muted hover:text-caesar-white"
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
            {user ? (
              <>
                <Link to="/dashboard" className="block text-caesar-muted hover:text-caesar-white transition-colors py-2">
                  Dashboard
                </Link>
                <button onClick={signOut} className="w-full glass-red rounded-xl py-3 text-sm text-caesar-red">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-caesar-muted hover:text-caesar-white transition-colors py-2">
                  Log In
                </Link>
                <Link to="/signup" className="btn-primary block text-center text-sm py-3 mt-4">
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
