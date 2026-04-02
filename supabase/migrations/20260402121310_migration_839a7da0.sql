-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 25000,
  payment_method TEXT CHECK (payment_method IN ('mobile_money', 'bank_transfer', 'cash', 'other')),
  payment_reference TEXT,
  payment_status TEXT CHECK (payment_status IN ('pending', 'validated', 'rejected')) DEFAULT 'pending',
  payment_date TIMESTAMP WITH TIME ZONE,
  validated_by UUID REFERENCES profiles(id),
  validated_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Admin can do everything
CREATE POLICY "admin_all_payments" ON payments FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Users can view their own payments
CREATE POLICY "users_view_own_payments" ON payments FOR SELECT USING (
  enrollment_id IN (SELECT id FROM enrollments WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_payments_enrollment ON payments(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);