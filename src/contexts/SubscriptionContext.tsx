import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

type PlanTier = 'free' | 'student' | 'pro' | 'elite';

const PLAN_LIMITS: Record<PlanTier, { aiGenerationsPerDay: number; features: string[] }> = {
  free: {
    aiGenerationsPerDay: 3,
    features: ['basic_tracking', 'limited_ai', 'basic_workouts'],
  },
  student: {
    aiGenerationsPerDay: 20,
    features: ['student_mode', 'hostel_meals', 'budget_diets', 'protein_tracking', 'home_workouts', 'daily_ai_suggestions', 'basic_analytics'],
  },
  pro: {
    aiGenerationsPerDay: 50,
    features: ['advanced_ai_meals', 'personalized_transformations', 'smart_analytics', 'advanced_workouts', 'ai_body_insights', 'premium_dashboards'],
  },
  elite: {
    aiGenerationsPerDay: Infinity,
    features: ['elite_coaching', 'premium_transformation', 'unlimited_ai', 'advanced_analytics', 'priority_support', 'exclusive_plans', 'future_features'],
  },
};

interface SubscriptionContextType {
  plan: PlanTier;
  canUseFeature: (feature: string) => boolean;
  aiGenerationsLeft: number;
  aiGenerationsUsed: number;
  consumeAIGeneration: () => boolean;
  isFree: boolean;
  isStudent: boolean;
  isPro: boolean;
  isElite: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const [aiGenerationsUsed, setAiGenerationsUsed] = useState(0);

  const plan: PlanTier = (profile?.subscription_plan as PlanTier) || 'free';
  const limits = PLAN_LIMITS[plan];

  const canUseFeature = useCallback((feature: string) => {
    if (plan === ('elite' as PlanTier)) return true;
    const allFeatures = [...PLAN_LIMITS.free.features];
    if (plan === ('student' as PlanTier) || plan === ('pro' as PlanTier) || plan === ('elite' as PlanTier)) allFeatures.push(...PLAN_LIMITS.student.features);
    if (plan === ('pro' as PlanTier) || plan === ('elite' as PlanTier)) allFeatures.push(...PLAN_LIMITS.pro.features);
    if (plan === ('elite' as PlanTier)) allFeatures.push(...PLAN_LIMITS.elite.features);
    return allFeatures.includes(feature);
  }, [plan]);

  const consumeAIGeneration = useCallback(() => {
    if (aiGenerationsUsed >= limits.aiGenerationsPerDay) return false;
    setAiGenerationsUsed((prev) => prev + 1);
    return true;
  }, [aiGenerationsUsed, limits.aiGenerationsPerDay]);

  const aiGenerationsLeft = Math.max(0, limits.aiGenerationsPerDay - aiGenerationsUsed);

  return (
    <SubscriptionContext.Provider value={{
      plan, canUseFeature, aiGenerationsLeft, aiGenerationsUsed,
      consumeAIGeneration,
      isFree: plan === 'free',
      isStudent: plan === 'student',
      isPro: plan === 'pro',
      isElite: plan === 'elite',
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
}
