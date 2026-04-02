ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  birth_date DATE,
  education_level TEXT,
  session_date TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'unpaid',
  payment_amount DECIMAL(10,2),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE enrollments ALTER COLUMN user_id DROP NOT NULL;

CREATE TABLE IF NOT EXISTS formation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  max_students INTEGER DEFAULT 30,
  current_students INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create enrollments" ON enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all enrollments" ON enrollments FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

ALTER TABLE formation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view sessions" ON formation_sessions FOR SELECT USING (true);
CREATE POLICY "Admin can manage sessions" ON formation_sessions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);