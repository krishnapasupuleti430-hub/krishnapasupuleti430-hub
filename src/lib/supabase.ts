import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
  }
} catch {
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export { supabase };
