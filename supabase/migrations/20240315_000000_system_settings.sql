-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  supabase JSONB DEFAULT '{
    "url": "",
    "anonKey": ""
  }'::jsonb,
  openai JSONB DEFAULT '{
    "apiKey": "",
    "model": "gpt-4",
    "maxTokens": 500,
    "temperature": 0.7
  }'::jsonb,
  general JSONB DEFAULT '{
    "maxAttempts": 3,
    "autoGrading": true,
    "feedbackDelay": 0,
    "defaultIGICRate": 7
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger
CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas las operaciones a los administradores
CREATE POLICY "Admins have full access to settings"
ON system_settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Insert default settings
INSERT INTO system_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;