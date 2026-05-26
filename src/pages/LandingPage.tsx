import Hero from '../components/Hero';
import Features from '../components/Features';
import Dashboard from '../components/Dashboard';
import SmartSearch from '../components/SmartSearch';
import AIAssistant from '../components/AIAssistant';
import CountrySelector from '../components/CountrySelector';
import PricingSection from '../components/PricingSection';
import Testimonials from '../components/Testimonials';
import Transformations from '../components/Transformations';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Dashboard />
      <SmartSearch />
      <AIAssistant />
      <CountrySelector />
      <PricingSection />
      <Testimonials />
      <Transformations />
      <CTA />
      <Footer />
    </>
  );
}
