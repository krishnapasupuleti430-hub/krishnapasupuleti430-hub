import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import MealGeneratorPage from './pages/MealGeneratorPage';
import WorkoutGeneratorPage from './pages/WorkoutGeneratorPage';
import PricingPage from './pages/PricingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-caesar-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-caesar-red border-t-transparent animate-spin" />
        <p className="text-sm text-caesar-muted">Loading Caesar AI...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <SubscriptionProvider>
            <ParticleBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/meal-generator" element={<ProtectedRoute><MealGeneratorPage /></ProtectedRoute>} />
              <Route path="/workout-generator" element={<ProtectedRoute><WorkoutGeneratorPage /></ProtectedRoute>} />
            </Routes>
          </SubscriptionProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
