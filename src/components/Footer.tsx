import { Link } from 'react-router-dom';
import { Zap, Globe } from 'lucide-react';

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
    <footer className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black to-caesar-dark" />

      <div className="relative z-10 container-premium mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center glow-red">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-caesar-white">Caesar</span>
                <span className="text-gradient-red ml-1">AI</span>
              </span>
            </Link>
            <p className="text-sm text-caesar-muted leading-relaxed mb-4 max-w-xs">
              Your AI Muscle Gain & Diet System. Personalized diet plans, budget meals, workouts, and AI coaching for everyone.
            </p>
            <div className="flex items-center gap-2 text-xs text-caesar-muted">
              <Globe className="w-3.5 h-3.5" />
              Available in 50+ countries
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-caesar-white mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-caesar-muted hover:text-caesar-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-caesar-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-caesar-muted">
            &copy; 2026 Caesar AI. All rights reserved.
          </p>
          <p className="text-xs text-caesar-muted">
            Made with AI for fitness lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
