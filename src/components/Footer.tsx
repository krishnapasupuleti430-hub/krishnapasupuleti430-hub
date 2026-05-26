import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { CaesarLogoMark } from './CaesarLogo';

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Dashboard', 'AI Coach', 'Meal Generator'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Guides', 'Indian Foods DB', 'Workout Library', 'API'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR', 'Refund Policy'],
  },
];

export default function Footer() {
  return (
    <footer className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-caesar-dark to-caesar-black" />

      <div className="relative z-10 container-premium mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <CaesarLogoMark size={44} className="group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-lg font-clash font-semibold tracking-tight leading-none text-caesar-white">
                  Caesar<span className="text-gradient-premium">AI</span>
                </span>
                <span className="text-[7px] text-caesar-muted tracking-[0.15em] uppercase font-space">Fitness Intelligence</span>
              </div>
            </Link>
            <p className="text-sm text-caesar-muted font-space leading-relaxed mb-5 max-w-xs">
              Your AI Muscle Gain & Diet System. Personalized diet plans, budget meals, workouts, and AI coaching for everyone.
            </p>
            <div className="flex items-center gap-2 text-xs text-caesar-muted font-space">
              <Globe className="w-3.5 h-3.5" />
              Available in 50+ countries
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-clash font-semibold text-caesar-white mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs font-space text-caesar-muted hover:text-caesar-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-caesar-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-space text-caesar-muted">
            &copy; 2026 Caesar AI. All rights reserved.
          </p>
          <p className="text-xs font-space text-caesar-muted">
            Built with AI for fitness lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
