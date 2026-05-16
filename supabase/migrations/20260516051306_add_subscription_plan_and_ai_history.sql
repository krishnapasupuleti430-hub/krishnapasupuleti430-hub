/*
  # Add subscription plan to profiles and ai_history table

  1. Changes
    - Add `subscription_plan` column to profiles (default 'free')
    - Add `ai_history` table for tracking AI generation usage
    - Add index on ai_history for daily lookups

  2. Security
    - Enable RLS on ai_history
    - Users can only access their own AI history
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_plan'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_plan text DEFAULT 'free';
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS ai_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  request_type text NOT NULL,
  request_input text DEFAULT '',
  response_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own AI history"
  ON ai_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI history"
  ON ai_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own AI history"
  ON ai_history FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ai_history_user_date ON ai_history(user_id, created_at);
