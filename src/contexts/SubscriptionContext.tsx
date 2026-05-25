import { createContext, useContext } from 'react';

interface SubscriptionContextType {
  plan: 'free';
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
  return (
    <SubscriptionContext.Provider value={{
      plan: 'free',
      canUseFeature: () => true,
      aiGenerationsLeft: 999,
      aiGenerationsUsed: 0,
      consumeAIGeneration: () => true,
      isFree: true,
      isStudent: false,
      isPro: false,
      isElite: false,
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
