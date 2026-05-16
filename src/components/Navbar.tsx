import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Transformations', href: '#transformations' },
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
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center glow-red group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-caesar-white">Caesar</span>
              <span className="text-gradient-red ml-1">AI</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-caesar-muted hover:text-caesar-white transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-caesar-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#pricing" className="text-sm text-caesar-muted hover:text-caesar-white transition-colors">
              Log In
            </a>
            <button className="btn-primary text-sm px-6 py-2.5">
              Start Free
            </button>
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
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-caesar-muted hover:text-caesar-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <button className="btn-primary w-full text-sm py-3 mt-4">
              Start Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
