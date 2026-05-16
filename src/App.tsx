import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import SmartSearch from './components/SmartSearch';
import AIAssistant from './components/AIAssistant';
import CountrySelector from './components/CountrySelector';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Transformations from './components/Transformations';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-caesar-black text-caesar-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <Features />
      <Dashboard />
      <SmartSearch />
      <AIAssistant />
      <CountrySelector />
      <Pricing />
      <Testimonials />
      <Transformations />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
