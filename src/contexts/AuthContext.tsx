import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Profile {
  full_name: string | null;
  weight_kg: number | null;
  target_weight_kg: number | null;
  height_cm: number | null;
  age: number | null;
  gender: string | null;
  fitness_goal: string | null;
  daily_calorie_goal: number;
  daily_protein_goal: number;
  daily_water_goal: number;
  is_hostel_mode: boolean;
  country: string;
}

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const defaultProfile: Profile = {
  full_name: null,
  weight_kg: null,
  target_weight_kg: null,
  height_cm: null,
  age: null,
  gender: null,
  fitness_goal: 'muscle_gain',
  daily_calorie_goal: 2200,
  daily_protein_goal: 150,
  daily_water_goal: 8,
  is_hostel_mode: false,
  country: 'India',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'caesar_ai_demo_user';
const PROFILE_KEY = 'caesar_ai_demo_profile';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const storedProfile = localStorage.getItem(PROFILE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (storedProfile) {
        setProfile({ ...defaultProfile, ...JSON.parse(storedProfile) });
      }
    }
    setLoading(false);
  }, []);

  const signUp = useCallback(async (email: string, _password: string, metadata?: { full_name?: string }) => {
    const newUser: User = {
      id: `demo-${Date.now()}`,
      email,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    if (metadata?.full_name) {
      const newProfile = { ...defaultProfile, full_name: metadata.full_name };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    }
    setUser(newUser);
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, _password: string) => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      const existing = JSON.parse(storedUser);
      if (existing.email === email) {
        setUser(existing);
        const storedProfile = localStorage.getItem(PROFILE_KEY);
        if (storedProfile) {
          setProfile({ ...defaultProfile, ...JSON.parse(storedProfile) });
        }
        return { error: null };
      }
    }
    const newUser: User = {
      id: `demo-${Date.now()}`,
      email,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { error: null };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setProfile(defaultProfile);
  }, []);

  const resetPassword = useCallback(async (_email: string) => {
    return { error: null };
  }, []);

  const updatePassword = useCallback(async (_password: string) => {
    return { error: null };
  }, []);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    const newProfile = { ...profile, ...updates };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);
    return { error: null };
  }, [profile]);

  const refreshProfile = useCallback(async () => {
    const storedProfile = localStorage.getItem(PROFILE_KEY);
    if (storedProfile) {
      setProfile({ ...defaultProfile, ...JSON.parse(storedProfile) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
      updateProfile,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
