-- Fix RLS policies for payments table to allow anonymous inserts (linked to enrollments)

-- Drop existing policies if any
DROP POLICY IF EXISTS "anon_insert_payments" ON payments;
DROP POLICY IF EXISTS "public_read_payments" ON payments;
DROP POLICY IF EXISTS "auth_update_payments" ON payments;

-- Enable RLS (if not already enabled)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (public payment for enrollment)
CREATE POLICY "anon_insert_payments" ON payments
  FOR INSERT
  WITH CHECK (true);

-- Allow public READ access (for admins to view)
CREATE POLICY "public_read_payments" ON payments
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to UPDATE
CREATE POLICY "auth_update_payments" ON payments
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users (admins) to DELETE
CREATE POLICY "auth_delete_payments" ON payments
  FOR DELETE
  USING (auth.uid() IS NOT NULL);