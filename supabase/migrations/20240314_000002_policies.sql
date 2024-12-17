-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Exercises policies
CREATE POLICY "Exercises are viewable by everyone" 
ON exercises FOR SELECT USING (true);

CREATE POLICY "Only admins can insert exercises" 
ON exercises FOR INSERT 
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Only admins can update exercises" 
ON exercises FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Submissions policies
CREATE POLICY "Users can view own submissions" 
ON submissions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions" 
ON submissions FOR INSERT 
WITH CHECK (auth.uid() = user_id);