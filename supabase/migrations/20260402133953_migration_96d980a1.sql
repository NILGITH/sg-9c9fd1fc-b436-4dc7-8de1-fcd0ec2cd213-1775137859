-- Create intake_dates table for managing enrollment dates
CREATE TABLE IF NOT EXISTS intake_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  label TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE intake_dates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "public_read_intake_dates" ON intake_dates;
DROP POLICY IF EXISTS "auth_manage_intake_dates" ON intake_dates;

-- RLS policies
CREATE POLICY "public_read_intake_dates" ON intake_dates FOR SELECT USING (true);
CREATE POLICY "auth_manage_intake_dates" ON intake_dates FOR ALL USING (auth.uid() IS NOT NULL);

-- Insert default dates
INSERT INTO intake_dates (date, label, is_active) VALUES
  ('2025-09-10', '10 Septembre 2025', true),
  ('2025-10-06', '06 Octobre 2025', true),
  ('2025-11-03', '03 Novembre 2025', true),
  ('2026-01-05', '05 Janvier 2026', true),
  ('2026-02-09', '09 Février 2026', true),
  ('2026-03-04', '04 Mars 2026', true)
ON CONFLICT (date) DO NOTHING;